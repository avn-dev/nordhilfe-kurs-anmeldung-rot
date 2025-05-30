
import { Link } from 'react-router-dom';

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
                className="h-24 w-24"
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
                <Link to="/admin/kurse" className="hover:text-gray-400">Kursverwaltung</Link>
                
              {/* <Link to="/datenschutz" className="text-gray-400 hover:text-white text-sm transition-colors">
                Datenschutz
              </Link> */}
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Link to="/admin/anmeldungen" className="hover:text-gray-400">Anmeldungen</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
