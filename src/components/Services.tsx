import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Inbox,
  PhoneCall,
  Send,
  LayoutGrid,
  MessagesSquare,
  Rocket,
  Instagram,
  Youtube,
  Music2,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';

type Tone = 'received' | 'optional' | 'progress' | 'confirmed' | 'review' | 'live';

const toneStyles: Record<Tone, string> = {
  received:  'bg-primary/15 text-primary border-primary/30',
  optional:  'bg-foreground/[0.05] text-muted-foreground border-foreground/15',
  progress:  'bg-amber-400/10 text-amber-300 border-amber-400/25',
  confirmed: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/25',
  review:    'bg-primary/10 text-primary/90 border-primary/25',
  live:      'bg-primary/20 text-primary border-primary/40',
};

type Step = {
  num: string;
  short: string;
  title: string;
  desc: string;
  tag: string;
  tone: Tone;
  icon: LucideIcon;
};

const steps: Step[] = [
  { num: '01', short: 'Infos von euch',     title: 'Infos von euch',          desc: 'Ihr schickt uns kurz Produkt, Zielgruppe, Plattform und Kampagnenziel.',                              tag: 'Eingegangen',  tone: 'received',  icon: Inbox },
  { num: '02', short: 'Optionaler Call',    title: 'Optionaler Call',         desc: 'Wenn nötig, klären wir offene Punkte kurz gemeinsam.',                                                tag: 'Optional',     tone: 'optional',  icon: PhoneCall },
  { num: '03', short: 'Creator Outreach',   title: 'Creator Outreach',        desc: 'Wir gehen direkt raus — an neue passende Creator und an Creator aus dem bestehenden Vaymo-Netzwerk.', tag: 'In Progress',  tone: 'progress',  icon: Send },
  { num: '04', short: 'Kampagnen-Plan',     title: 'Kampagnen-Plan',          desc: 'Klare Übersicht in Google Sheet oder Miro — Creator, Preise, Timings und Deliverables.',              tag: 'Confirmed',    tone: 'confirmed', icon: LayoutGrid },
  { num: '05', short: 'Abstimmung',         title: 'Abstimmung',              desc: 'Wir übernehmen Briefing, Rückfragen, Anpassungen und Freigaben mit den Creatorn.',                    tag: 'In Review',    tone: 'review',    icon: MessagesSquare },
  { num: '06', short: 'Livegang',           title: 'Livegang',                desc: 'Sobald alles passt, geht der Content live — natürlich integriert, nicht wie klassische Werbung.',     tag: 'Live',         tone: 'live',      icon: Rocket },
];

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="pt-12 md:pt-16 pb-20 md:pb-24 relative overflow-hidden">
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
              Vaymo Workflow
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 leading-[1.1]">
            So läuft eine Kampagne{' '}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
              mit Vaymo
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Ein klarer Ablauf, direkte Kommunikation und volle Übersicht — ohne unnötiges Hin und Her.
          </p>
        </motion.div>

        {/* DESKTOP: Split layout */}
        <div className="hidden md:grid md:grid-cols-12 gap-6 lg:gap-8">
          {/* Left: Step nav */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="rounded-2xl border border-foreground/10 bg-background/40 backdrop-blur-md p-2">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === active;
                return (
                  <button
                    key={s.num}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`relative w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors ${
                      isActive ? 'bg-primary/10' : 'hover:bg-foreground/[0.04]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="step-active"
                        className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-primary"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center border transition-colors ${
                        isActive
                          ? 'border-primary/40 bg-primary/15 text-primary'
                          : 'border-foreground/10 bg-background/40 text-muted-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-muted-foreground/60">{s.num}</span>
                        <span className={`text-sm font-medium truncate ${isActive ? 'text-foreground' : 'text-foreground/80'}`}>
                          {s.short}
                        </span>
                      </div>
                    </div>
                    <span className={`hidden lg:inline-block text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-md border ${toneStyles[s.tone]}`}>
                      {s.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Detail panel */}
          <div className="md:col-span-7 lg:col-span-8">
            <div className="relative rounded-2xl border border-foreground/10 bg-background/40 backdrop-blur-md p-6 lg:p-8 min-h-[420px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <DetailHeader step={steps[active]} />
                  <div className="mt-5">
                    <StepVisual index={active} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* MOBILE: Accordion */}
        <div className="md:hidden space-y-2">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isOpen = i === active;
            return (
              <div
                key={s.num}
                className="rounded-xl border border-foreground/10 bg-background/40 backdrop-blur-md overflow-hidden"
              >
                <button
                  onClick={() => setActive(isOpen ? -1 : i)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                      isOpen ? 'border-primary/40 bg-primary/15 text-primary' : 'border-foreground/10 text-muted-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-muted-foreground/60">{s.num}</span>
                      <span className="text-sm font-medium">{s.short}</span>
                    </div>
                  </div>
                  <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-md border ${toneStyles[s.tone]}`}>
                    {s.tag}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                        <StepVisual index={i} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Detail header ---------- */
function DetailHeader({ step }: { step: Step }) {
  const Icon = step.icon;
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-muted-foreground/60">SCHRITT {step.num}</div>
            <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
          </div>
        </div>
        <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border ${toneStyles[step.tone]}`}>
          {step.tag}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{step.desc}</p>
    </div>
  );
}

/* ---------- Per-step visuals ---------- */
function StepVisual({ index }: { index: number }) {
  switch (index) {
    case 0: return <BriefVisual />;
    case 1: return <CallVisual />;
    case 2: return <OutreachVisual />;
    case 3: return <SheetVisual />;
    case 4: return <ApprovalVisual />;
    case 5: return <LiveVisual />;
    default: return null;
  }
}

function BriefVisual() {
  return (
    <div className="rounded-xl border border-foreground/10 bg-background/50 p-4">
      <div className="text-[10px] font-mono text-muted-foreground/60 mb-3">CAMPAIGN BRIEF</div>
      <div className="space-y-2 font-mono text-[12px]">
        {[
          ['Produkt', 'Skincare Serum'],
          ['Zielgruppe', 'Frauen 22–35'],
          ['Plattform', 'Instagram, TikTok'],
          ['Ziel', 'Awareness + Sales'],
          ['Budget', '€8.000'],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-3 py-1 border-b border-foreground/5 last:border-0">
            <span className="text-muted-foreground/70">{k}</span>
            <span className="text-foreground/90">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CallVisual() {
  return (
    <div className="rounded-xl border border-foreground/10 bg-background/50 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs text-muted-foreground">Google Meet</span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground/60">~20 MIN</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {['VA', 'YOU'].map((label, i) => (
          <div
            key={label}
            className="aspect-video rounded-lg border border-foreground/10 bg-gradient-to-br from-foreground/[0.04] to-background/30 flex items-center justify-center relative"
          >
            <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold flex items-center justify-center">
              {label}
            </div>
            {i === 0 && (
              <span className="absolute bottom-1.5 left-1.5 text-[9px] font-mono text-muted-foreground">Vaymo</span>
            )}
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-foreground/[0.03] border border-foreground/10 p-3">
        <div className="text-[10px] font-mono text-muted-foreground/60 mb-1.5">AGENDA</div>
        <ul className="text-[12px] text-foreground/80 space-y-1">
          <li>• Zielgruppe schärfen</li>
          <li>• Plattform-Mix abstimmen</li>
          <li>• Timing & Budget bestätigen</li>
        </ul>
      </div>
    </div>
  );
}

function OutreachVisual() {
  const creators = [
    { i: 'LM', p: 'ig' as const, status: 'new',     reply: false },
    { i: 'JK', p: 'tt' as const, status: 'new',     reply: true },
    { i: 'RS', p: 'yt' as const, status: 'new',     reply: false },
    { i: 'AM', p: 'ig' as const, status: 'network', reply: true },
    { i: 'TF', p: 'tt' as const, status: 'network', reply: true },
    { i: 'NB', p: 'yt' as const, status: 'network', reply: false },
  ];
  return (
    <div className="rounded-xl border border-foreground/10 bg-background/50 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] font-mono text-muted-foreground/60">OUTREACH · 13 KONTAKTIERT</div>
        <div className="flex gap-2 text-[10px]">
          <span className="flex items-center gap-1 text-primary"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Neu</span>
          <span className="flex items-center gap-1 text-muted-foreground"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />Netzwerk</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {creators.map((c, i) => {
          const Icon = c.p === 'ig' ? Instagram : c.p === 'tt' ? Music2 : Youtube;
          const isNew = c.status === 'new';
          return (
            <div
              key={i}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-background/40 border border-foreground/10"
            >
              <div className={`w-7 h-7 rounded-full text-[10px] font-semibold flex items-center justify-center ${
                isNew ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-foreground/[0.06] text-foreground/80 border border-foreground/15'
              }`}>
                {c.i}
              </div>
              <Icon className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[11px] text-foreground/80 flex-1">@{c.i.toLowerCase()}</span>
              {c.reply ? (
                <span className="text-[9px] uppercase tracking-wider text-emerald-300">Reply</span>
              ) : (
                <span className="text-[9px] uppercase tracking-wider text-amber-300">Pending</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SheetVisual() {
  return (
    <div className="rounded-xl border border-foreground/10 bg-background/50 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-foreground/10 bg-foreground/[0.03]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-foreground/15" />
          <span className="w-2 h-2 rounded-full bg-foreground/15" />
          <span className="w-2 h-2 rounded-full bg-foreground/15" />
          <span className="text-[10px] font-mono text-muted-foreground ml-2">campaign_plan.sheet</span>
        </div>
        <span className="text-[10px] text-muted-foreground">Sheet · Miro</span>
      </div>
      <div className="font-mono text-[11px]">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 px-3 py-2 text-muted-foreground/70 border-b border-foreground/5 bg-foreground/[0.02]">
          <span>Creator</span><span>Preis</span><span>Live</span><span>Status</span>
        </div>
        {[
          ['@lara.m',   '€850',   '12.05', 'OK',  'emerald'],
          ['@jonas.k',  '€620',   '14.05', 'OK',  'emerald'],
          ['@rs.studio','€1.4k',  '18.05', '...', 'amber'],
          ['@alex.tt',  '€480',   '20.05', 'OK',  'emerald'],
        ].map(([c, p, d, s, color], i) => (
          <div key={i} className="grid grid-cols-[1fr_auto_auto_auto] gap-3 px-3 py-1.5 border-b border-foreground/5 last:border-0">
            <span className="text-foreground/90 truncate">{c}</span>
            <span className="text-muted-foreground">{p}</span>
            <span className="text-muted-foreground">{d}</span>
            <span className={color === 'emerald' ? 'text-emerald-400' : 'text-amber-300'}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApprovalVisual() {
  return (
    <div className="rounded-xl border border-foreground/10 bg-background/50 p-4 space-y-2.5">
      <div className="flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-semibold flex items-center justify-center flex-shrink-0">VA</div>
        <div className="flex-1 rounded-xl rounded-tl-sm bg-foreground/[0.04] px-3 py-2">
          <div className="text-[10px] text-muted-foreground/60 mb-0.5">Vaymo · 14:02</div>
          <div className="text-[12px] text-foreground/85">Briefing & Style-Referenzen rausgeschickt ✓</div>
        </div>
      </div>
      <div className="flex items-start gap-2.5 flex-row-reverse">
        <div className="w-7 h-7 rounded-full bg-foreground/10 border border-foreground/15 text-foreground/80 text-[10px] font-semibold flex items-center justify-center flex-shrink-0">LM</div>
        <div className="flex-1 rounded-xl rounded-tr-sm bg-primary/10 border border-primary/20 px-3 py-2">
          <div className="text-[10px] text-muted-foreground/60 mb-0.5">@lara.m · 14:38</div>
          <div className="text-[12px] text-foreground/85">Erster Draft ist hochgeladen 🎬</div>
        </div>
      </div>
      <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/5 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-[12px] text-foreground/85">Draft v2 — Freigabe Brand</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-amber-300 flex items-center gap-1">
          <Clock className="w-3 h-3" /> Pending
        </span>
      </div>
    </div>
  );
}

function LiveVisual() {
  return (
    <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/[0.08] to-background/40 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span className="text-sm font-medium text-emerald-300">Content ist live</span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">JUST NOW</span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'Instagram', v: '3 Posts' },
          { label: 'TikTok',    v: '2 Reels' },
          { label: 'YouTube',   v: '1 Video' },
        ].map((p) => (
          <div key={p.label} className="rounded-lg border border-foreground/10 bg-background/40 px-3 py-2">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.label}</div>
            <div className="text-sm font-medium text-foreground/90 mt-0.5">{p.v}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Reichweite läuft an…</span>
        <span className="text-primary font-medium">+ 124k Views</span>
      </div>
    </div>
  );
}
