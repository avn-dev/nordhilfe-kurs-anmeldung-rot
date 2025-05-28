
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const BookingSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    date: ''
  });

  const availableDates = [
    { id: '1', date: '2024-06-15', time: '09:00-17:00', course: 'Erste-Hilfe-Grundkurs', spots: 12 },
    { id: '2', date: '2024-06-22', time: '09:00-17:00', course: 'Erste-Hilfe-Grundkurs', spots: 8 },
    { id: '3', date: '2024-06-25', time: '09:00-17:00', course: 'Erste-Hilfe-Fortbildung', spots: 15 },
    { id: '4', date: '2024-06-29', time: '09:00-17:00', course: 'Erste-Hilfe am Kind', spots: 10 },
    { id: '5', date: '2024-07-06', time: '09:00-17:00', course: 'Erste-Hilfe-Grundkurs', spots: 12 },
    { id: '6', date: '2024-07-13', time: '09:00-17:00', course: 'Erste-Hilfe-Fortbildung', spots: 6 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.course || !formData.date) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive"
      });
      return;
    }

    // Hier würde normalerweise die Anmeldung verarbeitet und eine E-Mail gesendet
    toast({
      title: "Anmeldung erfolgreich!",
      description: "Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen Details.",
    });

    console.log('Kursbuchung:', formData);
    
    // Form zurücksetzen
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      course: '',
      date: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
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
    <section id="booking" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Kurs buchen
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Melden Sie sich jetzt für einen unserer Erste-Hilfe-Kurse an. 
            Nach der Anmeldung erhalten Sie eine Bestätigung per E-Mail.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Verfügbare Termine */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Verfügbare Termine</h3>
            <div className="space-y-4">
              {availableDates.map((course) => (
                <Card key={course.id} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-primary-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{course.course}</h4>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Vorname *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="mt-1"
                        required
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
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefonnummer</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="course">Kurs auswählen *</Label>
                    <Select onValueChange={(value) => handleInputChange('course', value)} required>
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
                    <Select onValueChange={(value) => handleInputChange('date', value)} required>
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

                  <Button 
                    type="submit" 
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 text-lg"
                  >
                    Jetzt anmelden
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    * Pflichtfelder. Nach der Anmeldung erhalten Sie eine Bestätigungs-E-Mail 
                    mit Zahlungsinformationen und weiteren Details.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
