import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

export function WhyVaymo() {
  const { t } = useLanguage();
  const points = ['point1', 'point2', 'point3', 'point4'];

  return (
    <section className="pt-12 md:pt-16 pb-24 md:pb-28 relative">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs uppercase tracking-[0.25em] text-primary/80 mb-4 block">
              {t('why.eyebrow')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              {t('why.title')}
            </h2>
          </motion.div>

          <div className="space-y-6">
            {points.map((p, i) => (
              <motion.div
                key={p}
                className="flex gap-4 items-start"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold mb-1">
                    {t(`why.${p}.title`)}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {t(`why.${p}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
