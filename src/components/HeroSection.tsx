
import { Button } from '@/components/ui/button';
import { Heart, Shield, Clock, Award } from 'lucide-react';

const HeroSection = () => {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Erste Hilfe kann <span className="text-primary-500">Leben retten</span>
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Lernen Sie in unseren professionellen Erste-Hilfe-Kursen in Hamburg, 
              wie Sie in Notfallsituationen richtig handeln. Nach 9 Unterrichtseinheiten (8 Stunden) 
              können Sie Erste Hilfe leisten und erhalten ein von allen Führerscheinstellen anerkanntes Zertifikat.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={scrollToBooking}
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 text-lg"
              >
                Jetzt Kurs buchen
              </Button>
              <Button 
                variant="outline" 
                className="border-primary-500 text-primary-500 hover:bg-primary-50 px-8 py-3 text-lg"
              >
                Mehr erfahren
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center shadow-md">
                  <Heart className="h-8 w-8 text-primary-500" />
                </div>
                <p className="text-xs md:text-sm font-semibold text-gray-700 px-1">Lebensrettend</p>
              </div>
              <div className="text-center">
                <div className="bg-white p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center shadow-md">
                  <Shield className="h-8 w-8 text-primary-500" />
                </div>
                <p className="text-xs md:text-sm font-semibold text-gray-700 px-1">Zertifiziert</p>
              </div>
              <div className="text-center">
                <div className="bg-white p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center shadow-md">
                  <Award className="h-8 w-8 text-primary-500" />
                </div>
                <p className="text-xs md:text-sm font-semibold text-gray-700 px-1 leading-tight">Führerschein-anerkannt</p>
              </div>
              <div className="text-center">
                <div className="bg-white p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center shadow-md">
                  <Clock className="h-8 w-8 text-primary-500" />
                </div>
                <p className="text-xs md:text-sm font-semibold text-gray-700 px-1">Flexibel</p>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <img 
                src="/placeholder.svg" 
                alt="Erste-Hilfe-Kurs"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Professionelle Ausbildung
              </h3>
              <p className="text-gray-700 mb-6">
                Unsere erfahrenen Ausbilder vermitteln Ihnen alle wichtigen 
                Erste-Hilfe-Maßnahmen in Theorie und Praxis. Das Zertifikat wird von allen Führerscheinstellen anerkannt.
              </p>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>• 9 Unterrichtseinheiten</span>
                <span>• Zertifikat inklusive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
