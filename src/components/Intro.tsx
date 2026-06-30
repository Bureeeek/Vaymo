import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function Intro() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 relative">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-6 tracking-tight"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('intro.title')}
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('intro.text')}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
