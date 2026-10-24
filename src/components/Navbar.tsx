import React, { useState } from 'react';
import { Globe, Moon, Sun, Download, Heart, Compass } from 'lucide-react';
import { LanguageCode } from '../types/index.ts';
import { I18nDictionary } from '../i18n/translations.ts';

interface NavbarProps {
  t: I18nDictionary;
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenInstall: () => void;
  canInstall: boolean;
}

const LANGUAGES: { code: LanguageCode; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '简体中文', flag: '🇨🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export const Navbar: React.FC<NavbarProps> = ({
  t,
  currentLang,
  onLanguageChange,
  isDark,
  onToggleTheme,
  onOpenInstall,
  canInstall,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#D49A9A40] bg-[#FFFDFB]/90 backdrop-blur-md transition-colors duration-300 dark:border-[#AA5E7A30] dark:bg-[#14040C]/90">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <a
          href="#radar"
          className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C0E44]"
          aria-label="SoulRadar Home"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C0E44] text-[#F2DACE] shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Compass className="h-5 w-5 animate-spin-slow transition-transform group-hover:rotate-45" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D49A9A] opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#AA5E7A]"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight text-[#7C0E44] dark:text-[#F2DACE]">
              SoulRadar
            </span>
            <span className="hidden text-[10px] tracking-widest text-[#AA5E7A] uppercase sm:block">
              Cosmic Love Finder
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main Navigation">
          <a
            href="#radar"
            className="text-sm font-medium text-[#7C0E44] transition-colors hover:text-[#AA5E7A] dark:text-[#F2DACE] dark:hover:text-[#D49A9A]"
          >
            {t.navRadar}
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-[#7C0E44]/80 transition-colors hover:text-[#7C0E44] dark:text-[#F2DACE]/80 dark:hover:text-[#F2DACE]"
          >
            {t.navHowItWorks}
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-[#7C0E44]/80 transition-colors hover:text-[#7C0E44] dark:text-[#F2DACE]/80 dark:hover:text-[#F2DACE]"
          >
            {t.navFaq}
          </a>
        </nav>

        {/* Actions (Desktop has text buttons; Mobile is STRICTLY ICON-ONLY with 44x44px touch targets) */}
        <div className="flex items-center gap-2">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D49A9A50] bg-[#F2DACE]/30 text-[#7C0E44] transition hover:bg-[#F2DACE]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C0E44] md:h-10 md:w-auto md:px-3 md:gap-1.5 dark:border-[#AA5E7A40] dark:bg-[#220815] dark:text-[#F2DACE] dark:hover:bg-[#220815]/90"
              aria-label={t.navLanguage}
              aria-expanded={langDropdownOpen}
              aria-haspopup="listbox"
            >
              <Globe className="h-5 w-5" />
              <span className="hidden text-xs font-semibold md:inline uppercase">
                {currentLang}
              </span>
            </button>

            {langDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div
                  className="absolute right-0 z-50 mt-2 w-48 rounded-2xl border border-[#D49A9A40] bg-[#FFFDFB] p-1.5 shadow-xl transition-all dark:border-[#AA5E7A30] dark:bg-[#220815]"
                  role="listbox"
                  aria-label="Language selection"
                >
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      role="option"
                      aria-selected={currentLang === item.code}
                      onClick={() => {
                        onLanguageChange(item.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition ${
                        currentLang === item.code
                          ? 'bg-[#7C0E44] font-semibold text-[#FFFDFB] dark:bg-[#AA5E7A]'
                          : 'text-[#7C0E44] hover:bg-[#F2DACE]/50 dark:text-[#F2DACE] dark:hover:bg-[#7C0E44]/30'
                      }`}
                    >
                      <span className="text-base">{item.flag}</span>
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D49A9A50] bg-[#F2DACE]/30 text-[#7C0E44] transition hover:bg-[#F2DACE]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C0E44] dark:border-[#AA5E7A40] dark:bg-[#220815] dark:text-[#F2DACE] dark:hover:bg-[#220815]/90"
            aria-label={t.navTheme}
          >
            {isDark ? <Sun className="h-5 w-5 text-[#F2DACE]" /> : <Moon className="h-5 w-5 text-[#7C0E44]" />}
          </button>

          {/* Add to Home Screen (PWA Install) Button */}
          <button
            type="button"
            onClick={onOpenInstall}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D49A9A50] bg-[#F2DACE]/30 text-[#7C0E44] transition hover:bg-[#F2DACE]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C0E44] md:h-10 md:w-auto md:px-3.5 md:gap-1.5 dark:border-[#AA5E7A40] dark:bg-[#220815] dark:text-[#F2DACE] dark:hover:bg-[#220815]/90"
            aria-label={t.navInstall}
            title={t.navInstall}
          >
            <Download className="h-5 w-5" />
            <span className="hidden text-xs font-semibold md:inline">
              {t.navInstall}
            </span>
          </button>

          {/* Support Developer (Ko-fi) */}
          <a
            href="https://ko-fi.com/kishara"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7C0E44] text-[#F2DACE] shadow-sm transition hover:bg-[#5E0B34] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C0E44] md:h-10 md:w-auto md:px-3.5 md:gap-1.5 dark:bg-[#AA5E7A] dark:hover:bg-[#8D4460]"
            aria-label={t.navSupport}
            title="Support the Developer on Ko-fi"
          >
            <Heart className="h-5 w-5 fill-current" />
            <span className="hidden text-xs font-semibold md:inline">
              {t.navSupport}
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};
