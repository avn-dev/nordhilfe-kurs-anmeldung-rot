import { useState } from 'react';
import { Phone, Mail, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => setIsOpen(prev => !prev);

  const showStartseite = pathname !== '/';
  const showBuchen = pathname !== '/anmeldung';
  const hasMobileNavLinks = showStartseite || showBuchen;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="Nordhilfe Logo"
                className="w-12"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Nordhilfe</h1>
                <p className="text-sm text-gray-600">Erste-Hilfe-Kurse Hamburg</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {showStartseite && (
              <Link
                to="/"
                className="text-gray-800 hover:text-primary-600 font-medium transition"
              >
                Startseite
              </Link>
            )}

            {showBuchen && (
              <Button
                asChild
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 transition"
              >
                <Link to="/anmeldung">Jetzt buchen</Link>
              </Button>
            )}

            {/* Kontaktinfos */}
            <div className="flex flex-col space-y-1 pl-4 border-l border-gray-200">
              <a
                href="tel:+4940123456789"
                className="flex items-center space-x-2 text-xs text-gray-500 hover:text-gray-700 transition"
              >
                <Phone className="h-4 w-4" />
                <span>040 123 456 789</span>
              </a>
              <a
                href="mailto:info@nordhilfe.hamburg"
                className="flex items-center space-x-2 text-xs text-gray-500 hover:text-gray-700 transition"
              >
                <Mail className="h-4 w-4" />
                <span>info@nordhilfe.hamburg</span>
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-primary-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white px-6 pt-4 pb-6 transition-all">
            <nav className="space-y-4">
              {showStartseite && (
                <Link
                  to="/"
                  className="block text-gray-800 text-lg hover:text-primary-600 transition"
                  onClick={toggleMenu}
                >
                  Startseite
                </Link>
              )}

              {showBuchen && (
                <Link
                  to="/anmeldung"
                  className="block text-gray-800 text-lg hover:text-primary-600 transition"
                  onClick={toggleMenu}
                >
                  Jetzt buchen
                </Link>
              )}

              {hasMobileNavLinks ? (
                <div className="mt-4 border-t pt-4 space-y-1 text-sm text-gray-500">
                  <a href="tel:+4940123456789" className="block hover:text-gray-700">
                    040 123 456 789
                  </a>
                  <a href="mailto:info@nordhilfe.hamburg" className="block hover:text-gray-700">
                    info@nordhilfe.hamburg
                  </a>
                </div>
              ) : (
                <div className="space-y-1 text-sm text-gray-500">
                  <a href="tel:+4940123456789" className="block hover:text-gray-700">
                    040 123 456 789
                  </a>
                  <a href="mailto:info@nordhilfe.hamburg" className="block hover:text-gray-700">
                    info@nordhilfe.hamburg
                  </a>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
