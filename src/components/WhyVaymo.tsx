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
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              {t('why.title')}
            </h2>
          </motion.div>

          <div className="space-y-4">
            {points.map((p, i) => (
              <motion.div
                key={p}
                className="group flex gap-4 items-start p-4 rounded-xl border border-transparent
                           hover:border-border hover:bg-card transition-all duration-300 cursor-default"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mt-0.5 w-8 h-8 rounded-full bg-primary/10 border border-primary/20
                                flex items-center justify-center flex-shrink-0
                                group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold mb-1 group-hover:text-foreground transition-colors">
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
