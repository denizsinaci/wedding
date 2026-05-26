'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  User,
  Phone,
  Users,
  MessageCircle,
  Send,
  CheckCircle2,
  Heart,
  HeartCrack,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { submitRsvp, RsvpError, type RsvpAttendance } from '@/lib/rsvp';
import { Toast, type ToastTone } from './Toast';
import { ScrollReveal } from './ScrollReveal';
import { SectionDivider } from './SectionDivider';
import { FloralOrnament } from './FloralOrnament';

type Status = 'idle' | 'submitting' | 'success';

export function Rsvp() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState<RsvpAttendance>('attending');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ open: boolean; msg: string; tone: ToastTone }>({
    open: false,
    msg: '',
    tone: 'success',
  });

  const showToast = (msg: string, tone: ToastTone = 'success') => {
    setToast({ open: true, msg, tone });
    setTimeout(() => setToast((t) => ({ ...t, open: false })), 4200);
  };

  const fireConfetti = () => {
    const colors = ['#D8A7A0', '#B98A86', '#B08FA0', '#7A5969', '#A8B89A', '#B08D55'];
    const burst = (origin: { x: number; y: number }) =>
      confetti({
        particleCount: 70,
        spread: 75,
        startVelocity: 40,
        ticks: 220,
        scalar: 0.9,
        gravity: 0.9,
        origin,
        colors,
      });
    burst({ x: 0.2, y: 0.7 });
    burst({ x: 0.8, y: 0.7 });
    setTimeout(() => burst({ x: 0.5, y: 0.55 }), 180);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError('Lütfen adınızı yazın.');
      return;
    }
    if (attendance === 'attending' && guests < 1) {
      setError('Katılım sayısı en az 1 olmalı.');
      return;
    }
    setStatus('submitting');
    try {
      await submitRsvp({
        name: name.trim(),
        phone: phone.trim() || undefined,
        attendance,
        guests: attendance === 'attending' ? guests : 0,
        message: message.trim() || undefined,
        submittedAt: new Date().toISOString(),
      });
      setStatus('success');
      if (attendance === 'attending') fireConfetti();
      showToast(
        attendance === 'attending'
          ? 'Yanıtınız alındı — sizi görmek için sabırsızlanıyoruz!'
          : 'Yanıtınız alındı. Sizi özleyeceğiz.',
        'success',
      );
    } catch (err) {
      setStatus('idle');
      const msg =
        err instanceof RsvpError
          ? err.message
          : 'Bir aksilik oldu, lütfen tekrar deneyin.';
      setError(msg);
      showToast('Yanıt gönderilemedi.', 'error');
    }
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setAttendance('attending');
    setGuests(1);
    setMessage('');
    setError(null);
    setStatus('idle');
  };

  return (
    <section id="rsvp" className="relative py-24 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <ScrollReveal>
          <SectionDivider label="Katılım" />
          <h2 className="mt-6 font-display italic text-center text-ink text-4xl sm:text-5xl md:text-6xl">
            Yanınızda Olmamızı İster misiniz?
          </h2>
          <p className="mt-4 text-center text-plum/80 max-w-xl mx-auto">
            Hazırlıkları daha iyi yapabilmemiz için katılım durumunuzu paylaşmanız bizi
            çok mutlu eder.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-12">
          <div className="relative">
            <FloralOrnament
              variant="leaf"
              className="absolute -top-10 left-4 w-32 opacity-50 hidden sm:block"
            />
            <FloralOrnament
              variant="leaf"
              flip
              className="absolute -top-10 right-4 w-32 opacity-50 hidden sm:block"
            />

            <div className="relative rounded-[28px] glass-strong p-6 sm:p-10 shadow-soft overflow-hidden">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5 }}
                    className="py-6 sm:py-10 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                      className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-sage/15"
                    >
                      <CheckCircle2 className="h-8 w-8 text-sage-deep" strokeWidth={1.6} />
                    </motion.div>
                    <h3 className="font-display italic text-3xl sm:text-4xl text-ink">
                      Yanıtınız Alındı
                    </h3>
                    <p className="mt-3 text-plum/80 max-w-md mx-auto">
                      {attendance === 'attending'
                        ? 'Birlikte güzel anlar biriktireceğiz. Sizi görmek için sabırsızlanıyoruz.'
                        : 'Bizimle paylaştığınız için teşekkür ederiz. Sevgilerimizle.'}
                    </p>
                    <button
                      onClick={resetForm}
                      className="mt-7 inline-flex items-center gap-2 rounded-full border hairline px-5 py-2.5 text-sm text-plum hover:bg-cream-100/70 transition-colors"
                    >
                      <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                      Bir yanıt daha gönder
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    onSubmit={onSubmit}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field
                        id="name"
                        label="Ad Soyad"
                        icon={<User className="h-4 w-4" strokeWidth={1.6} />}
                        required
                      >
                        <input
                          id="name"
                          name="name"
                          required
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Adınız ve soyadınız"
                          className="w-full bg-transparent outline-none placeholder:text-ink/35 text-ink"
                        />
                      </Field>

                      <Field
                        id="phone"
                        label="Telefon"
                        optional
                        icon={<Phone className="h-4 w-4" strokeWidth={1.6} />}
                      >
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(opsiyonel)"
                          className="w-full bg-transparent outline-none placeholder:text-ink/35 text-ink"
                        />
                      </Field>
                    </div>

                    <div>
                      <label className="block text-[11px] tracking-[0.3em] uppercase text-ink/55 mb-2">
                        Katılım Durumu
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <AttendanceOption
                          active={attendance === 'attending'}
                          onClick={() => setAttendance('attending')}
                          icon={<Heart className="h-4 w-4" strokeWidth={1.6} />}
                          label="Geliyorum"
                          tone="rose"
                        />
                        <AttendanceOption
                          active={attendance === 'not_attending'}
                          onClick={() => setAttendance('not_attending')}
                          icon={<HeartCrack className="h-4 w-4" strokeWidth={1.6} />}
                          label="Katılamıyorum"
                          tone="plum"
                        />
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {attendance === 'attending' && (
                        <motion.div
                          key="guests"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35 }}
                          className="overflow-hidden"
                        >
                          <Field
                            id="guests"
                            label="Kaç kişi geleceksiniz?"
                            icon={<Users className="h-4 w-4" strokeWidth={1.6} />}
                          >
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                                className="h-8 w-8 rounded-full border hairline text-plum hover:bg-cream-100/70 transition"
                                aria-label="Azalt"
                              >
                                −
                              </button>
                              <span className="font-display text-2xl text-ink tabular-nums min-w-[1.5ch] text-center">
                                {guests}
                              </span>
                              <button
                                type="button"
                                onClick={() => setGuests((g) => Math.min(10, g + 1))}
                                className="h-8 w-8 rounded-full border hairline text-plum hover:bg-cream-100/70 transition"
                                aria-label="Arttır"
                              >
                                +
                              </button>
                              <span className="ml-1 text-xs text-ink/55">kişi</span>
                            </div>
                          </Field>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Field
                      id="message"
                      label="Mesajınız"
                      optional
                      icon={<MessageCircle className="h-4 w-4" strokeWidth={1.6} />}
                    >
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Bizimle paylaşmak istediğiniz bir not…"
                        className="w-full bg-transparent outline-none placeholder:text-ink/35 text-ink resize-none"
                      />
                    </Field>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-rose-deep"
                      >
                        {error}
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-plum text-cream-50 px-7 py-3.5 text-sm tracking-wide hover:bg-plum-deep disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-soft"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.8} />
                          Gönderiliyor…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.8} />
                          Yanıtı Gönder
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <Toast
        open={toast.open}
        message={toast.msg}
        tone={toast.tone}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
      />
    </section>
  );
}

