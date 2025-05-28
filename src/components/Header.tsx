
import { Heart, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2">
              <img 
                src="/lovable-uploads/814d6405-5d48-464a-8dc4-7beb21d2c0da.png" 
                alt="Nordhilfe Logo" 
                className="h-12 w-12"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Nordhilfe</h1>
              <p className="text-sm text-gray-600">Erste-Hilfe-Kurse Hamburg</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-700">
                <Phone className="h-4 w-4" />
                <span className="text-sm">040 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@nordhilfe.hamburg</span>
              </div>
            </div>
            <Button 
              onClick={scrollToBooking}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2"
            >
              Jetzt buchen
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
