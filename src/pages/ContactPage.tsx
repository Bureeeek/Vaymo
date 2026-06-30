import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Send, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  company: z.string().min(2, 'Company is required').max(100),
  email: z.string().email('Invalid email address').max(255),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});
type ContactFormData = z.infer<typeof contactSchema>;

function ContactContent() {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', company: '', email: '', message: '' },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', { body: data });
      if (error) throw error;
      setIsSubmitted(true);
      toast.success(t('contact.success'));
    } catch (error) {
      if (import.meta.env.DEV) console.error('Error sending email:', error);
      toast.error(language === 'de' ? 'Fehler beim Senden. Bitte versuche es erneut.' : 'Error sending. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="section-container flex items-center justify-between h-16 md:h-20">
          <a href="/" className="font-anton text-xl tracking-widest text-foreground">VAYMO</a>

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-full border border-border bg-muted/50 p-1">
              <button
                onClick={() => setLanguage('de')}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${language === 'de' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                DE
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${language === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === 'de' ? 'Zurück' : 'Back'}
            </button>
          </div>
        </div>
      </header>

      {/* ── Split layout ── */}
      <div className="min-h-screen grid md:grid-cols-2">

        {/* Left — dark / info */}
        <motion.div
          className="flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 pt-32 pb-16 md:py-0"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-5">
            {language === 'de' ? 'Kontakt' : 'Contact'}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-sm mb-10 leading-relaxed">
            {t('contact.subtitle')}
          </p>
          <a
            href="mailto:info@vaymo-agency.com"
            className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
          >
            info@vaymo-agency.com
          </a>
        </motion.div>

        {/* Right — form */}
        <div className="flex items-center justify-center bg-background border-t md:border-t-0 md:border-l border-border px-6 sm:px-10 md:px-12 lg:px-16 py-16 md:py-32">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* White card */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/20">

              {isSubmitted ? (
                <motion.div
                  className="text-center py-10"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                >
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('contact.success')}</h3>
                  <button
                    onClick={() => navigate('/')}
                    className="mt-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors flex items-center gap-2 mx-auto"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {language === 'de' ? 'Zurück zur Startseite' : 'Back to home'}
                  </button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 text-sm">{t('contact.name')}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t('contact.namePlaceholder')}
                                className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-400"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 text-sm">{t('contact.company')}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t('contact.companyPlaceholder')}
                                className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-400"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 text-sm">{t('contact.email')}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t('contact.emailPlaceholder')}
                              className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 text-sm">{t('contact.message')}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t('contact.messagePlaceholder')}
                              className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 min-h-[130px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 rounded-full bg-gray-900 text-white text-sm font-medium
                                 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2
                                 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {language === 'de' ? 'Wird gesendet…' : 'Sending…'}
                        </>
                      ) : (
                        <>
                          {t('contact.submit')}
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                  </form>
                </Form>
              )}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <LanguageProvider>
      <ContactContent />
    </LanguageProvider>
  );
}
