import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

type Testimonial = {
  quote: { de: string; en: string };
  name: string;
  handle: string;
  role: string;
  initials: string;
  link?: string;
  photo?: string;
};

const brandTestimonials: Testimonial[] = [
  {
    quote: {
      de: 'Die Zusammenarbeit mit Vaymo war von Anfang an unkompliziert und effizient. Klare Kommunikation, schnelle Umsetzung — und die Creator passten wirklich zu unserer Marke.',
      en: 'Working with Vaymo was straightforward and efficient from the start. Clear communication, fast execution — and the creators truly fit our brand.',
    },
    name: 'Felix',
    handle: 'AG1',
    role: 'Partner Relationships Manager',
    initials: 'F',
    photo: '/testimonials/felix-ag1.jpg',
  },
  {
    quote: {
      de: 'Vaymo hat wirklich verstanden, worum es uns geht. Die Performance wurde transparent besprochen, die Creator-Auswahl war top. Wir werden definitiv öfter zusammenarbeiten.',
      en: 'Vaymo truly understood what we were going for. Performance was discussed transparently, creator selection was excellent. We will definitely work together again.',
    },
    name: 'Aylin',
    handle: 'Finanzguru',
    role: 'Performance Marketing Manager',
    initials: 'A',
    photo: '/testimonials/aylin-finanzguru.jpg',
  },
  {
    quote: {
      de: 'Beim Aufbau unserer YouTube-Präsenz war Vaymo eine echte Hilfe. Schnelle Kommunikation, bedarfsorientierte Creator-Auswahl — sowohl bekannte als auch Nischen-Creator.',
      en: 'When building our YouTube presence, Vaymo was a genuine help. Quick communication and a need-oriented approach to finding the right creators — both known and niche ones.',
    },
    name: 'Felix',
    handle: 'Holzkern',
    role: 'Influencer Marketing DACH',
    initials: 'F',
    photo: '/testimonials/felix-holzkern.jpg',
  },
];

const creatorTestimonials: Testimonial[] = [
  {
    quote: {
      de: 'Ich arbeite wirklich gerne mit Max zusammen. Er ist sehr transparent und findet immer einen Weg, der für beide Seiten funktioniert. Ich schätze seine Arbeit und sein Team sehr.',
      en: 'I really enjoy working with Max. He is very transparent and always tries to find a way to make things work for both sides. I appreciate his work and his team.',
    },
    name: 'Insaf Slim',
    handle: '@Insafthevisitor',
    role: 'YouTube Creator',
    initials: 'IS',
    link: 'https://www.youtube.com/@Insafthevisitor',
    photo: '/testimonials/insaf.jpg',
  },
  {
    quote: {
      de: 'Der Austausch mit Max war von Anfang an produktiv und unkompliziert. Er bat mich nur, meine Analytics zu teilen — zwei Wochen später hatte er bereits einen Deal für eine 60-Sekunden-Integration besiegelt.',
      en: 'The exchange I had with Max was fruitful and compact since day one, he just asked me to share my analytics and two weeks after he came back and sealed a deal for a 60 sec integration.',
    },
    name: 'Philippe Nesser',
    handle: '@philippenesser',
    role: 'YouTube Creator',
    initials: 'PN',
    link: 'https://www.youtube.com/@philippenesser',
    photo: '/testimonials/philippe.jpg',
  },
];

// ── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ photo, initials }: { photo?: string; initials: string }) {
  const [err, setErr] = useState(false);

  if (photo && !err) {
    return (
      <img
        src={photo}
        alt={initials}
        onError={() => setErr(true)}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-muted-foreground flex-shrink-0">
      {initials}
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────
function TestimonialCard({ item, i, lang }: { item: Testimonial; i: number; lang: 'de' | 'en' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: i * 0.1 }}
      className="rounded-2xl border border-border bg-card p-6 lg:p-7 flex flex-col gap-5"
    >
      <p className="text-sm text-foreground/80 leading-relaxed flex-1">
        "{item.quote[lang]}"
      </p>
      <div className="flex items-center gap-3">
        <Avatar photo={item.photo} initials={item.initials} />
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors"
              >
                {item.name}
              </a>
            ) : (
              <span className="text-sm font-semibold text-foreground">{item.name}</span>
            )}
            <span className="text-xs text-muted-foreground/50 font-mono">{item.handle}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">{item.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────
export function Testimonials() {
  const { t, language } = useLanguage();
  const lang = language as 'de' | 'en';

  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="section-container space-y-20">

        {/* Brand Testimonials */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold mb-10"
          >
            {t('testimonials.brands.title')}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-5">
            {brandTestimonials.map((item, i) => (
              <TestimonialCard key={item.name + i} item={item} i={i} lang={lang} />
            ))}
          </div>
        </div>

        {/* Creator Testimonials */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold mb-10"
          >
            {t('testimonials.creators.title')}
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl">
            {creatorTestimonials.map((item, i) => (
              <TestimonialCard key={item.name + i} item={item} i={i} lang={lang} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
