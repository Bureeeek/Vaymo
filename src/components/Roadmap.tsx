import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Handshake, FileText, Zap, Target, Wallet, Search, CheckCircle, Settings, BarChart3, ClipboardList, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

type RoadmapType = 'brands' | 'creator';

const creatorSteps = [
  { icon: Handshake, key: 'matchmaking' },
  { icon: FileText, key: 'briefings' },
  { icon: Zap, key: 'feedback' },
  { icon: Target, key: 'alignment' },
  { icon: Wallet, key: 'payout' },
];

const brandSteps = [
  { icon: ClipboardList, key: 'strategy' },
  { icon: Search, key: 'sourcing' },
  { icon: CheckCircle, key: 'approval' },
  { icon: Settings, key: 'management' },
  { icon: Target, key: 'quality' },
  { icon: BarChart3, key: 'payout' },
];

export function Roadmap() {
  const { t } = useLanguage();
  const [activeType, setActiveType] = useState<RoadmapType>('brands');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.4", "end 0.6"]
  });

  const steps = activeType === 'creator' ? creatorSteps : brandSteps;

  return (
    <section id="process" className="py-24 md:py-32 relative overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      
      <div className="relative section-container">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t('process.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('process.subtitle')}
          </p>
        </motion.div>

        {/* Toggle Switch */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center rounded-full border border-border bg-card p-1">
            <button
              onClick={() => setActiveType('brands')}
              className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeType === 'brands'
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {activeType === 'brands' && (
                <motion.div
                  layoutId="roadmap-toggle"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{t('roadmap.forBrands')}</span>
            </button>
            <button
              onClick={() => setActiveType('creator')}
              className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeType === 'creator'
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {activeType === 'creator' && (
                <motion.div
                  layoutId="roadmap-toggle"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{t('roadmap.forCreator')}</span>
            </button>
          </div>
        </motion.div>

        {/* Roadmap */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, x: activeType === 'creator' ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeType === 'creator' ? -50 : 50 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="relative"
            >
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === steps.length - 1;
                const translationPrefix = activeType === 'creator' ? 'roadmap.creator' : 'roadmap.brand';
                const stepNumber = index + 1;
                
                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="relative"
                  >
                    {/* Animated Line Connector */}
                    {!isLast && (
                      <AnimatedLine scrollYProgress={scrollYProgress} index={index} totalSteps={steps.length} />
                    )}
                    
                    {/* Step Card */}
                    <div className="flex gap-4 mb-8">
                      {/* Step Number & Icon Box */}
                      <div className="flex flex-col items-center">
                        <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-muted border border-border flex items-center justify-center relative">
                          <Icon className="w-6 h-6 text-primary" />
                          {/* Step Number Badge */}
                          <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-[0_0_10px_hsl(var(--primary)/0.5)]">
                            {stepNumber}
                          </div>
                        </div>
                      </div>
                      
                      {/* Content Box */}
                      <div className="flex-1 p-4 rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:bg-card transition-all duration-300">
                        <h3 className="text-lg font-semibold mb-1">
                          {t(`${translationPrefix}.${step.key}.title`)}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {t(`${translationPrefix}.${step.key}.desc`)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* CTA Section - Only show for brands */}
          {activeType === 'brands' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <p className="text-lg text-muted-foreground mb-4">
                {t('roadmap.cta.text')}
              </p>
              <motion.a
                href="/effizienz-rechner"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated glow background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 20px hsl(var(--primary) / 0.4), 0 0 40px hsl(var(--primary) / 0.2)',
                      '0 0 30px hsl(var(--primary) / 0.6), 0 0 60px hsl(var(--primary) / 0.3)',
                      '0 0 20px hsl(var(--primary) / 0.4), 0 0 40px hsl(var(--primary) / 0.2)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                />
                <span className="relative z-10">{t('roadmap.cta.button')}</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </motion.a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// Animated Line Component with Glow
function AnimatedLine({ scrollYProgress, index, totalSteps }: { scrollYProgress: any; index: number; totalSteps: number }) {
  // Each line gets its own segment of the scroll - sequential, not overlapping
  const segmentSize = 0.8 / totalSteps;
  const startPoint = 0.1 + (index * segmentSize);
  const endPoint = 0.1 + ((index + 1) * segmentSize);
  
  const lineProgress = useTransform(
    scrollYProgress,
    [startPoint, endPoint],
    [0, 1]
  );

  return (
    <div className="absolute left-7 top-[60px] w-1 h-12 overflow-hidden">
      {/* Background dashed line */}
      <div className="absolute inset-0 border-l-2 border-dashed border-border/30" />
      {/* Animated fill line with glow */}
      <motion.div 
        className="absolute inset-0 w-full origin-top"
        style={{ 
          scaleY: lineProgress,
          background: 'linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 100%)',
          boxShadow: '0 0 12px hsl(var(--primary) / 0.8), 0 0 24px hsl(var(--primary) / 0.4)',
        }}
      />
      {/* Glow tip */}
      <motion.div 
        className="absolute w-3 h-3 -left-1 rounded-full"
        style={{ 
          top: useTransform(lineProgress, [0, 1], ['0%', '100%']),
          background: 'hsl(var(--primary))',
          boxShadow: '0 0 16px hsl(var(--primary)), 0 0 32px hsl(var(--primary) / 0.6)',
          opacity: useTransform(lineProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]),
        }}
      />
    </div>
  );
}
