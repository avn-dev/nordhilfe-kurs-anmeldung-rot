
import { Heart, Phone, Mail } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-500 p-2 rounded-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Nordhilfe</h1>
              <p className="text-sm text-gray-600">Erste-Hilfe-Kurse Hamburg</p>
            </div>
          </div>
          
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
        </div>
      </div>
    </header>
  );
};

export default Header;
