import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';

function ImpressumContent() {
  const { language } = useLanguage();

  if (language === 'en') {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-32 pb-20">
          <div className="section-container max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-12">Legal Notice</h1>
            
            <div className="space-y-8 text-muted-foreground">
              <section>
                <p className="text-foreground font-medium">Maximilian Weigel</p>
                <p>Max Weigel - Vaymo Agency</p>
                <p>Berthold-Schwarz-Straße 8</p>
                <p>13599 Berlin, Germany</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
                <p>Phone: +49 176 20189873</p>
                <p>Email: max@vaymo-agency.com</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">VAT ID</h2>
                <p>
                  VAT identification number pursuant to § 27 a of the German VAT Act: DE461053746
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  Consumer Dispute Resolution
                </h2>
                <p>
                  We are neither willing nor obligated to participate in dispute resolution proceedings 
                  before a consumer arbitration board.
                </p>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-20">
        <div className="section-container max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-12">Impressum</h1>
          
          <div className="space-y-8 text-muted-foreground">
            <section>
              <p className="text-foreground font-medium">Maximilian Weigel</p>
              <p>Max Weigel - Vaymo Agency</p>
              <p>Berthold-Schwarz-Straße 8</p>
              <p>13599 Berlin</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Kontakt</h2>
              <p>Telefon: 017620189873</p>
              <p>E-Mail: max@vaymo-agency.com</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE461053746
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Verbraucherstreitbeilegung/Universalschlichtungsstelle
              </h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ImpressumPage() {
  return (
    <LanguageProvider>
      <ImpressumContent />
    </LanguageProvider>
  );
}