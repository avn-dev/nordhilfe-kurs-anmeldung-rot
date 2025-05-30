
import Header from '@/components/admin/Header';
import Footer from '@/components/Footer';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@/components/ui/navigation-menu';

const Admin = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 w-full">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Administration</h1>
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">§1 Geltungsbereich</h2>
              <p className="text-gray-700">
                Diese Allgemeinen Geschäftsbedingungen gelten für alle Erste-Hilfe-Kurse und Ausbildungen, die von Nordhilfe Hamburg durchgeführt werden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">§2 Anmeldung und Vertragsschluss</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Die Anmeldung zu unseren Kursen erfolgt über unser Online-Buchungssystem oder telefonisch. Mit der Anmeldung bieten Sie uns den Abschluss eines Ausbildungsvertrages an.
                </p>
                <p className="text-gray-700">
                  Der Vertrag kommt durch unsere Bestätigung (per E-Mail oder telefonisch) zustande. Die Teilnahme ist erst nach erfolgter Anmeldung und Bestätigung durch uns möglich.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">§3 Kursgebühren und Zahlung</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Die Kursgebühren sind aus der aktuellen Preisliste ersichtlich und vor Kursbeginn zu entrichten. Die Zahlung kann bar vor Ort oder per Überweisung erfolgen.
                </p>
                <p className="text-gray-700">
                  Im Kurspreis enthalten sind die Ausbildung sowie die Ausstellung des Zertifikats nach erfolgreicher Teilnahme.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">§4 Stornierung und Umbuchung</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <strong>Stornierung durch den Teilnehmer:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Bis 7 Tage vor Kursbeginn: kostenfrei</li>
                  <li>3-6 Tage vor Kursbeginn: 50% der Kursgebühr</li>
                  <li>Weniger als 3 Tage vor Kursbeginn: 100% der Kursgebühr</li>
                </ul>
                <p className="text-gray-700">
                  Umbuchungen sind bis 3 Tage vor Kursbeginn einmalig kostenfrei möglich.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">§5 Kursablauf und Zertifikat</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Unsere Erste-Hilfe-Kurse umfassen 9 Unterrichtseinheiten (8 Stunden) und entsprechen den Vorgaben der Fahrerlaubnisverordnung und der DGUV.
                </p>
                <p className="text-gray-700">
                  Für die Ausstellung des Zertifikats ist die vollständige Teilnahme am Kurs erforderlich. Das Zertifikat wird von allen Führerscheinstellen in Deutschland anerkannt.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">§6 Haftung</h2>
              <p className="text-gray-700">
                Die Teilnahme an den Kursen erfolgt auf eigene Gefahr. Eine Haftung für Schäden, die während der praktischen Übungen entstehen, ist ausgeschlossen, soweit nicht Vorsatz oder grobe Fahrlässigkeit vorliegt.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">§7 Datenschutz</h2>
              <p className="text-gray-700">
                Die erhobenen personenbezogenen Daten werden ausschließlich zur Durchführung der Kurse und Ausstellung der Zertifikate verwendet. Weitere Informationen finden Sie in unserer Datenschutzerklärung.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">§8 Schlussbestimmungen</h2>
              <p className="text-gray-700">
                Es gilt deutsches Recht. Gerichtsstand ist Hamburg. Sollten einzelne Bestimmungen dieser AGB unwirksam sein, berührt dies die Gültigkeit der übrigen Bestimmungen nicht.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
