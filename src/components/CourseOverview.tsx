import { useEffect, useState } from 'react';
import { getCourses } from '@/api';
import CourseCard from './CourseCard';

const CourseOverview = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        setError('Kurse konnten nicht geladen werden.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="py-20 bg-gray-50" id="kurse" aria-labelledby="courses-heading">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h2 id="courses-heading" className="text-4xl font-bold text-gray-900 mb-4">
            Unsere Erste-Hilfe-Kurse in Hamburg
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Wählen Sie den passenden Erste-Hilfe-Kurs für Ihre Bedürfnisse.
          </p>
        </header>

        {loading && <p className="text-center text-gray-500">Kurse werden geladen…</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-8" role="list" aria-label="Kurse">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseOverview;
