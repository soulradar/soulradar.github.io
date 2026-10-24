/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  Calendar,
  User,
  Heart,
  ArrowRight,
  Shield,
  Eye,
} from 'lucide-react';
import { Navbar } from './components/Navbar.tsx';
import { Breadcrumbs } from './components/Breadcrumbs.tsx';
import { RadarScanner } from './components/RadarScanner.tsx';
import { ResultCard } from './components/ResultCard.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { Footer } from './components/Footer.tsx';
import { InstallModal } from './components/InstallModal.tsx';
import { TRANSLATIONS } from './i18n/translations.ts';
import { GenderPreference, LanguageCode, SoulmateResult, UserInput } from './types/index.ts';
import { calculateSoulmate } from './utils/astrology.ts';

export default function App() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('soulradar_lang') as LanguageCode;
      if (saved && TRANSLATIONS[saved]) return saved;
    } catch (e) {}
    return 'en';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('soulradar_theme');
      if (savedTheme === 'dark') return true;
      if (savedTheme === 'light') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });
  const [installModalOpen, setInstallModalOpen] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Form State
  const [fullName, setFullName] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('1998-07-16');
  const [genderPreference, setGenderPreference] = useState<GenderPreference>('all');
  const [validationError, setValidationError] = useState<string>('');

  // Scanning & Result State
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [soulmateResult, setSoulmateResult] = useState<SoulmateResult | null>(null);

  // Active translation dictionary
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('soulradar_theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
      }

      // Check saved language
      const savedLang = localStorage.getItem('soulradar_lang') as LanguageCode;
      if (savedLang && TRANSLATIONS[savedLang]) {
        setCurrentLang(savedLang);
      }
    } catch (e) {}
  }, []);

  // Listen for PWA beforeinstallprompt
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleToggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('soulradar_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('soulradar_theme', 'light');
    }
  };

  const handleLanguageChange = (lang: LanguageCode) => {
    setCurrentLang(lang);
    localStorage.setItem('soulradar_lang', lang);
  };

  const handleTriggerInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
    setInstallModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !dateOfBirth) {
      setValidationError(t.formValidationErr);
      return;
    }
    setValidationError('');
    setIsScanning(true);
    setSoulmateResult(null);

    // Smooth scroll down to radar focus
    const radarElem = document.getElementById('radar');
    if (radarElem) {
      radarElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScanFinished = () => {
    const input: UserInput = {
      fullName: fullName.trim(),
      dateOfBirth,
      genderPreference,
    };
    const result = calculateSoulmate(input);
    setSoulmateResult(result);
    setIsScanning(false);
  };

  const handleReset = () => {
    setSoulmateResult(null);
    setIsScanning(false);
  };

  return (
    <div
      style={{
        backgroundColor: isDark ? '#14040C' : '#FFFDFB',
        color: isDark ? '#F2DACE' : '#7C0E44',
      }}
      className={`flex min-h-screen flex-col transition-colors duration-300 ${isDark ? 'dark' : ''}`}
    >
      {/* Navigation */}
      <Navbar
        t={t}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenInstall={() => setInstallModalOpen(true)}
        canInstall={!!deferredPrompt}
      />

      {/* Semantic Breadcrumbs */}
      <Breadcrumbs />

      <main className="flex-1">
        {/* Hero Section & Radar Card Container */}
        <section id="radar" className="relative overflow-hidden pt-6 pb-16 sm:pt-10 sm:pb-24">
          {/* Subtle Ambient Background Gradients */}
          <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-full -translate-x-1/2 rounded-full bg-gradient-to-b from-[#F2DACE]/60 via-[#D49A9A]/20 to-transparent blur-3xl dark:from-[#7C0E44]/25 dark:via-[#220815]/20" />

          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            {/* Title & Badge */}
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D49A9A60] bg-[#F2DACE]/50 px-4 py-1.5 text-xs font-semibold text-[#7C0E44] shadow-sm dark:border-[#AA5E7A50] dark:bg-[#220815] dark:text-[#F2DACE]">
                <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#7C0E44] dark:text-[#F2DACE]" />
                <span>{t.heroBadge}</span>
              </div>

              <h1 className="mt-4 font-serif text-4xl font-extrabold tracking-tight sm:text-6xl">
                {t.heroTitle1}{' '}
                <span className="relative inline-block text-[#7C0E44] underline decoration-[#D49A9A] decoration-wavy decoration-2 underline-offset-8 dark:text-[#F2DACE]">
                  {t.heroTitleHighlight}
                </span>{' '}
                {t.heroTitle2}
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#AA5E7A] sm:text-base dark:text-[#D49A9A]">
                {t.heroSubtitle}
              </p>
            </div>

            {/* Central Interactive Area: Form -> Radar Scanner -> Result Reveal */}
            <div className="mt-10">
              {isScanning ? (
                <div className="rounded-3xl border border-[#D49A9A50] bg-[#FFFDFB] p-8 shadow-xl dark:border-[#AA5E7A40] dark:bg-[#1A0611]">
                  <RadarScanner t={t} onScanComplete={handleScanFinished} />
                </div>
              ) : soulmateResult ? (
                <ResultCard result={soulmateResult} t={t} onReset={handleReset} />
              ) : (
                <div className="relative overflow-hidden rounded-3xl border border-[#D49A9A50] bg-[#FFFDFB] p-6 shadow-xl sm:p-10 dark:border-[#AA5E7A40] dark:bg-[#1A0611]">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* User Full Name / Username */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#7C0E44] uppercase dark:text-[#F2DACE]"
                      >
                        <User className="h-4 w-4 text-[#AA5E7A]" />
                        <span>{t.formNameLabel}</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t.formNamePlaceholder}
                        className="mt-2 w-full rounded-2xl border border-[#D49A9A50] bg-[#F2DACE]/20 px-4 py-3.5 text-sm font-medium text-[#7C0E44] placeholder-[#AA5E7A]/60 transition focus:border-[#7C0E44] focus:bg-[#FFFDFB] focus:outline-none focus:ring-2 focus:ring-[#7C0E44]/20 dark:border-[#AA5E7A40] dark:bg-[#220815] dark:text-[#F2DACE] dark:placeholder-[#AA5E7A] dark:focus:border-[#AA5E7A]"
                      />
                    </div>

                    {/* Date of Birth & Gender Preference Grid */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {/* Date of Birth */}
                      <div>
                        <label
                          htmlFor="dateOfBirth"
                          className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#7C0E44] uppercase dark:text-[#F2DACE]"
                        >
                          <Calendar className="h-4 w-4 text-[#AA5E7A]" />
                          <span>{t.formDobLabel}</span>
                        </label>
                        <input
                          id="dateOfBirth"
                          type="date"
                          required
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="mt-2 w-full rounded-2xl border border-[#D49A9A50] bg-[#F2DACE]/20 px-4 py-3.5 text-sm font-medium text-[#7C0E44] transition focus:border-[#7C0E44] focus:bg-[#FFFDFB] focus:outline-none focus:ring-2 focus:ring-[#7C0E44]/20 dark:border-[#AA5E7A40] dark:bg-[#220815] dark:text-[#F2DACE] dark:focus:border-[#AA5E7A]"
                        />
                      </div>

                      {/* Romantic Preference */}
                      <div>
                        <label
                          htmlFor="genderPreference"
                          className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#7C0E44] uppercase dark:text-[#F2DACE]"
                        >
                          <Heart className="h-4 w-4 text-[#AA5E7A]" />
                          <span>{t.formPrefLabel}</span>
                        </label>
                        <select
                          id="genderPreference"
                          value={genderPreference}
                          onChange={(e) => setGenderPreference(e.target.value as GenderPreference)}
                          className="mt-2 w-full rounded-2xl border border-[#D49A9A50] bg-[#F2DACE]/20 px-4 py-3.5 text-sm font-medium text-[#7C0E44] transition focus:border-[#7C0E44] focus:bg-[#FFFDFB] focus:outline-none focus:ring-2 focus:ring-[#7C0E44]/20 dark:border-[#AA5E7A40] dark:bg-[#220815] dark:text-[#F2DACE] dark:focus:border-[#AA5E7A]"
                        >
                          <option value="all">{t.formPrefAll}</option>
                          <option value="women">{t.formPrefWomen}</option>
                          <option value="men">{t.formPrefMen}</option>
                          <option value="nonbinary">{t.formPrefNonBinary}</option>
                        </select>
                      </div>
                    </div>

                    {/* Validation Error Message */}
                    {validationError && (
                      <p className="text-xs font-medium text-rose-600 dark:text-rose-400">
                        {validationError}
                      </p>
                    )}

                    {/* Submit CTA Button */}
                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#7C0E44] py-4 px-6 font-semibold text-[#FFFDFB] shadow-lg transition duration-200 hover:bg-[#5E0B34] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C0E44] dark:bg-[#AA5E7A] dark:hover:bg-[#8D4460]"
                    >
                      <Compass className="h-5 w-5 transition-transform group-hover:rotate-45" />
                      <span>{t.formSubmitBtn}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    {/* Privacy Guarantee Note */}
                    <div className="flex items-center justify-center gap-1.5 text-center text-xs text-[#AA5E7A] dark:text-[#D49A9A]">
                      <Shield className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Zero servers, zero tracking. 100% deterministic browser calculation.</span>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks t={t} />

        {/* SEO FAQ Section */}
        <FaqSection t={t} />
      </main>

      {/* Footer */}
      <Footer t={t} />

      {/* PWA Install Modal */}
      <InstallModal
        isOpen={installModalOpen}
        onClose={() => setInstallModalOpen(false)}
        t={t}
        deferredPrompt={deferredPrompt}
        onTriggerInstall={handleTriggerInstall}
      />
    </div>
  );
}
