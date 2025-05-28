
import { Heart, Phone, Mail, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo - now clickable */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
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
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
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

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 space-y-4">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2 text-gray-700 px-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">040 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700 px-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@nordhilfe.hamburg</span>
              </div>
              <div className="pt-2">
                <Button 
                  onClick={() => {
                    scrollToBooking();
                    setIsMenuOpen(false);
                  }}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 w-full"
                >
                  Jetzt buchen
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
