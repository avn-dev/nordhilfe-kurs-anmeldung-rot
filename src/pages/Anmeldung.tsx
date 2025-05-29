
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar, MapPin, Users, CreditCard, DollarSign, CalendarIcon, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Anmeldung = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: undefined as Date | undefined,
    course: '',
    date: '',
    paymentMethod: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableDates = [
    { id: '1', date: '2024-06-15', time: '09:00-17:00', course: 'Erste-Hilfe-Grundkurs', spots: 12 },
    { id: '2', date: '2024-06-22', time: '09:00-17:00', course: 'Erste-Hilfe-Grundkurs', spots: 8 },
    { id: '3', date: '2024-06-25', time: '09:00-17:00', course: 'Erste-Hilfe-Fortbildung', spots: 15 },
    { id: '4', date: '2024-06-29', time: '09:00-17:00', course: 'Erste-Hilfe am Kind', spots: 10 },
    { id: '5', date: '2024-07-06', time: '09:00-17:00', course: 'Erste-Hilfe-Grundkurs', spots: 12 },
    { id: '6', date: '2024-07-13', time: '09:00-17:00', course: 'Erste-Hilfe-Fortbildung', spots: 6 }
  ];

  // PayPal-Return-Handling
  useEffect(() => {
    const payment = searchParams.get('payment');
    const bookingId = searchParams.get('booking_id');
    
    if (payment === 'success' && bookingId) {
      toast({
        title: "Zahlung erfolgreich!",
        description: `Ihre Buchung ${bookingId} wurde bestätigt. Sie erhalten eine E-Mail mit allen Details.`,
      });
    } else if (payment === 'cancelled') {
      toast({
        title: "Zahlung abgebrochen",
        description: "Die PayPal-Zahlung wurde abgebrochen. Sie können es erneut versuchen.",
        variant: "destructive"
      });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.birthDate || !formData.course || !formData.date || !formData.paymentMethod) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Buchungsanfrage wird an Laravel-Backend gesendet:', {
        ...formData,
        birthDate: formData.birthDate?.toISOString().split('T')[0],
        returnUrl: window.location.origin + '/anmeldung'
      });
      
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          birthDate: formData.birthDate?.toISOString().split('T')[0],
          returnUrl: window.location.origin + '/anmeldung'
        })
      });

      if (!response.ok) {
        throw new Error('Fehler bei der Buchungsanfrage');
      }

      const data = await response.json();
      
      if (formData.paymentMethod === 'paypal') {
        if (data.paypal_url) {
          window.location.href = data.paypal_url;
        } else {
          throw new Error('PayPal-URL nicht erhalten');
        }
      } else {
        toast({
          title: "Anmeldung erfolgreich!",
          description: "Sie erhalten eine Bestätigungs-E-Mail. Zahlung erfolgt vor Ort.",
        });
        
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          birthDate: undefined,
          course: '',
          date: '',
          paymentMethod: ''
        });
      }

    } catch (error) {
      console.error('Buchungsfehler:', error);
      toast({
        title: "Fehler",
        description: "Bei der Anmeldung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Verfügbare Termine */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Verfügbare Termine</h2>
                <div className="space-y-4">
                  {availableDates.map((course) => (
                    <Card key={course.id} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-primary-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{course.course}</h3>
                            <div className="flex items-center text-gray-600 text-sm mb-1">
                              <Calendar className="h-4 w-4 mr-2" />
                              {formatDate(course.date)}
                            </div>
                            <div className="flex items-center text-gray-600 text-sm mb-1">
                              <MapPin className="h-4 w-4 mr-2" />
                              Nordhilfe Hamburg, Musterstraße 123
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                              <Users className="h-4 w-4 mr-2" />
                              {course.spots} Plätze verfügbar
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary-500">{course.time}</div>
                            <div className="text-sm text-gray-500">Uhrzeit</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

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

                        <div>
                          <Label htmlFor="course">Kurs auswählen *</Label>
                          <Select 
                            onValueChange={(value) => handleInputChange('course', value)} 
                            required
                            disabled={isSubmitting}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Bitte wählen Sie einen Kurs" />
                            </SelectTrigger>
                            <SelectContent className="bg-white z-50">
                              <SelectItem value="grundkurs">Erste-Hilfe-Grundkurs</SelectItem>
                              <SelectItem value="fortbildung">Erste-Hilfe-Fortbildung</SelectItem>
                              <SelectItem value="kind">Erste-Hilfe am Kind</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="date">Termin auswählen *</Label>
                          <Select 
                            onValueChange={(value) => handleInputChange('date', value)} 
                            required
                            disabled={isSubmitting}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Bitte wählen Sie einen Termin" />
                            </SelectTrigger>
                            <SelectContent className="bg-white z-50">
                              {availableDates.map((course) => (
                                <SelectItem key={course.id} value={course.id}>
                                  {formatDate(course.date)} - {course.course}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                          className="space-y-3"
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
