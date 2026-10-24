import React, { useEffect, useState } from 'react';
import { I18nDictionary } from '../i18n/translations.ts';

interface RadarScannerProps {
  t: I18nDictionary;
  onScanComplete: () => void;
}

const ZODIAC_GLYPHS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
const SAMPLE_COORDINATES = [
  '43.7696° N, 11.2558° E',
  '35.0116° N, 135.7681° E',
  '64.1466° N, 21.9426° W',
  '34.6037° S, 58.3816° W',
  '37.3891° N, 5.9845° W',
  '48.8566° N, 2.3522° E',
  '55.6761° N, 12.5683° E',
  '20.9144° N, 100.7452° W',
];

export const RadarScanner: React.FC<RadarScannerProps> = ({ t, onScanComplete }) => {
  const [glyphIndex, setGlyphIndex] = useState(0);
  const [coordIndex, setCoordIndex] = useState(0);
  const [stepPhase, setStepPhase] = useState<number>(0);

  useEffect(() => {
    // 2-second scan duration divided into swift updates
    const glyphInterval = setInterval(() => {
      setGlyphIndex((prev) => (prev + 1) % ZODIAC_GLYPHS.length);
      setCoordIndex((prev) => (prev + 1) % SAMPLE_COORDINATES.length);
    }, 120);

    const phase1Timer = setTimeout(() => setStepPhase(1), 600);
    const phase2Timer = setTimeout(() => setStepPhase(2), 1300);
    const completeTimer = setTimeout(() => {
      onScanComplete();
    }, 2200);

    return () => {
      clearInterval(glyphInterval);
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
      clearTimeout(completeTimer);
    };
  }, [onScanComplete]);

  const currentMessage =
    stepPhase === 0
      ? t.radarSweeping
      : stepPhase === 1
      ? t.radarZodiacCycle
      : t.radarLocking;

  return (
    <div
      className="relative flex flex-col items-center justify-center p-6 text-center"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Radar Graphic Container */}
      <div className="relative flex h-64 w-64 items-center justify-center sm:h-76 sm:w-76">
        {/* Outer Glowing Rings */}
        <div className="absolute inset-0 rounded-full border border-[#D49A9A40] dark:border-[#AA5E7A30]"></div>
        <div className="absolute inset-6 rounded-full border border-[#D49A9A50] dark:border-[#AA5E7A40]"></div>
        <div className="absolute inset-16 rounded-full border border-[#AA5E7A40] dark:border-[#AA5E7A50]"></div>
        <div className="absolute inset-28 rounded-full border border-[#7C0E4460] dark:border-[#D49A9A60]"></div>

        {/* Pulse Waves */}
        <div className="absolute inset-4 animate-ping rounded-full bg-[#D49A9A]/15 duration-1000"></div>

        {/* Radar Sweeping Beam */}
        <div className="animate-radar-sweep absolute inset-0 flex items-center justify-center">
          <div className="h-1/2 w-1/2 origin-bottom-right bg-gradient-to-tl from-[#7C0E44]/40 via-[#AA5E7A]/20 to-transparent dark:from-[#AA5E7A]/50"></div>
        </div>

        {/* Crosshair Axes */}
        <div className="absolute inset-x-0 h-px bg-[#D49A9A30] dark:bg-[#AA5E7A20]"></div>
        <div className="absolute inset-y-0 w-px bg-[#D49A9A30] dark:bg-[#AA5E7A20]"></div>

        {/* Center Celestial Core */}
        <div className="relative z-10 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-[#7C0E44] text-[#F2DACE] shadow-lg ring-4 ring-[#D49A9A]/50 dark:bg-[#AA5E7A] dark:ring-[#F2DACE]/30">
          <span className="text-2xl transition-all duration-100 select-none">
            {ZODIAC_GLYPHS[glyphIndex]}
          </span>
          <span className="text-[10px] font-semibold tracking-wider opacity-80">SCAN</span>
        </div>
      </div>

      {/* Real-time Cycling Telemetry */}
      <div className="mt-6 flex flex-col items-center gap-1.5 font-mono text-xs">
        <div className="flex items-center gap-2 rounded-full border border-[#D49A9A50] bg-[#F2DACE]/40 px-3.5 py-1 text-[#7C0E44] dark:border-[#AA5E7A50] dark:bg-[#220815] dark:text-[#F2DACE]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#7C0E44] dark:bg-[#D49A9A]"></span>
          <span>{SAMPLE_COORDINATES[coordIndex]}</span>
        </div>
        <p className="mt-2 text-sm font-medium text-[#7C0E44] dark:text-[#F2DACE]">
          {currentMessage}
        </p>
      </div>
    </div>
  );
};
