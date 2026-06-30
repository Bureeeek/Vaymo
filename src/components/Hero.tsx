import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export function Hero() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Background: parallax — drifts up slower than scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  // Extra dark overlay increases as you scroll into next section
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.65], [0, 0.75]);

  // VAYMO: zooms toward the viewer
  const wordmarkScale   = useTransform(scrollYProgress, [0, 0.7], [1, 1.55]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Eyebrow / tagline / buttons fade + float up
  const textOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.32], [0, -24]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col pt-14 md:pt-16 overflow-hidden"
    >

      {/* ── Layer 1: Background image with parallax + Ken Burns ── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <img
          src="/Hero-Background.png"
          alt=""
          className="w-full h-full object-cover object-center select-none"
          style={{
            position: 'absolute',
            inset: '-15% 0 -15% 0',
            height: '130%',
            animation: 'kenBurns 22s ease-in-out infinite alternate',
          }}
        />
      </motion.div>

      {/* ── Layer 2: Static gradient overlay (top + bottom dark, centre open) ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, hsl(220 8% 5% / 0.70) 0%, hsl(220 8% 5% / 0.25) 28%, hsl(220 8% 5% / 0.45) 62%, hsl(220 8% 5% / 1.00) 100%)',
        }}
      />

      {/* ── Layer 3: Scroll-driven darkening ── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: overlayOpacity,
          background: 'hsl(220 8% 5%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative flex-1 flex flex-col items-center justify-center section-container text-center py-16">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ opacity: textOpacity, y: textY }}
          className="text-[11px] uppercase tracking-[0.3em] text-foreground/60 mb-6"
        >
          Creator Marketing Agency
        </motion.p>

        {/* VAYMO — zooms toward viewer on scroll */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ scale: wordmarkScale, opacity: wordmarkOpacity }}
          className="font-anton uppercase select-none text-foreground
                     text-[22vw] sm:text-[18vw] md:text-[14vw] lg:text-[11rem] xl:text-[13rem]
                     leading-none tracking-[0.06em] mb-8 will-change-transform"
        >
          Vaymo
        </motion.h1>

        {/* Tagline + buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{ opacity: textOpacity, y: textY }}
          className="flex flex-col items-center gap-8"
        >
          <p className="text-base sm:text-lg md:text-xl text-foreground/75 max-w-md leading-relaxed">
            {t('hero.headline')}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="rounded-full bg-foreground text-background px-8 h-12 text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              {t('nav.cta')}
            </button>
            <button
              onClick={() => document.querySelector('#cases')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              {t('hero.secondary')}
            </button>
          </div>
        </motion.div>

      </div>

      {/* ── Bottom bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        style={{ opacity: textOpacity }}
        className="relative section-container pb-6 border-t border-white/10 flex items-center justify-between pt-5"
      >
        <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/40">
          DACH · Europe · LatAm
        </span>
        <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/40">
          YouTube · Instagram · TikTok
        </span>
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-foreground/30 text-sm"
        >
          ↓
        </motion.span>
      </motion.div>

    </section>
  );
}
