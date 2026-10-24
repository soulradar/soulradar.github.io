import React from 'react';
import { Heart, Compass, ShieldCheck } from 'lucide-react';
import { I18nDictionary } from '../i18n/translations.ts';

interface FooterProps {
  t: I18nDictionary;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="border-t border-[#D49A9A30] bg-[#FFFDFB] py-10 transition-colors duration-300 dark:border-[#AA5E7A20] dark:bg-[#14040C]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
        {/* Brand & Privacy */}
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-[#7C0E44] dark:text-[#F2DACE]" />
            <span className="font-serif text-base font-bold text-[#7C0E44] dark:text-[#F2DACE]">
              SoulRadar
            </span>
            <span className="rounded-full bg-[#F2DACE]/60 px-2 py-0.5 text-[10px] font-semibold text-[#7C0E44] dark:bg-[#220815] dark:text-[#F2DACE]">
              v1.0.0
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#AA5E7A] dark:text-[#D49A9A]">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>{t.footerDisclaimer}</span>
          </div>
        </div>

        {/* Support Developer & Copyright */}
        <div className="flex flex-col items-center sm:items-end gap-1.5 text-xs text-[#7C0E44]/75 dark:text-[#F2DACE]/75">
          <a
            href="https://ko-fi.com/kishara"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full border border-[#D49A9A40] bg-[#F2DACE]/30 px-3 py-1 font-medium text-[#7C0E44] transition hover:bg-[#F2DACE]/70 dark:border-[#AA5E7A30] dark:bg-[#220815] dark:text-[#F2DACE]"
          >
            <span>Crafted with</span>
            <Heart className="h-3 w-3 fill-current text-[#7C0E44] group-hover:scale-125 transition-transform dark:text-[#AA5E7A]" />
            <span>Support on Ko-fi</span>
          </a>
          <p className="mt-1">{t.footerRights}</p>
        </div>
      </div>
    </footer>
  );
};
