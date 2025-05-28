
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Datenschutz = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Datenschutz auf einen Blick</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Allgemeine Hinweise</h3>
                  <p className="text-gray-700">
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Datenerfassung auf dieser Website</h3>
                  <p className="text-gray-700">
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Hosting</h2>
              <p className="text-gray-700">
                Wir hosten die Inhalte unserer Website bei einem externen Dienstleister. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Datenschutz</h3>
                  <p className="text-gray-700">
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Hinweis zur verantwortlichen Stelle</h3>
                  <p className="text-gray-700">
                    Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                  </p>
                  <div className="mt-2 space-y-1">
                    <p>Nordhilfe Hamburg</p>
                    <p>Musterstraße 123</p>
                    <p>20095 Hamburg</p>
                    <p>Telefon: 040 123 456 789</p>
                    <p>E-Mail: info@nordhilfe.hamburg</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Datenerfassung auf dieser Website</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Kursbuchungen</h3>
                  <p className="text-gray-700">
                    Wenn Sie sich für einen Erste-Hilfe-Kurs anmelden, erheben wir folgende Daten: Vor- und Nachname, E-Mail-Adresse und optional Ihre Telefonnummer. Diese Daten werden zur Durchführung des Kurses und zur Ausstellung des Zertifikats benötigt.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Server-Log-Dateien</h3>
                  <p className="text-gray-700">
                    Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Ihre Rechte</h2>
              <p className="text-gray-700">
                Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
