import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Users } from 'lucide-react';
import { getTrainingSessions } from '@/api';
import { motion } from 'framer-motion';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import SessionCard from './SessionCard';

const AvailableDates = () => {
  const [availableDates, setAvailableDates] = useState([]);
  const [loadingDates, setLoadingDates] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const sessions = await getTrainingSessions();
        setAvailableDates(sessions);
      } catch (err) {
        console.error('Fehler beim Laden der Termine:', err);
        setFetchError('Fehler beim Laden der Kurstermine');
      } finally {
        setLoadingDates(false);
      }
    };

    fetchDates();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Kurs buchen
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Melden Sie sich jetzt für einen unserer Erste-Hilfe-Kurse an.
          </p>
        </div>

        <div className="gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Verfügbare Termine</h3>

            {loadingDates && (
              <p className="text-gray-500">Lade verfügbare Termine...</p>
            )}

            {fetchError && (
              <p className="text-red-500">{fetchError}</p>
            )}

            {!loadingDates && !fetchError && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableDates.map((session, index) => (
                  <SessionCard key={session.id} session={session} delay={index * 0.1} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailableDates;