function Field({
  id,
  label,
  icon,
  optional,
  required,
  children,
}: {
  id: string;
  label: string;
  icon?: React.ReactNode;
  optional?: boolean;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="flex items-center justify-between text-[11px] tracking-[0.3em] uppercase text-ink/55 mb-2">
        <span className="flex items-center gap-2">
          {icon && <span className="text-plum/70">{icon}</span>}
          {label}
          {required && <span className="text-rose-deep">*</span>}
        </span>
        {optional && (
          <span className="text-[10px] normal-case tracking-normal text-ink/40">
            opsiyonel
          </span>
        )}
      </span>
      <div className="rounded-2xl border hairline bg-cream-50/70 px-4 py-3 focus-within:border-plum/40 focus-within:bg-cream-50 transition-colors">
        {children}
      </div>
    </label>
  );
}

function AttendanceOption({
  active,
  onClick,
  icon,
  label,
  tone,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  tone: 'rose' | 'plum';
}) {
  const activeBg = tone === 'rose' ? 'bg-rose-dust/20 border-rose-deep/40' : 'bg-mauve/15 border-plum/40';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm transition-all ${
        active
          ? `${activeBg} text-plum shadow-soft`
          : 'border-[rgba(122,89,105,0.15)] bg-cream-50/50 text-ink/65 hover:text-plum hover:bg-cream-100/60'
      }`}
    >
      <span className={active ? 'text-plum' : 'text-plum/60'}>{icon}</span>
      {label}
    </button>
  );
}
