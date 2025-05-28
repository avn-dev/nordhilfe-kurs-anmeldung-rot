
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CourseOverview from '@/components/CourseOverview';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <CourseOverview />
      <BookingSection />
      <Footer />
    </div>
  );
};

export default Index;
