import { Button } from '@/components/ui/button';
import { Heart, Shield, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

const HeroSection = () => {
  const left = useInViewAnimation();
  const right = useInViewAnimation();

  return (
    <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20" role="banner">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Linke Spalte */}
          <motion.div
            ref={left.ref}
            initial={{ opacity: 0, y: 80 }}
            animate={left.inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <header>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Erste Hilfe kann <span className="text-primary-500">Leben retten</span>
              </h1>
            </header>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Lernen Sie in unseren professionellen Erste-Hilfe-Kursen in Hamburg,
              wie Sie in Notfallsituationen richtig handeln. Nach 9 Unterrichtseinheiten (8 Stunden)
              können Sie Erste Hilfe leisten und erhalten ein von allen Führerscheinstellen anerkanntes Zertifikat.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                asChild
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 text-lg"
                aria-label="Erste-Hilfe-Kurs jetzt buchen"
              >
                <Link to="/anmeldung">Jetzt Kurs buchen</Link>
              </Button>
              <Button
                variant="outline"
                className="border-primary-500 text-primary-500 hover:bg-primary-50 px-8 py-3 text-lg"
                aria-label="Mehr über unsere Erste-Hilfe-Kurse erfahren"
              >
                Mehr erfahren
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6" role="list" aria-label="Kurs-Vorteile">
              {[Heart, Shield, Award, Clock].map((Icon, i) => (
                <div className="text-center" role="listitem" key={i}>
                  <div className="bg-white p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center shadow-md">
                    <Icon className="h-8 w-8 text-primary-500" aria-hidden="true" />
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-gray-700 px-1">
                    {['Lebensrettend', 'Zertifiziert', 'Führerschein-anerkannt', 'Flexibel'][i]}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Rechte Spalte */}
          <motion.aside
            ref={right.ref}
            initial={{ opacity: 0, y: 80 }}
            animate={right.inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1.4,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <img
                src="/placeholder.svg"
                alt="Erste-Hilfe-Kurs Hamburg - Professionelle Ausbildung bei Nordhilfe"
                className="w-full h-64 object-cover rounded-lg mb-6"
                loading="lazy"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Professionelle Ausbildung
              </h2>
              <p className="text-gray-700 mb-6">
                Unsere erfahrenen Ausbilder vermitteln Ihnen alle wichtigen
                Erste-Hilfe-Maßnahmen in Theorie und Praxis. Das Zertifikat wird von allen Führerscheinstellen anerkannt.
              </p>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>• 9 Unterrichtseinheiten</span>
                <span>• Zertifikat inklusive</span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
