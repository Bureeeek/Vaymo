import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type CaseStudy = {
  id: string;
  client: string;
  year: string;
  category: string;
  descKey: string;
  metrics: { value: string; labelKey: string }[];
  tags: string[];
};

const studies: CaseStudy[] = [
  {
    id: 'ubigi',
    client: 'Ubigi',
    year: '2025',
    category: 'Travel · eSIM',
    descKey: 'cases.ubigi.desc',
    metrics: [
      { value: '12+',  labelKey: 'cases.metric.creators'   },
      { value: '2.4M', labelKey: 'cases.metric.reach'      },
      { value: '6.1%', labelKey: 'cases.metric.engagement' },
    ],
    tags: ['Instagram', 'TikTok'],
  },
  {
    id: 'proton',
    client: 'Proton',
    year: '2024',
    category: 'Privacy · SaaS',
    descKey: 'cases.proton.desc',
    metrics: [
      { value: '8',    labelKey: 'cases.metric.creators'   },
      { value: '1.1M', labelKey: 'cases.metric.reach'      },
      { value: '4.8%', labelKey: 'cases.metric.engagement' },
    ],
    tags: ['YouTube', 'Long-Form'],
  },
  {
    id: 'placeholder',
    client: 'Your Brand',
    year: '2026',
    category: '—',
    descKey: 'cases.next.desc',
    metrics: [
      { value: '∞', labelKey: 'cases.metric.creators' },
      { value: '—', labelKey: 'cases.metric.reach'    },
      { value: '—', labelKey: 'cases.metric.engagement' },
    ],
    tags: [],
  },
];

export function CaseStudies() {
  const { t } = useLanguage();

  return (
    <section id="cases" className="py-24 md:py-32 border-t border-border">
      <div className="section-container">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 max-w-2xl"
        >
          <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-5 block">
            {t('cases.eyebrow')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
            {t('cases.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t('cases.subtitle')}
          </p>
        </motion.div>

        <div>
          {studies.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`group grid grid-cols-12 gap-x-6 gap-y-5 py-9 md:py-11 items-center cursor-default
                          ${i < studies.length - 1 ? 'border-b border-border' : ''}`}
            >
              {/* Index */}
              <div className="col-span-1">
                <span className="text-xs text-muted-foreground/30 font-mono tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Client name + meta */}
              <div className="col-span-11 md:col-span-3">
                <div className="font-anton uppercase text-3xl sm:text-4xl md:text-[2.6rem] text-foreground leading-none tracking-wide mb-3">
                  {s.client}
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {s.category}
                  </span>
                  {s.year && (
                    <>
                      <span className="text-muted-foreground/30 text-[10px]">·</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {s.year}
                      </span>
                    </>
                  )}
                  {s.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="col-span-12 md:col-span-5 md:px-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(s.descKey)}
                </p>
              </div>

              {/* Metrics + arrow */}
              <div className="col-span-12 md:col-span-3 flex items-center justify-between md:justify-end gap-6">
                <div className="flex gap-7">
                  {s.metrics.slice(0, 2).map(m => (
                    <div key={m.labelKey}>
                      <div className="text-xl font-bold text-foreground leading-none tabular-nums">
                        {m.value}
                      </div>
                      <div className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground mt-1.5">
                        {t(m.labelKey)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="shrink-0 w-9 h-9 rounded-full border border-border
                                flex items-center justify-center
                                group-hover:border-foreground/40 group-hover:bg-foreground/5
                                transition-all duration-200">
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
