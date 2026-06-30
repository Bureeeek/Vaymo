import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const items = [
  { num: '+20',  labelKey: 'stats.brands.label',   descKey: 'stats.brands.desc'   },
  { num: '+5M',  labelKey: 'stats.reach.label',    descKey: 'stats.reach.desc'    },
  { num: '+50',  labelKey: 'stats.creators.label', descKey: 'stats.creators.desc' },
  { num: '1',    labelKey: 'stats.goal.label',     descKey: 'stats.goal.desc'     },
];

export function Stats() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold mb-14 md:mb-16"
        >
          {t('stats.title')}
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 lg:gap-x-10">
          {items.map((item, i) => (
            <motion.div
              key={item.labelKey}
              className="group cursor-default"
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-5xl sm:text-6xl font-bold tracking-tight leading-none mb-3
                              text-foreground group-hover:text-foreground/70 transition-colors duration-300">
                {item.num}
              </div>
              <div className="text-sm font-semibold text-foreground mb-2">
                {t(item.labelKey)}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(item.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
