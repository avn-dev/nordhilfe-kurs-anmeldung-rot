
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CourseOverview from '@/components/CourseOverview';
import Footer from '@/components/Footer';
import AvailableDates from '@/components/AvailableDates';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <CourseOverview />
      <AvailableDates />
      
      {/* Call-to-Action Section */}
      <section className="py-20 bg-primary-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Bereit für Ihren Erste-Hilfe-Kurs?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Melden Sie sich jetzt an und lernen Sie lebensrettende Maßnahmen von erfahrenen Ausbildern.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-white text-primary-500 hover:bg-gray-100 px-8 py-4 text-lg"
          >
            <Link to="/anmeldung">Jetzt zur Anmeldung</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
