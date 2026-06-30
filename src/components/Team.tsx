import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

type Member = {
  id: string;
  initials: string;
  photo: string;
};

const members: Member[] = [
  { id: 'max',     initials: 'MW', photo: '/team/Max.jpeg'        },
  { id: 'abubakr', initials: 'AA', photo: '/team/AbuBakr A..jpeg' },
  { id: 'ayoub',   initials: 'AY', photo: '/team/Ayoub.jpeg'      },
];

function MemberPhoto({ photo, initials }: { photo: string; initials: string }) {
  const [err, setErr] = useState(false);

  return (
    <div className="aspect-[4/5] bg-secondary overflow-hidden">
      {!err ? (
        <img
          src={photo}
          alt={initials}
          onError={() => setErr(true)}
          className="w-full h-full object-cover object-top"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-muted-foreground/30">
          {initials}
        </div>
      )}
    </div>
  );
}

export function Team() {
  const { t } = useLanguage();

  return (
    <section id="team" className="py-20 md:py-28 border-t border-border">
      <div className="section-container">

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold mb-10 md:mb-12"
        >
          {t('team.title')}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {members.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="rounded-2xl border border-border overflow-hidden group hover:border-border/80 transition-colors"
            >
              {/* Photo */}
              <MemberPhoto photo={m.photo} initials={m.initials} />

              {/* Text */}
              <div className="p-5 md:p-6 bg-card">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {t(`team.${m.id}.name`)}
                </h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                  {t(`team.${m.id}.role`)}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`team.${m.id}.bio`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
