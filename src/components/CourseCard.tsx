import { motion } from 'framer-motion';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Clock } from 'lucide-react';

const fallbackFeatures = [
  'Lebensrettende Sofortmaßnahmen',
  'Herz-Lungen-Wiederbelebung',
  'Wundversorgung',
  'Zertifikat'
];

const formatPrice = (price: number): string => {
  return price % 1 === 0
    ? `${price.toFixed(0)}€` // z. B. 50 → "50€"
    : `${price.toFixed(2).replace('.', ',')}€`; // z. B. 45.9 → "45,90€"
};


const CourseCard = ({ course, index }: { course: any; index: number }) => {
  const { ref, inView } = useInViewAnimation();

  return (
    <motion.article
      ref={ref}
      role="listitem"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Card className="bg-white hover:shadow-xl transition-shadow duration-300 h-full">
        <CardHeader className="pb-4">
          <div className="bg-primary-500 p-3 rounded-lg w-fit mb-4">
            <Award className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-900 mb-2">
            {course.name}
          </CardTitle>
          <p className="text-gray-600">{course.description || 'Beschreibung folgt'}</p>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 mb-6">
            <div className="flex items-center text-gray-700">
              <Clock className="h-4 w-4 mr-2 text-primary-500" />
              <span className="text-sm">9 Unterrichtseinheiten (1 Tag)</span>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-2">Kursinhalte:</h4>
              <ul className="space-y-1" role="list">
                {(course.features || fallbackFeatures).map((feature: string, idx: number) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-center" role="listitem">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary-500">
                {formatPrice(course.base_price)}
              </span>
              <span className="text-sm text-gray-500">pro Person</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
};

export default CourseCard;
