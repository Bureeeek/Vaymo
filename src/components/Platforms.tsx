import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Instagram, Camera, Sparkles, type LucideIcon } from 'lucide-react';

const TikTokIcon: LucideIcon = (({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.2a8.16 8.16 0 0 0 4.77 1.52V6.27a4.85 4.85 0 0 1-1.84-.42z" />
  </svg>
)) as unknown as LucideIcon;

type Platform = {
  key: string;
  name: string;
  icon: LucideIcon;
  tags: string[];
  desc: string;
  format: string;
  audience: string;
  goal: string;
};

const platforms: Platform[] = [
  {
    key: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    tags: ['Trust', 'Long-form', 'Search'],
    desc: 'Für längere Erklärungen, Vertrauen und Produkte, die mehr Kontext brauchen.',
    format: 'Integration · Review · Tutorial',
    audience: '8 – 25 Min · suchend',
    goal: 'Vertrauen aufbauen',
  },
  {
    key: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    tags: ['Community', 'Reels', 'Story'],
    desc: 'Für Reels, Storys und Creator, die nah an ihrer Community sind.',
    format: 'Reel · Story · Carousel',
    audience: '15 – 60 Sek · scrollend',
    goal: 'Community aktivieren',
  },
  {
    key: 'tiktok',
    name: 'TikTok',
    icon: TikTokIcon,
    tags: ['Reach', 'Trends', 'Native'],
    desc: 'Für schnelle Aufmerksamkeit, Trends und natürliche Produktmomente.',
    format: 'Native Post · Hook-First',
    audience: '7 – 30 Sek · entdeckend',
    goal: 'Reichweite & Buzz',
  },
  {
    key: 'ugc',
    name: 'UGC',
    icon: Camera,
    tags: ['Ad Creative', 'Owned', 'Performance'],
    desc: 'Für Content, den du auf deinen eigenen Kanälen, Ads oder Landingpages nutzen kannst.',
    format: 'Vertical · Hook + CTA',
    audience: 'Paid Social · Web',
    goal: 'Performance & Conversion',
  },
];

export function Platforms() {
  const [active, setActive] = useState(0);
  const current = platforms[active];

  return (
    <section className="pt-12 md:pt-16 pb-20 md:pb-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="section-container relative">
        {/* Header */}
        <motion.div
          className="max-w-3xl mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/10 mb-5">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-primary/90">
              Platform Mix
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 leading-[1.1]">
            Content dort, wo deine Zielgruppe{' '}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
              wirklich schaut
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Wir planen nicht nach Plattform-Checkliste. Wir schauen, wo dein Produkt natürlich reinpasst — ob YouTube, Instagram, TikTok oder UGC.
          </p>
        </motion.div>

        {/* Platform pills */}
        <div className="relative mb-6">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent hidden sm:block" />
          <div className="relative flex flex-wrap justify-center gap-2 sm:gap-3">
            {platforms.map((p, i) => {
              const Icon = p.icon;
              const isActive = i === active;
              return (
                <button
                  key={p.key}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group relative flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full border backdrop-blur-md transition-all ${
                    isActive
                      ? 'border-primary/50 bg-primary/15 shadow-[0_0_24px_-6px_hsl(var(--primary)/0.6)]'
                      : 'border-foreground/10 bg-background/40 hover:border-foreground/20 hover:bg-background/60'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      isActive ? 'bg-primary/25 text-primary' : 'bg-foreground/[0.06] text-muted-foreground group-hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-foreground/80'}`}>
                    {p.name}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="platform-dot"
                      className="ml-1 w-1.5 h-1.5 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div className="relative rounded-2xl border border-foreground/10 bg-background/40 backdrop-blur-md p-6 md:p-8 max-w-5xl mx-auto overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-2 gap-6 md:gap-10 items-center"
            >
              {/* Left: copy */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {current.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-primary/25 bg-primary/10 text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                  {current.name}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {current.desc}
                </p>
              </div>

              {/* Right: mini preview */}
              <div className="space-y-2.5">
                {[
                  { label: 'Format',       v: current.format },
                  { label: 'Audience',     v: current.audience },
                  { label: 'Vaymo Use',    v: current.goal },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl border border-foreground/10 bg-background/40"
                  >
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{row.label}</span>
                    <span className="text-sm text-foreground/90 text-right">{row.v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer note */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          Wir wählen den Mix nach Ziel — nicht nach Hype.
        </div>
      </div>
    </section>
  );
}
