import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Mail, Sparkles, RotateCcw, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}

function TypewriterText({ text, delay = 0, speed = 25, onComplete }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, onComplete]);

  return (
    <span className="whitespace-pre-wrap">
      {displayedText}
      {started && displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle"
        />
      )}
    </span>
  );
}

export function VaymoStandard() {
  const { t, language } = useLanguage();
  const [isActivated, setIsActivated] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showRejection, setShowRejection] = useState(false);
  const [showVaymoMail, setShowVaymoMail] = useState(false);

  const handleActivate = () => {
    setShowRejection(true);
    setTimeout(() => {
      setIsActivated(true);
      setTimeout(() => {
        setShowVaymoMail(true);
        setTimeout(() => setShowTypewriter(true), 300);
      }, 100);
    }, 5400); // Extended by 2 more seconds (was 3400)
  };

  const handleReset = () => {
    setIsActivated(false);
    setShowTypewriter(false);
    setShowRejection(false);
    setShowVaymoMail(false);
  };

  const chaosMailContent = language === 'de' 
    ? "Hey, wir wollen was mit euch machen. Schickt mal ein Video zu unserem neuen Produkt. Sollte so 60 Sek sein. Musik egal, macht einfach was cooles. Schickt es uns dann zu wenn ihr fertig seid."
    : "Hey, we want to do something with you. Just send us a video about our new product. Should be like 60 sec. Music whatever, just make something cool. Send it to us when you're done.";

  const chaosTags = language === 'de' 
    ? ['Unklare Ziele', 'Fehlende Details', 'Keine Ressourcen']
    : ['Unclear Goals', 'Missing Details', 'No Resources'];

  const successTags = language === 'de'
    ? ['Klare Kommunikation', 'Transparente Prozesse', 'Planbare Ergebnisse']
    : ['Clear Communication', 'Transparent Processes', 'Predictable Results'];

  const vaymoEmailContent = language === 'de'
    ? `Hey [Name],

ich habe alle Infos von der Brand erhalten und für dich zusammengefasst. Damit wir einen reibungslosen Ablauf haben, hier die wichtigsten Eckpunkte:

Das Produkt wurde bereits an dich verschickt und sollte in Kürze bei dir eintreffen. Schick uns bitte bis zum [Datum] eine Roh-Datei des Videos zu, damit wir gemeinsam drüber schauen können. Die finale Deadline für den Start ist der [Datum].

Alle Details zu den Key-Messages findest du übersichtlich im Anhang. Lass mich wissen, wenn du Rückfragen hast!

Beste Grüße,
Dein Vaymo-Team`
    : `Hey [Name],

I've received all the information from the brand and summarized it for you. To ensure a smooth process, here are the key points:

The product has already been shipped to you and should arrive shortly. Please send us a raw file of the video by [Date] so we can review it together. The final deadline for launch is [Date].

All details on key messages can be found in the attachment. Let me know if you have any questions!

Best regards,
Your Vaymo Team`;

  const chaosTitle = language === 'de' ? 'Typische Anfrage' : 'Typical Request';
  const activateButton = language === 'de' ? 'Vaymo-Struktur aktivieren' : 'Activate Vaymo Structure';
  const resetButton = language === 'de' ? 'Vorherige Email ansehen' : 'View Previous Email';
  const ctaText = language === 'de' ? 'Wir hassen Chaos. Du auch? Dann schreib uns:' : 'We hate chaos. You too? Then write to us:';
  const ctaButton = language === 'de' ? 'Jetzt kontaktieren' : 'Contact Now';
  const subjectLine = language === 'de' ? 'Briefing & Update' : 'Briefing & Update';
  const rejectionText = language === 'de' ? 'Keine Basis für Erfolg.' : 'No foundation for success.';
  const rejectionSubtext = language === 'de' ? 'Unklare Briefings verschwenden Zeit & Geld.' : 'Unclear briefings waste time & money.';

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('standard.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('standard.subtitle')}
          </p>
        </motion.div>

        {/* Interactive Container - Centered Single Column */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!isActivated ? (
              <motion.div
                key="chaos-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Chaos Mail Card */}
                <motion.div
                  className="relative"
                  animate={showRejection ? { 
                    x: [0, -8, 8, -6, 6, -4, 4, -2, 2, 0, 0, 0],
                    scale: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1.02, 0.95, 0],
                    opacity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.8, 0],
                    rotateZ: [0, -1, 1, -1, 1, -0.5, 0.5, 0, 0, 0, 0, 0],
                  } : { scale: 1, opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 5.2, // Extended duration (+2 sec)
                    ease: [0.4, 0, 0.2, 1],
                    times: [0, 0.04, 0.08, 0.12, 0.16, 0.2, 0.24, 0.28, 0.32, 0.75, 0.9, 1]
                  }}
                >
                  <div className="bg-card border border-border rounded-xl p-6 shadow-lg relative overflow-hidden">
                    {/* Chaos indicator */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/10 rounded-bl-full" />
                    
                    {/* Email Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{chaosTitle}</p>
                        <p className="text-xs text-muted-foreground">agency@website.com</p>
                      </div>
                    </div>

                    {/* Email Content */}
                    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                      <p className="text-foreground/70 text-sm leading-relaxed italic">
                        "{chaosMailContent}"
                      </p>
                    </div>

                    {/* Chaos tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {chaosTags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-destructive/10 text-destructive text-xs rounded-full">
                          ❌ {tag}
                        </span>
                      ))}
                    </div>

                    {/* Rejection Overlay - Big X with meaningful message */}
                    <AnimatePresence>
                      {showRejection && (
                        <motion.div 
                          className="absolute inset-0 flex items-center justify-center z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.5 }}
                        >
                          {/* Red overlay */}
                          <motion.div 
                            className="absolute inset-0 bg-destructive/20 backdrop-blur-[2px]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                          />
                          
                          {/* Strike-through lines */}
                          <motion.div
                            className="absolute inset-0 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            <motion.div
                              className="absolute h-1 bg-destructive/80 left-0 top-1/2 origin-left"
                              initial={{ scaleX: 0, rotate: -5 }}
                              animate={{ scaleX: 1.5 }}
                              transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
                              style={{ width: '100%' }}
                            />
                            <motion.div
                              className="absolute h-1 bg-destructive/60 left-0 top-[40%] origin-left"
                              initial={{ scaleX: 0, rotate: 3 }}
                              animate={{ scaleX: 1.5 }}
                              transition={{ duration: 0.5, delay: 0.9, ease: 'easeOut' }}
                              style={{ width: '100%' }}
                            />
                            <motion.div
                              className="absolute h-1 bg-destructive/60 left-0 top-[60%] origin-left"
                              initial={{ scaleX: 0, rotate: -2 }}
                              animate={{ scaleX: 1.5 }}
                              transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
                              style={{ width: '100%' }}
                            />
                          </motion.div>

                          {/* Big X Icon with meaningful message */}
                          <motion.div
                            className="relative z-20 flex flex-col items-center text-center px-4"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              type: 'spring', 
                              stiffness: 200, 
                              damping: 15,
                              delay: 0.8 
                            }}
                          >
                            <motion.div 
                              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-destructive/90 flex items-center justify-center shadow-2xl"
                              animate={{ 
                                boxShadow: ['0 0 0 0 hsl(var(--destructive) / 0)', '0 0 40px 10px hsl(var(--destructive) / 0.4)', '0 0 20px 5px hsl(var(--destructive) / 0.2)']
                              }}
                              transition={{ duration: 0.8, delay: 1.0 }}
                            >
                              <X className="w-10 h-10 md:w-14 md:h-14 text-white" strokeWidth={3} />
                            </motion.div>
                            
                            {/* Main rejection text - appears earlier */}
                            <motion.p
                              className="mt-4 text-xl md:text-2xl font-black text-destructive tracking-wide"
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.3 }}
                            >
                              {rejectionText}
                            </motion.p>
                            
                            {/* Subtext for more context - appears earlier */}
                            <motion.p
                              className="mt-2 text-sm md:text-base text-destructive/80 font-medium max-w-xs"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.6 }}
                            >
                              {rejectionSubtext}
                            </motion.p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Activate Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 text-center"
                >
                  <Button
                    onClick={handleActivate}
                    size="lg"
                    className="group relative overflow-hidden gap-2"
                    disabled={showRejection}
                  >
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.span>
                    {activateButton}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="nexly-container"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.34, 1.56, 0.64, 1], // Spring-like easing for scale-up
                }}
                className="relative"
              >
                {showVaymoMail && (
                  <motion.div 
                    className="bg-card rounded-xl shadow-2xl relative overflow-hidden"
                    initial={{ boxShadow: '0 0 0 0 hsl(var(--primary) / 0)' }}
                    animate={{ 
                      boxShadow: [
                        '0 0 60px 10px hsl(var(--primary) / 0.4)',
                        '0 25px 50px -12px hsl(var(--primary) / 0.15)'
                      ]
                    }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{
                      border: '1px solid hsl(var(--primary) / 0.3)',
                    }}
                  >
                    {/* Glowing border animation */}
                    <motion.div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 2, delay: 0.5 }}
                      style={{
                        border: '2px solid hsl(var(--primary) / 0.6)',
                        boxShadow: '0 0 20px 5px hsl(var(--primary) / 0.3) inset',
                      }}
                    />
                    
                    {/* Success indicator corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full" />
                    
                    {/* Email Header */}
                    <div className="p-6 border-b border-border/30 bg-muted/20">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-3"
                      >
                        {/* From field */}
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground font-medium w-12">{language === 'de' ? 'Von:' : 'From:'}</span>
                          <span className="text-primary font-medium">contact@nexly-agency.com</span>
                        </div>
                        
                        {/* Subject field */}
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground font-medium w-12">{language === 'de' ? 'Betreff:' : 'Subject:'}</span>
                          <span className="text-foreground font-semibold">{subjectLine}</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Email Body - Flowing Text */}
                    <div className="p-6 md:p-8">
                      <div className="text-foreground/90 text-sm md:text-base leading-relaxed">
                      {showTypewriter ? (
                          <TypewriterText 
                            text={vaymoEmailContent} 
                            delay={50} 
                            speed={5}
                          />
                        ) : null}
                      </div>

                      {/* Success tags */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 4 }}
                        className="mt-8 pt-6 border-t border-border/30 flex flex-wrap gap-2"
                      >
                        {successTags.map((tag, i) => (
                          <span key={i} className="px-3 py-1.5 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">
                            ✓ {tag}
                          </span>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Reset Button - Shows immediately */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 text-center"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {resetButton}
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16 md:mt-20"
        >
          <p className="text-foreground text-lg md:text-xl font-medium mb-6">
            {ctaText}
          </p>
          <Button asChild size="lg" className="group">
            <Link to="/contact">
              <Mail className="w-4 h-4 mr-2" />
              {ctaButton}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
