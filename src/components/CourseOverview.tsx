
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, Award } from 'lucide-react';

const CourseOverview = () => {
  const courses = [
    {
      title: "Erste-Hilfe-Grundkurs",
      description: "Kompletter Erste-Hilfe-Kurs für Führerschein, Beruf und Alltag",
      duration: "9 Unterrichtseinheiten (1 Tag)",
      price: "45€",
      features: ["Lebensrettende Sofortmaßnahmen", "Herz-Lungen-Wiederbelebung", "Wundversorgung", "Zertifikat"]
    },
    {
      title: "Erste-Hilfe-Fortbildung",
      description: "Auffrischung für Ersthelfer in Betrieben",
      duration: "9 Unterrichtseinheiten (1 Tag)",
      price: "45€",
      features: ["Auffrischung der Kenntnisse", "Neue Richtlinien", "Praktische Übungen", "Zertifikat"]
    },
    {
      title: "Erste-Hilfe am Kind",
      description: "Spezielle Erste-Hilfe-Maßnahmen für Säuglinge und Kleinkinder",
      duration: "9 Unterrichtseinheiten (1 Tag)",
      price: "50€",
      features: ["Kindernotfälle", "Reanimation bei Kindern", "Vergiftungen", "Zertifikat"]
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="kurse" aria-labelledby="courses-heading">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h2 id="courses-heading" className="text-4xl font-bold text-gray-900 mb-4">
            Unsere Erste-Hilfe-Kurse in Hamburg
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Wählen Sie den passenden Erste-Hilfe-Kurs für Ihre Bedürfnisse. 
            Alle Kurse sind behördlich anerkannt und zertifiziert.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8" role="list" aria-label="Verfügbare Erste-Hilfe-Kurse">
          {courses.map((course, index) => (
            <article key={index} role="listitem">
              <Card className="bg-white hover:shadow-xl transition-shadow duration-300 h-full">
                <CardHeader className="pb-4">
                  <div className="bg-primary-500 p-3 rounded-lg w-fit mb-4">
                    <Award className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                    <h3>{course.title}</h3>
                  </CardTitle>
                  <p className="text-gray-600">{course.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-4 w-4 mr-2 text-primary-500" aria-hidden="true" />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Kursinhalte:</h4>
                      <ul className="space-y-1" role="list">
                        {course.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center" role="listitem">
                            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2" aria-hidden="true"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-500" aria-label={`Preis ${course.price}`}>{course.price}</span>
                      <span className="text-sm text-gray-500">pro Person</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseOverview;
