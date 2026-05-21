'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function SuccessModal({ open, onClose, title = 'Submission complete', message = 'Your response has been recorded successfully.' }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/20 p-4"
        >
          <motion.div
            initial={{ y: 24, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 24, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-100 text-sky-700">
                <CheckCircle2 size={22} />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="text-sm leading-6 text-slate-600">{message}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
