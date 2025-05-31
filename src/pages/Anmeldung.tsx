import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ArrowLeft, CreditCard, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAvailableTrainingSessions, completePaypalBooking, getCourses, createBooking } from '@/api';
import { toast } from '@/hooks/use-toast';
import Turnstile from 'react-turnstile';
import { useNavigate } from 'react-router-dom';

const Anmeldung = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: 'Paypal',
    lastName: 'Test',
    email: 'vahap.caliskan@web.de',
    phone: '017852620',
    birthDate: undefined,
    course: '',
    date: '',
    paymentMethod: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [loadingDates, setLoadingDates] = useState(true);
  const [captchaToken, setCaptchaToken] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    const saved = localStorage.getItem('formData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData({ ...parsed, birthDate: parsed.birthDate ? new Date(parsed.birthDate) : undefined });
        localStorage.removeItem('formData');
      } catch (e) {
        console.error("Fehler beim Wiederherstellen der Formulardaten:", e);
      }
    }
  }, []);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const sessions = await getAvailableTrainingSessions();
        const filtered = sessions.filter(
          (s) => s.max_participants === null || s.max_participants > s.participants_count
        );
        setAvailableDates(filtered);
      } catch (error) {
        console.error('Fehler beim Laden der Kurse:', error);
      } finally {
        setLoadingDates(false);
      }
    };

    fetchDates();
  }, []);

  useEffect(() => {
    if (formData.course) {
      const dates = availableDates.filter((s) => s.course.id.toString() === formData.course)
        .sort((a, b) => new Date(a.session_date).getTime() - new Date(b.session_date).getTime());
      if (dates.length > 0) {
        setFormData((prev) => ({ ...prev, date: dates[0].id.toString() }));
      } else {
        setFormData((prev) => ({ ...prev, date: '' }));
      }
    }
  }, [formData.course, availableDates]);

  const uniqueCourses = useMemo(() => {
    const map = new Map();
    for (const session of availableDates) {
      const courseId = session.course.id;
      if (!map.has(courseId)) {
        map.set(courseId, session.course);
      }
    }
    return Array.from(map.values());
  }, [availableDates]);

  const filteredDates = useMemo(() => {
    return availableDates.filter((s) => !formData.course || s.course.id.toString() === formData.course);
  }, [availableDates, formData.course]);

  useEffect(() => {
    const payment = searchParams.get('payment');
    const tokenParam = searchParams.get('token');

    const alreadyCompleted = sessionStorage.getItem('paypalBookingCompleted');

    if (payment === 'success' && tokenParam && alreadyCompleted !== tokenParam) {
      completePaypalBooking(tokenParam)
        .then(() => {
          sessionStorage.setItem('paypalBookingCompleted', tokenParam);
          toast({
            title: "Zahlung erfolgreich!",
            description: "Ihre Buchung wurde bestätigt.",
          });
          // Verhindert Replay bei Seite-Reload
          navigate('/anmeldung', { replace: true });
        })
        .catch((error) => {
          console.error("Fehler bei der PayPal-Buchung:", error);
          toast({
            title: "Fehler",
            description: "Teilnehmer konnte nach PayPal nicht gespeichert werden.",
            variant: "destructive",
          });
        });
    }
  }, [searchParams, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.birthDate || !formData.course || !formData.date || !formData.paymentMethod) {
      toast({ title: "Fehler", description: "Bitte füllen Sie alle Pflichtfelder aus.", variant: "destructive" });
      return;
    }

    if (!captchaToken) {
      toast({ title: "Sicherheitsabfrage fehlt", description: "Bitte bestätige das Captcha.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        birthDate: formData.birthDate?.toISOString().split('T')[0],
        returnUrl: window.location.origin + '/anmeldung',
        captchaToken,
      };

      localStorage.setItem('formData', JSON.stringify(formData));
      const data = await createBooking(payload);

      if (formData.paymentMethod === 'paypal') {
        if (data.paypal_url) {
          window.location.href = data.paypal_url;
        } else {
          throw new Error('PayPal-URL nicht erhalten');
        }
      } else {
        toast({ title: "Anmeldung erfolgreich!", description: "Sie erhalten eine Bestätigungs-E-Mail." });
        setFormData({ firstName: '', lastName: '', email: '', phone: '', birthDate: undefined, course: '', date: '', paymentMethod: '' });
        localStorage.removeItem('formData');
      }
    } catch (error) {
      console.error('Buchungsfehler:', error);
      toast({ title: "Fehler", description: "Bitte versuchen Sie es erneut.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <Link
                to="/"
                className="inline-flex items-center text-primary-500 hover:text-primary-600 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück zur Startseite
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Kursanmeldung
              </h1>
              <p className="text-xl text-gray-700">
                Melden Sie sich jetzt für einen unserer Erste-Hilfe-Kurse an.
              </p>
            </div>

            <div>

              {/* Anmeldeformular */}
              <div>
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      Anmeldung
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Persönliche Daten */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                          Persönliche Daten
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">Vorname *</Label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                              className="mt-1"
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Nachname *</Label>
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                              className="mt-1"
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email">E-Mail-Adresse *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="mt-1"
                            required
                            disabled={isSubmitting}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="phone">Telefonnummer</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              className="mt-1"
                              disabled={isSubmitting}
                            />
                          </div>
                          <div>
                            <Label>Geburtsdatum *</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal mt-1",
                                    !formData.birthDate && "text-muted-foreground"
                                  )}
                                  disabled={isSubmitting}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {formData.birthDate ? (
                                    format(formData.birthDate, "dd.MM.yyyy")
                                  ) : (
                                    <span>Datum wählen</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                  mode="single"
                                  selected={formData.birthDate}
                                  onSelect={(date) => handleInputChange('birthDate', date)}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>

                      {/* Kursauswahl */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                          Kursauswahl
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="course">Kursart auswählen *</Label>
                            <Select
                              onValueChange={(value) => handleInputChange('course', value)}
                              value={formData.course}
                              required
                              disabled={isSubmitting || uniqueCourses.length === 0}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder={uniqueCourses.length === 0 ? 'Keine freien Kurse zur Auswahl' : 'Bitte wählen Sie einen Kurs'} />
                              </SelectTrigger>
                              <SelectContent>
                                {uniqueCourses.map((course) => (
                                  <SelectItem key={course.id} value={course.id.toString()}>
                                    {course.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="date">Kurstermin auswählen *</Label>
                            <Select
                              onValueChange={(value) => handleInputChange('date', value)}
                              value={formData.date}
                              required
                              disabled={!formData.course || loadingDates}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder={uniqueCourses.length === 0 ? 'Keine freien Termine zur Auswahl' : 'Bitte wählen Sie einen Kurs'} />
                              </SelectTrigger>
                              <SelectContent>
                                {filteredDates.length === 0 ? (
                                  <div className="p-2 text-sm text-gray-500">Keine Termine verfügbar</div>
                                ) : (
                                  filteredDates.map((session) => (
                                    <SelectItem key={session.id} value={session.id.toString()} className="py-2">
                                      <div className="flex flex-col text-left">
                                        <span className="text-sm font-medium text-gray-900">
                                          {formatDate(session.session_date)} – {session.start_time}–{session.end_time}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                          {session.location.full_address_with_name}
                                        </span>
                                      </div>
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Zahlungsmethode */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                          Zahlungsmethode
                        </h3>

                        <RadioGroup
                          value={formData.paymentMethod}
                          onValueChange={(value) => handleInputChange('paymentMethod', value)}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          disabled={isSubmitting}
                        >
                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal" className="flex items-center cursor-pointer flex-1">
                              <CreditCard className="h-5 w-5 mr-3 text-blue-600" />
                              <div>
                                <div className="font-medium">PayPal</div>
                                <div className="text-sm text-gray-600">Sofortige Online-Zahlung</div>
                              </div>
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                            <RadioGroupItem value="onsite" id="onsite" />
                            <Label htmlFor="onsite" className="flex items-center cursor-pointer flex-1">
                              <DollarSign className="h-5 w-5 mr-3 text-green-600" />
                              <div>
                                <div className="font-medium">Bar/EC-Karte vor Ort</div>
                                <div className="text-sm text-gray-600">Zahlung am Kurstag</div>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>


                      <Turnstile
                        sitekey="0x4AAAAAABfc_0QZEJsJsxp0"
                        onSuccess={(token: string) => setCaptchaToken(token)}
                        onError={() => setCaptchaToken('')}
                        theme="light"
                      />

                      <Button
                        type="submit"
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 text-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          'Wird verarbeitet...'
                        ) : formData.paymentMethod === 'paypal' ? (
                          'Jetzt mit PayPal bezahlen'
                        ) : (
                          'Jetzt anmelden'
                        )}
                      </Button>

                      <p className="text-sm text-gray-600 text-center">
                        * Pflichtfelder. Nach der Anmeldung erhalten Sie eine Bestätigungs-E-Mail
                        mit weiteren Details.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Anmeldung;
