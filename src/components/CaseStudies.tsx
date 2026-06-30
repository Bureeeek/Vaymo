import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CARD_W = 360;
const CARD_H = 216;
const GAP    = 16;

type Brand = {
  id: string;
  name: string;
  logo?: string;
  bg: string;
  logoFilter?: string;
  logoScale?: number;
  category: string;
};

const brands: Brand[] = [
  {
    id: 'ubigi',
    name: 'Ubigi',
    logo: '/brands/ubigi.svg',
    bg: 'linear-gradient(145deg, #0b1e45 0%, #0e2d6b 55%, #0a1a38 100%)',
    logoFilter: 'brightness(1.2)',
    category: 'Travel · eSIM',
  },
  {
    id: 'proton',
    name: 'Proton',
    logo: '/brands/proton.svg',
    bg: 'linear-gradient(145deg, #160d2e 0%, #2a1260 55%, #1a0a38 100%)',
    logoFilter: 'brightness(1.1)',
    category: 'Privacy · SaaS',
  },
  {
    id: 'nextory',
    name: 'Nextory',
    logo: '/brands/nextory.svg',
    bg: 'linear-gradient(145deg, #2a1500 0%, #5c2e00 55%, #3a1a00 100%)',
    logoFilter: 'brightness(1.1)',
    logoScale: 1.6,
    category: 'Books · Audio',
  },
  {
    id: 'your-brand',
    name: 'Your Brand',
    bg: 'linear-gradient(145deg, hsl(220 8% 9%) 0%, hsl(220 8% 13%) 100%)',
    category: '2026',
  },
];

function BrandCard({ brand }: { brand: Brand }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 rounded-2xl overflow-hidden flex items-center justify-center
                 transition-all duration-300 ease-out cursor-pointer
                 hover:scale-[1.03] hover:brightness-110
                 ring-1 ring-white/5 hover:ring-white/20"
      style={{ width: CARD_W, height: CARD_H, background: brand.bg }}
    >
      {/* subtle noise / grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '160px',
        }}
      />

      {/* logo or name */}
      <div className="relative z-10 flex items-center justify-center p-8 w-full h-full">
        {brand.logo && !imgErr ? (
          <img
            src={brand.logo}
            alt={brand.name}
            onError={() => setImgErr(true)}
            className="max-h-20 max-w-[72%] object-contain select-none"
            style={{ filter: brand.logoFilter, transform: brand.logoScale ? `scale(${brand.logoScale})` : undefined }}
          />
        ) : (
          brand.id === 'your-brand' ? (
            <div className="text-center">
              <div className="text-foreground/20 text-xs uppercase tracking-[0.28em] mb-2">Next up</div>
              <div className="text-foreground/30 text-2xl font-bold tracking-wide">Your Brand</div>
            </div>
          ) : (
            <span className="text-white/80 text-2xl font-bold tracking-wide">{brand.name}</span>
          )
        )}
      </div>

      {/* bottom gradient edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)' }}
      />

      {/* category label */}
      <div className="absolute bottom-4 left-5 z-10">
        <span className="text-[10px] uppercase tracking-[0.22em] text-white/35">
          {brand.category}
        </span>
      </div>
    </div>
  );
}

export function CaseStudies() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const maxIndex = brands.length - 1;

  const slide = (dir: 1 | -1) => {
    const next = Math.min(maxIndex, Math.max(0, index + dir));
    setIndex(next);
    scrollRef.current?.scrollTo({ left: next * (CARD_W + GAP), behavior: 'smooth' });
  };

  return (
    <section id="cases" className="py-24 md:py-32 border-t border-border overflow-hidden">
      <div className="section-container">

        {/* Header row */}
        <div className="flex items-start justify-between gap-6 mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
              {t('cases.title')}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t('cases.subtitle')}
            </p>
          </motion.div>

          {/* Arrows */}
          <div className="flex items-center gap-2 flex-shrink-0 pt-1">
            <button
              onClick={() => slide(-1)}
              disabled={index === 0}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center
                         text-muted-foreground hover:text-foreground hover:border-foreground/40
                         disabled:opacity-20 disabled:cursor-default transition-all duration-200"
              aria-label="Previous"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => slide(1)}
              disabled={index >= maxIndex}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center
                         text-muted-foreground hover:text-foreground hover:border-foreground/40
                         disabled:opacity-20 disabled:cursor-default transition-all duration-200"
              aria-label="Next"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cards track */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-none"
          style={{ gap: GAP, scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          onScroll={e => {
            const left = (e.target as HTMLDivElement).scrollLeft;
            setIndex(Math.round(left / (CARD_W + GAP)));
          }}
        >
          {brands.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              style={{ scrollSnapAlign: 'start', flexShrink: 0 }}
            >
              <BrandCard brand={brand} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
