import React from 'react';
import { Compass, Sparkles, Hash, Globe } from 'lucide-react';
import { I18nDictionary } from '../i18n/translations.ts';

interface HowItWorksProps {
  t: I18nDictionary;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ t }) => {
  return (
    <section id="how-it-works" className="py-14 sm:py-20" aria-labelledby="how-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D49A9A50] bg-[#F2DACE]/40 px-3.5 py-1 text-xs font-semibold text-[#7C0E44] dark:border-[#AA5E7A40] dark:bg-[#220815] dark:text-[#F2DACE]">
            <Compass className="h-3.5 w-3.5" />
            <span>Astrolocality Science</span>
          </div>
          <h2 id="how-heading" className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-[#7C0E44] sm:text-4xl dark:text-[#F2DACE]">
            {t.howTitle}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-[#AA5E7A] dark:text-[#D49A9A]">
            {t.howSubtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Step 1 */}
          <div className="relative rounded-3xl border border-[#D49A9A40] bg-[#FFFDFB] p-6 shadow-sm transition hover:shadow-md dark:border-[#AA5E7A30] dark:bg-[#1A0611]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C0E44] text-[#F2DACE] dark:bg-[#AA5E7A]">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-serif text-lg font-bold text-[#7C0E44] dark:text-[#F2DACE]">
              {t.step1Title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#7C0E44]/80 dark:text-[#F2DACE]/80">
              {t.step1Desc}
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative rounded-3xl border border-[#D49A9A40] bg-[#FFFDFB] p-6 shadow-sm transition hover:shadow-md dark:border-[#AA5E7A30] dark:bg-[#1A0611]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C0E44] text-[#F2DACE] dark:bg-[#AA5E7A]">
              <Hash className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-serif text-lg font-bold text-[#7C0E44] dark:text-[#F2DACE]">
              {t.step2Title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#7C0E44]/80 dark:text-[#F2DACE]/80">
              {t.step2Desc}
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative rounded-3xl border border-[#D49A9A40] bg-[#FFFDFB] p-6 shadow-sm transition hover:shadow-md dark:border-[#AA5E7A30] dark:bg-[#1A0611]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C0E44] text-[#F2DACE] dark:bg-[#AA5E7A]">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-serif text-lg font-bold text-[#7C0E44] dark:text-[#F2DACE]">
              {t.step3Title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#7C0E44]/80 dark:text-[#F2DACE]/80">
              {t.step3Desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
