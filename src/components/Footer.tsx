
import { Heart, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo und Beschreibung */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary-500 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Nordhilfe</h3>
                <p className="text-sm text-gray-400">Hamburg</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ihr zuverlässiger Partner für professionelle Erste-Hilfe-Ausbildung 
              in Hamburg. Zertifiziert und praxisnah.
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm">040 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@nordhilfe.hamburg</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Musterstraße 123<br />
                  20095 Hamburg
                </span>
              </div>
            </div>
          </div>

          {/* Öffnungszeiten */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Öffnungszeiten</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-primary-500 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <div>Mo - Fr: 08:00 - 18:00</div>
                  <div>Sa: 09:00 - 14:00</div>
                  <div>So: Geschlossen</div>
                </div>
              </div>
            </div>
          </div>

          {/* Kurse */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Unsere Kurse</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>• Erste-Hilfe-Grundkurs</li>
              <li>• Erste-Hilfe-Fortbildung</li>
              <li>• Erste-Hilfe am Kind</li>
              <li>• Betriebssanitäter-Ausbildung</li>
              <li>• AED-Training</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Nordhilfe Hamburg. Alle Rechte vorbehalten.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Impressum
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Datenschutz
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                AGB
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
