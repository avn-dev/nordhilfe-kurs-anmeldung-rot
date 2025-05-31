import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { Link } from 'react-router-dom';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const SessionCard = ({ session, delay = 0 }: { session: any; delay?: number }) => {
  const { ref, inView } = useInViewAnimation();
  const isLimited = session.max_participants > 0;
  const spotsLeft = session.max_participants - session.participants_count;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <Link to={`/anmeldung?course=${session.course.id}&date=${session.id}`}>
        <Card
          className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-primary-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {session.course.name}
                </h4>
                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(session.session_date)}
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <MapPin className="h-4 w-4 mr-2" />
                  {session.location.full_address_with_name}
                </div>
                {isLimited && (
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    {spotsLeft > 0 ? `${spotsLeft} Plätze verfügbar` : 'Keine Plätze verfügbar'}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary-500">
                  {session.start_time} - {session.end_time}
                </div>
                <div className="text-sm text-gray-500">Uhrzeit</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default SessionCard;
