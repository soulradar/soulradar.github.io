import React, { useState } from 'react';
import {
  Download,
  Share2,
  Sparkles,
  Heart,
  MapPin,
  RefreshCw,
  Check,
  Compass,
} from 'lucide-react';
import { SoulmateResult } from '../types/index.ts';
import { I18nDictionary } from '../i18n/translations.ts';
import { ZODIAC_SYMBOLS } from '../utils/astrology.ts';
import { downloadCardImage } from '../utils/canvasCard.ts';

interface ResultCardProps {
  result: SoulmateResult;
  t: I18nDictionary;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, t, onReset }) => {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const { country, userZodiac, userElement, lifePathNumber, cosmicResonance, bestMatchSigns, astrologicalReason, userName } = result;

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await downloadCardImage(result);
    } catch (err) {
      console.error('Failed to generate card:', err);
    } finally {
      setDownloading(false);
    }
  };

  const shareText = `My soulmate is in ${country.name} (${country.city}) with ${cosmicResonance}% cosmic resonance! 🌌 Find where your soulmate lives:`;
  const shareUrl = 'https://soulradar.github.io/';

  const handleShareX = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}&hashtags=WhereIsMySoulmate,FindMySoulmate,SoulRadar`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${shareText} ${shareUrl}`
    )}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `SoulRadar — My Soulmate Country is ${country.name}`,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const compatibilityString = t.resultCompatibilityText
    .replace('{sign1}', bestMatchSigns[0] || 'Soul Partner')
    .replace('{sign2}', bestMatchSigns[1] || 'Kindred Spirit');

  return (
    <article className="relative overflow-hidden rounded-3xl border border-[#D49A9A50] bg-[#FFFDFB] p-6 shadow-xl transition-all duration-300 sm:p-8 dark:border-[#AA5E7A40] dark:bg-[#1A0611]">
      {/* Decorative Top Aura */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#D49A9A]/20 blur-3xl dark:bg-[#7C0E44]/30" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#AA5E7A]/20 blur-3xl dark:bg-[#AA5E7A]/20" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D49A9A30] pb-5 dark:border-[#AA5E7A20]">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D49A9A60] bg-[#F2DACE]/50 px-3.5 py-1 text-xs font-semibold text-[#7C0E44] dark:border-[#AA5E7A50] dark:bg-[#220815] dark:text-[#F2DACE]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{t.resultBadge}</span>
        </div>
        <div className="text-xs text-[#AA5E7A] dark:text-[#D49A9A]">
          Astrolocality Code: <span className="font-mono font-semibold">{country.code}-{result.lifePathNumber}</span>
        </div>
      </div>

      {/* Main Country Reveal Banner */}
      <div className="mt-6 flex flex-col items-center text-center">
        {/* Large Flag & Radar Pin */}
        <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border-2 border-[#D49A9A] bg-[#F2DACE]/30 shadow-inner sm:h-32 sm:w-32 dark:border-[#AA5E7A] dark:bg-[#220815]">
          <span className="text-6xl sm:text-7xl select-none" role="img" aria-label={country.name}>
            {country.flag}
          </span>
          <div className="absolute -bottom-2.5 flex items-center gap-1 rounded-full bg-[#7C0E44] px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-[#FFFDFB] uppercase shadow dark:bg-[#AA5E7A]">
            <MapPin className="h-3 w-3" />
            <span>{country.code}</span>
          </div>
        </div>

        {/* Country Name */}
        <p className="mt-5 text-xs font-bold tracking-widest text-[#AA5E7A] uppercase dark:text-[#D49A9A]">
          {t.resultMatchedCountry}
        </p>
        <h2 className="mt-1 font-serif text-3xl font-extrabold tracking-tight text-[#7C0E44] sm:text-5xl dark:text-[#F2DACE]">
          {country.name}
        </h2>

        {/* Romantic City and Coordinates */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm text-[#7C0E44]/80 sm:text-base dark:text-[#F2DACE]/90">
          <span className="font-semibold">{t.resultCityHeading}:</span>
          <span className="rounded-md bg-[#F2DACE]/50 px-2 py-0.5 font-bold text-[#7C0E44] dark:bg-[#220815] dark:text-[#F2DACE]">
            {country.city}
          </span>
          <span className="text-xs font-mono opacity-70">
            ({country.coordinates.latStr}, {country.coordinates.lngStr})
          </span>
        </div>

        {/* Cosmic Resonance Metric Pill */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-[#D49A9A] bg-gradient-to-r from-[#F2DACE] via-[#FFFDFB] to-[#F2DACE] px-5 py-2.5 text-[#7C0E44] shadow-sm dark:border-[#AA5E7A] dark:from-[#220815] dark:via-[#2F0B1E] dark:to-[#220815] dark:text-[#F2DACE]">
          <Heart className="h-5 w-5 fill-[#7C0E44] text-[#7C0E44] dark:fill-[#D49A9A] dark:text-[#D49A9A]" />
          <span className="text-sm font-semibold">{t.resultResonance}:</span>
          <span className="font-serif text-xl font-black text-[#7C0E44] dark:text-[#F2DACE]">
            {cosmicResonance}%
          </span>
        </div>
      </div>

      {/* Grid of Celestial Readings */}
      <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        {/* User Zodiac & Element */}
        <div className="rounded-2xl border border-[#D49A9A30] bg-[#F2DACE]/25 p-4 dark:border-[#AA5E7A20] dark:bg-[#220815]/60">
          <p className="text-[11px] font-semibold tracking-wider text-[#AA5E7A] uppercase dark:text-[#D49A9A]">
            Your Solar Essence
          </p>
          <p className="mt-1 flex items-center gap-1.5 font-semibold text-[#7C0E44] dark:text-[#F2DACE]">
            <span className="text-lg">{ZODIAC_SYMBOLS[userZodiac]}</span>
            <span>{userZodiac} ({userElement})</span>
          </p>
        </div>

        {/* Life Path Numerology */}
        <div className="rounded-2xl border border-[#D49A9A30] bg-[#F2DACE]/25 p-4 dark:border-[#AA5E7A20] dark:bg-[#220815]/60">
          <p className="text-[11px] font-semibold tracking-wider text-[#AA5E7A] uppercase dark:text-[#D49A9A]">
            {t.resultLifePath}
          </p>
          <p className="mt-1 font-semibold text-[#7C0E44] dark:text-[#F2DACE]">
            Path Number {lifePathNumber}
          </p>
        </div>

        {/* Destination Vibe */}
        <div className="rounded-2xl border border-[#D49A9A30] bg-[#F2DACE]/25 p-4 dark:border-[#AA5E7A20] dark:bg-[#220815]/60">
          <p className="text-[11px] font-semibold tracking-wider text-[#AA5E7A] uppercase dark:text-[#D49A9A]">
            Country Element
          </p>
          <p className="mt-1 font-semibold text-[#7C0E44] dark:text-[#F2DACE]">
            {country.element} Energy
          </p>
        </div>
      </div>

      {/* Astrological & Compatibility Deep Dive */}
      <div className="mt-6 rounded-2xl border border-[#D49A9A40] bg-[#F2DACE]/20 p-5 dark:border-[#AA5E7A30] dark:bg-[#220815]/50">
        <h3 className="flex items-center gap-2 font-serif text-base font-bold text-[#7C0E44] dark:text-[#F2DACE]">
          <Compass className="h-4 w-4" />
          <span>{t.resultAstrologyHeading}</span>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#7C0E44]/90 dark:text-[#F2DACE]/90">
          {astrologicalReason}
        </p>

        {/* Soulmate Compatibility Match */}
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#D49A9A30] bg-[#FFFDFB] p-3 text-xs dark:border-[#AA5E7A20] dark:bg-[#14040C]">
          <Heart className="mt-0.5 h-4 w-4 shrink-0 text-[#AA5E7A]" />
          <span className="font-medium text-[#7C0E44] dark:text-[#F2DACE]">
            {compatibilityString}
          </span>
        </div>
      </div>

      {/* Actions: Download Card & Share Buttons */}
      <div className="mt-8 flex flex-col gap-3">
        {/* Primary Download Canvas PNG Card */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#7C0E44] py-3.5 px-6 font-semibold text-[#FFFDFB] shadow-md transition hover:bg-[#5E0B34] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C0E44] disabled:opacity-75 dark:bg-[#AA5E7A] dark:hover:bg-[#8D4460]"
        >
          {downloading ? (
            <RefreshCw className="h-5 w-5 animate-spin" />
          ) : (
            <Download className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
          )}
          <span>{downloading ? 'Rendering Card...' : t.resultDownloadCard}</span>
        </button>

        {/* Secondary Sharing Grid */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <button
            type="button"
            onClick={handleShareX}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#D49A9A50] bg-[#F2DACE]/30 py-2.5 px-4 text-xs font-semibold text-[#7C0E44] transition hover:bg-[#F2DACE]/70 dark:border-[#AA5E7A40] dark:bg-[#220815] dark:text-[#F2DACE] dark:hover:bg-[#220815]/90"
            aria-label="Share result on X"
          >
            <span className="font-bold">𝕏</span>
            <span>{t.resultShareX}</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#D49A9A50] bg-[#F2DACE]/30 py-2.5 px-4 text-xs font-semibold text-[#7C0E44] transition hover:bg-[#F2DACE]/70 dark:border-[#AA5E7A40] dark:bg-[#220815] dark:text-[#F2DACE] dark:hover:bg-[#220815]/90"
            aria-label="Share result via WhatsApp"
          >
            <span>💬</span>
            <span>{t.resultShareWhatsApp}</span>
          </button>

          <button
            type="button"
            onClick={handleNativeShare}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#D49A9A50] bg-[#F2DACE]/30 py-2.5 px-4 text-xs font-semibold text-[#7C0E44] transition hover:bg-[#F2DACE]/70 dark:border-[#AA5E7A40] dark:bg-[#220815] dark:text-[#F2DACE] dark:hover:bg-[#220815]/90"
            aria-label="Share result link"
          >
            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
            <span>{copied ? t.resultCopied : t.resultShareNative}</span>
          </button>
        </div>

        {/* Recalculate Button */}
        <div className="mt-2 text-center">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#AA5E7A] transition hover:text-[#7C0E44] dark:text-[#D49A9A] dark:hover:text-[#F2DACE]"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>{t.resultRecalculate}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
