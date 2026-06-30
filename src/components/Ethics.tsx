import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, Users, Heart, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface EthicsCard {
  icon: LucideIcon;
  key: string;
}

const ethicsCards: EthicsCard[] = [
  { icon: Eye, key: 'transparency' },
  { icon: Users, key: 'authentic' },
  { icon: Heart, key: 'fair' },
];

function EthicsCardItem({ card, index }: { card: EthicsCard; index: number }) {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const Icon = card.icon;

  return (
    <motion.div
      className="relative h-72 sm:h-80 cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative h-full rounded-2xl overflow-hidden backdrop-blur-xl border"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--card) / 0.6) 0%, hsl(var(--card) / 0.4) 100%)',
        }}
        animate={{
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
          borderColor: isHovered ? 'hsl(var(--secondary))' : 'hsl(var(--border) / 0.5)',
          boxShadow: isHovered 
            ? '0 0 40px hsl(var(--secondary) / 0.3), 0 20px 40px hsl(var(--background) / 0.5)'
            : '0 0 20px hsl(var(--secondary) / 0.1), 0 10px 20px hsl(var(--background) / 0.3)',
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Pulsing border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: [
              'inset 0 0 20px hsl(var(--secondary) / 0.1)',
              'inset 0 0 30px hsl(var(--secondary) / 0.2)',
              'inset 0 0 20px hsl(var(--secondary) / 0.1)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
        />

        {/* Background glow on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content container */}
        <div className="relative h-full flex flex-col items-center justify-start p-6 sm:p-8">
          {/* Icon with duo-tone glow */}
          <div className="relative mb-5 mt-4">
            {/* Icon shadow/glow (second color) */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center blur-xl"
              animate={{ opacity: isHovered ? 0.8 : 0.4 }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="w-14 h-14 text-secondary" />
            </motion.div>
            
            {/* Main icon */}
            <motion.div
              className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center backdrop-blur-sm border border-secondary/30"
              animate={{
                scale: isHovered ? 1.1 : 1,
                borderColor: isHovered ? 'hsl(var(--secondary) / 0.6)' : 'hsl(var(--secondary) / 0.3)',
                boxShadow: isHovered 
                  ? '0 0 30px hsl(var(--secondary) / 0.4)'
                  : '0 0 15px hsl(var(--secondary) / 0.2)',
              }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="w-8 h-8 text-secondary" />
            </motion.div>
          </div>

          {/* Keyword */}
          <motion.h3
            className="text-xl sm:text-2xl font-bold mb-4 text-center"
            animate={{
              color: isHovered ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
              textShadow: isHovered 
                ? '0 0 20px hsl(var(--secondary) / 0.5)'
                : '0 0 0px transparent',
            }}
            transition={{ duration: 0.3 }}
          >
            {t(`ethics.${card.key}.keyword`)}
          </motion.h3>

          {/* Long text - slides in from bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 sm:p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 30,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center">
              {t(`ethics.${card.key}.desc`)}
            </p>
          </motion.div>

          {/* Gradient fade for text reveal */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, hsl(var(--card) / 0.9) 0%, transparent 100%)',
            }}
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Ethics() {
  const { t } = useLanguage();

  return (
    <section id="ethics" className="py-24 md:py-32 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
      
      <div className="relative section-container">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10 text-sm text-secondary mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-4 h-4" />
            </motion.div>
            Ethical Marketing
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t('ethics.title')}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('ethics.subtitle')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {ethicsCards.map((card, index) => (
            <EthicsCardItem key={card.key} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
