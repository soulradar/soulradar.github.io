import React from 'react';
import { X, Download, Share, PlusSquare, Smartphone, CheckCircle } from 'lucide-react';
import { I18nDictionary } from '../i18n/translations.ts';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: I18nDictionary;
  deferredPrompt: any;
  onTriggerInstall: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({
  isOpen,
  onClose,
  t,
  deferredPrompt,
  onTriggerInstall,
}) => {
  if (!isOpen) return null;

  const isIOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as any).MSStream;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#D49A9A50] bg-[#FFFDFB] p-6 shadow-2xl transition-all sm:p-7 dark:border-[#AA5E7A40] dark:bg-[#1A0611]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-[#AA5E7A] hover:bg-[#F2DACE]/50 dark:hover:bg-[#220815]"
          aria-label={t.pwaClose}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C0E44] text-[#F2DACE] dark:bg-[#AA5E7A]">
            <Smartphone className="h-6 w-6" />
          </div>
          <div>
            <h3 id="modal-title" className="font-serif text-lg font-bold text-[#7C0E44] dark:text-[#F2DACE]">
              {t.pwaModalTitle}
            </h3>
            <p className="text-xs text-[#AA5E7A] dark:text-[#D49A9A]">
              PWA 100% Offline Compatible
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm text-[#7C0E44]/80 dark:text-[#F2DACE]/80">
          {t.pwaModalDesc}
        </p>

        {deferredPrompt ? (
          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={onTriggerInstall}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#7C0E44] py-3.5 px-4 font-semibold text-[#FFFDFB] shadow-md transition hover:bg-[#5E0B34] dark:bg-[#AA5E7A] dark:hover:bg-[#8D4460]"
            >
              <Download className="h-5 w-5" />
              <span>Install SoulRadar Directly</span>
            </button>
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#AA5E7A]">
              <CheckCircle className="h-3.5 w-3.5 text-green-600" />
              <span>Instant launcher icon, zero app store sign-in</span>
            </div>
          </div>
        ) : isIOS ? (
          <div className="mt-6 space-y-3 rounded-2xl border border-[#D49A9A30] bg-[#F2DACE]/30 p-4 text-xs dark:border-[#AA5E7A20] dark:bg-[#220815]">
            <p className="font-semibold text-[#7C0E44] dark:text-[#F2DACE]">
              How to install on iOS Safari:
            </p>
            <div className="flex items-center gap-2 text-[#7C0E44]/90 dark:text-[#F2DACE]/90">
              <Share className="h-4 w-4 shrink-0 text-[#AA5E7A]" />
              <span>{t.pwaIosStep1}</span>
            </div>
            <div className="flex items-center gap-2 text-[#7C0E44]/90 dark:text-[#F2DACE]/90">
              <PlusSquare className="h-4 w-4 shrink-0 text-[#AA5E7A]" />
              <span>{t.pwaIosStep2}</span>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-[#D49A9A30] bg-[#F2DACE]/30 p-4 text-center text-xs text-[#7C0E44] dark:border-[#AA5E7A20] dark:bg-[#220815] dark:text-[#F2DACE]">
            <p className="font-semibold">App Ready to Install</p>
            <p className="mt-1 opacity-80">
              Click the install icon in your browser's address bar or add this page to bookmarks to run offline.
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-[#AA5E7A] transition hover:text-[#7C0E44] dark:text-[#D49A9A] dark:hover:text-[#F2DACE]"
          >
            {t.pwaClose}
          </button>
        </div>
      </div>
    </div>
  );
};
