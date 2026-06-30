import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="py-28 md:py-40 relative overflow-hidden">
      <div className="section-container">
        <motion.div
          className="max-w-3xl mx-auto text-center surface-card p-10 md:p-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-5 tracking-tight leading-tight">
            {t('final.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-9 max-w-xl mx-auto leading-relaxed">
            {t('final.subtitle')}
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/contact')}
            className="btn-glow text-base px-7 py-6 h-auto rounded-full group bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {t('final.cta')}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
