import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { I18nDictionary } from '../i18n/translations.ts';

interface FaqSectionProps {
  t: I18nDictionary;
}

interface FaqItem {
  q: string;
  a: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ t }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: 'How does SoulRadar help me find my soulmate country?',
      a: 'SoulRadar combines your birth date with Western Zodiac astrolocality and Pythagorean Life Path numerology. By evaluating your elemental polarity (Fire, Earth, Air, Water) and personal vibrational frequency, it deterministically calculates which of 60+ global destinations holds the strongest cosmic resonance with your destined soul partner.'
    },
    {
      q: 'Where is my soulmate from according to astrology and astrolocality?',
      a: 'In celestial astrolocality, planetary lines and zodiac vibrations correspond to specific global territories. SoulRadar maps your Sun sign and ruling planets to geographic locations whose energy amplifies romantic harmony, romantic serendipity, and mutual spiritual understanding.'
    },
    {
      q: 'Is my soulmate calculation 100% private and deterministic?',
      a: 'Absolutely. SoulRadar runs entirely client-side inside your web browser. Zero personal information, names, or birth dates are transmitted to external servers or third parties. The algorithm is completely deterministic: entering the same credentials will always yield the exact same soulmate country.'
    },
    {
      q: 'How does the HTML5 Canvas Soulmate Card generator work?',
      a: 'When you tap "Download Aesthetic Card", SoulRadar uses your device’s native HTML5 Canvas API to render a high-resolution 1200x675 image featuring your cosmic resonance score, zodiac pairings, destination coordinates, and authentic romantic typography. It is generated instantly on your device without server rendering.'
    },
    {
      q: 'How can I install SoulRadar as an offline PWA app?',
      a: 'SoulRadar is a fully compliant Progressive Web App (PWA). On Chrome or Android, click the "Install App" button in the navigation bar. On iOS Safari, tap the Share icon and select "Add to Home Screen". You can run the entire radar scanner without an active internet connection.'
    }
  ];

  return (
    <section id="faq" className="border-t border-[#D49A9A30] py-14 sm:py-20 dark:border-[#AA5E7A20]" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D49A9A50] bg-[#F2DACE]/40 px-3.5 py-1 text-xs font-semibold text-[#7C0E44] dark:border-[#AA5E7A40] dark:bg-[#220815] dark:text-[#F2DACE]">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Cosmic Knowledge Base</span>
          </div>
          <h2 id="faq-heading" className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-[#7C0E44] sm:text-4xl dark:text-[#F2DACE]">
            {t.faqTitle}
          </h2>
          <p className="mt-2 text-sm text-[#AA5E7A] dark:text-[#D49A9A]">
            {t.faqSubtitle}
          </p>
        </div>

        <div className="mt-10 space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-[#D49A9A40] bg-[#FFFDFB] shadow-sm transition dark:border-[#AA5E7A30] dark:bg-[#1A0611]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-serif text-base font-bold text-[#7C0E44] transition hover:bg-[#F2DACE]/30 dark:text-[#F2DACE] dark:hover:bg-[#220815]"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#AA5E7A] transition-transform duration-200 dark:text-[#D49A9A] ${
                      isOpen ? 'rotate-180 text-[#7C0E44] dark:text-[#F2DACE]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-[#D49A9A20] px-5 pb-5 pt-3 text-sm leading-relaxed text-[#7C0E44]/85 dark:border-[#AA5E7A20] dark:text-[#F2DACE]/85">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
