import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CaseStudies } from '@/components/CaseStudies';
import { Intro } from '@/components/Intro';
import { Platforms } from '@/components/Platforms';
import { ContentShowcase } from '@/components/ContentShowcase';
import { WhyVaymo } from '@/components/WhyVaymo';
import { Stats } from '@/components/Stats';
import { Testimonials } from '@/components/Testimonials';
import { Team } from '@/components/Team';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { PixarLoader } from '@/components/PixarLoader';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <PixarLoader />
      <AnimatedBackground />
      <Header />
      <main className="relative">
        <Hero />
        <CaseStudies />
        <Intro />
        <Platforms />
        <ContentShowcase />
        <WhyVaymo />
        <Stats />
        <Testimonials />
        <Team />
        <FinalCTA />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;
