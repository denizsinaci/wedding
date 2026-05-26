'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export type ToastTone = 'success' | 'error';

type Props = {
  open: boolean;
  message: string;
  tone?: ToastTone;
  onClose: () => void;
};

export function Toast({ open, message, tone = 'success', onClose }: Props) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex items-center gap-3 rounded-full glass-strong shadow-soft px-5 py-3"
            role="status"
            aria-live="polite"
          >
            {tone === 'success' ? (
              <CheckCircle2 className="h-5 w-5 text-sage-deep" strokeWidth={1.6} />
            ) : (
              <AlertCircle className="h-5 w-5 text-rose-deep" strokeWidth={1.6} />
            )}
            <span className="text-sm text-ink/85">{message}</span>
            <button
              onClick={onClose}
              className="ml-1 rounded-full p-1 text-ink/50 hover:text-ink/80 transition"
              aria-label="Bildirimi kapat"
            >
              <X className="h-4 w-4" strokeWidth={1.6} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
