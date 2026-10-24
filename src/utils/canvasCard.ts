import { SoulmateResult } from '../types/index.ts';
import { ZODIAC_SYMBOLS } from './astrology.ts';

/**
 * Generates an aesthetic high-resolution share card (1200x675) via HTML5 Canvas
 */
export function generateShareCard(result: SoulmateResult): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 675;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      resolve('');
      return;
    }

    // 1. Background Luxury Gradient (#14040C -> #2B071B -> #7C0E44)
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 675);
    bgGrad.addColorStop(0, '#14040C');
    bgGrad.addColorStop(0.5, '#220815');
    bgGrad.addColorStop(1, '#420722');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 675);

    // 2. Cosmic Constellation & Star Dust
    ctx.fillStyle = '#FFFFFF';
    const starCount = 95;
    // Deterministic star placement
    for (let i = 0; i < starCount; i++) {
      const sx = (i * 127) % 1200;
      const sy = (i * 73) % 675;
      const radius = (i % 3 === 0 ? 1.8 : 1.0);
      const alpha = 0.2 + ((i % 5) / 10);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // 3. Radar Aesthetic Ring Graphic (Right Side)
    const rcx = 920;
    const rcy = 337;
    ctx.save();
    for (let r = 70; r <= 280; r += 70) {
      ctx.beginPath();
      ctx.arc(rcx, rcy, r, 0, Math.PI * 2);
      ctx.strokeStyle = '#D49A9A28';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    // Crosshairs
    ctx.beginPath();
    ctx.moveTo(rcx - 300, rcy);
    ctx.lineTo(rcx + 300, rcy);
    ctx.moveTo(rcx, rcy - 300);
    ctx.lineTo(rcx, rcy + 300);
    ctx.strokeStyle = '#D49A9A18';
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Glowing Radar Ping & Coordinates
    const sweepGrad = ctx.createRadialGradient(rcx, rcy, 10, rcx, rcy, 220);
    sweepGrad.addColorStop(0, '#AA5E7A44');
    sweepGrad.addColorStop(0.8, '#7C0E4410');
    sweepGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = sweepGrad;
    ctx.beginPath();
    ctx.arc(rcx, rcy, 220, 0, Math.PI * 2);
    ctx.fill();

    // Destination Pin & Flag Circle
    ctx.beginPath();
    ctx.arc(rcx, rcy, 52, 0, Math.PI * 2);
    ctx.fillStyle = '#7C0E44';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#F2DACE';
    ctx.stroke();

    // Large Flag inside Radar
    ctx.font = '48px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(result.country.flag, rcx, rcy);
    ctx.restore();

    // 4. Subtle Outer Border / Frame
    ctx.strokeStyle = '#D49A9A40';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, 1140, 615);

    // Subtle Corner Accents
    const cornerSize = 18;
    ctx.strokeStyle = '#F2DACE';
    ctx.lineWidth = 3;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(30, 30 + cornerSize);
    ctx.lineTo(30, 30);
    ctx.lineTo(30 + cornerSize, 30);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(1170 - cornerSize, 30);
    ctx.lineTo(1170, 30);
    ctx.lineTo(1170, 30 + cornerSize);
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(30, 645 - cornerSize);
    ctx.lineTo(30, 645);
    ctx.lineTo(30 + cornerSize, 645);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(1170 - cornerSize, 645);
    ctx.lineTo(1170, 645);
    ctx.lineTo(1170, 645 - cornerSize);
    ctx.stroke();

    // 5. Typography & Branding
    // Top Brand Tag
    ctx.font = '600 20px "Cinzel", "Georgia", serif, sans-serif';
    ctx.fillStyle = '#D49A9A';
    ctx.textAlign = 'left';
    ctx.fillText('SOULRADAR • CELESTIAL COUNTRY FINDER', 70, 85);

    // User's Reading Subtitle
    ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#F2DACEAA';
    ctx.fillText(
      `Cosmic Reading for ${result.userName} • ${result.userZodiac} (${ZODIAC_SYMBOLS[result.userZodiac]}) • Life Path ${result.lifePathNumber}`,
      70,
      125
    );

    // Primary Question / Result Header
    ctx.font = '400 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#AA5E7A';
    ctx.fillText('MY SOULMATE COUNTRY IS:', 70, 175);

    // Destination Country Name (Huge & Luxurious)
    ctx.font = 'bold 64px "Cinzel", "Georgia", serif, sans-serif';
    ctx.fillStyle = '#FFFDFB';
    ctx.fillText(result.country.name, 70, 245);

    // Destination City & Region
    ctx.font = '600 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#F2DACE';
    ctx.fillText(`📍 ${result.country.city} • ${result.country.coordinates.latStr}, ${result.country.coordinates.lngStr}`, 70, 295);

    // Cosmic Resonance Badge
    const badgeX = 70;
    const badgeY = 330;
    const badgeW = 280;
    const badgeH = 46;
    ctx.fillStyle = '#7C0E44';
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 23);
    ctx.fill();
    ctx.strokeStyle = '#D49A9A';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#FFFDFB';
    ctx.textAlign = 'center';
    ctx.fillText(`✨ ${result.cosmicResonance}% COSMIC RESONANCE`, badgeX + badgeW / 2, badgeY + 28);

    // Zodiac Compatibility Match Badge
    const badge2X = 370;
    const badge2W = 300;
    ctx.fillStyle = '#220815';
    ctx.beginPath();
    ctx.roundRect(badge2X, badgeY, badge2W, badgeH, 23);
    ctx.fill();
    ctx.strokeStyle = '#AA5E7A';
    ctx.stroke();

    ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#F2DACE';
    ctx.fillText(
      `💞 Match: ${result.bestMatchSigns.join(' or ')}`,
      badge2X + badge2W / 2,
      badgeY + 28
    );

    // Astrological Vibe Quote (wrapped 2 lines)
    ctx.textAlign = 'left';
    ctx.font = 'italic 20px "Georgia", serif';
    ctx.fillStyle = '#F2DACECC';
    const quoteWords = `"${result.country.symbolicMeaning}"`;
    wrapText(ctx, quoteWords, 70, 420, 620, 30);

    // Footer Watermark & Live URL
    ctx.font = '500 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#AA5E7A';
    ctx.fillText('Find where your soulmate lives at:', 70, 595);

    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#F2DACE';
    ctx.fillText('soulradar.github.io', 335, 595);

    // Timestamp
    ctx.textAlign = 'right';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#AA5E7A88';
    const dateStr = new Date(result.scanTimestamp).toISOString().split('T')[0];
    ctx.fillText(`Radar Verified: ${dateStr}`, 1130, 595);

    resolve(canvas.toDataURL('image/png'));
  });
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, curY);
}

/**
 * Triggers browser download of generated PNG share card
 */
export async function downloadCardImage(result: SoulmateResult): Promise<void> {
  const dataUrl = await generateShareCard(result);
  if (!dataUrl) return;

  const sanitizedCountry = result.country.name.replace(/[^a-zA-Z0-9]/g, '-');
  const filename = `SoulRadar-${sanitizedCountry}-Soulmate.png`;

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
