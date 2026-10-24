import { COUNTRIES_DATA } from '../data/countries.ts';
import { CountryData, ElementType, GenderPreference, SoulmateResult, UserInput, ZodiacSign } from '../types/index.ts';

export const ZODIAC_ELEMENTS: Record<ZodiacSign, ElementType> = {
  Aries: 'Fire',
  Leo: 'Fire',
  Sagittarius: 'Fire',
  Taurus: 'Earth',
  Virgo: 'Earth',
  Capricorn: 'Earth',
  Gemini: 'Air',
  Libra: 'Air',
  Aquarius: 'Air',
  Cancer: 'Water',
  Scorpio: 'Water',
  Pisces: 'Water',
};

export const ZODIAC_SYMBOLS: Record<ZodiacSign, string> = {
  Aries: '♈',
  Taurus: '♉',
  Gemini: '♊',
  Cancer: '♋',
  Leo: '♌',
  Virgo: '♍',
  Libra: '♎',
  Scorpio: '♏',
  Sagittarius: '♐',
  Capricorn: '♑',
  Aquarius: '♒',
  Pisces: '♓',
};

/**
 * Calculates Western Zodiac Sign from Date of Birth
 */
export function getZodiacSign(dobString: string): ZodiacSign {
  const parts = dobString.split('-');
  if (parts.length < 3) return 'Aries';

  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

/**
 * Calculates Pythagorean Life Path Number (1 to 9)
 */
export function getLifePathNumber(dobString: string): number {
  const digits = dobString.replace(/\D/g, '');
  if (!digits) return 1;

  let sum = digits.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);

  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }

  // If master number, normalize to core 1-9 for mapping
  if (sum === 11) return 2;
  if (sum === 22) return 4;
  if (sum === 33) return 6;

  return sum > 9 ? ((sum - 1) % 9) + 1 : sum;
}

/**
 * FNV-1a 32-bit deterministic cryptographic hash
 */
export function hashString(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Determines elemental compatibility score between user element and country element
 */
function getElementalAffinity(userEl: ElementType, countryEl: ElementType): number {
  if (userEl === countryEl) return 10;
  // Fire + Air harmonize well
  if ((userEl === 'Fire' && countryEl === 'Air') || (userEl === 'Air' && countryEl === 'Fire')) return 8;
  // Earth + Water harmonize well
  if ((userEl === 'Earth' && countryEl === 'Water') || (userEl === 'Water' && countryEl === 'Earth')) return 8;
  return 5;
}

/**
 * Deterministic Algorithm mapping User Inputs to their Soulmate Country & Resonance
 */
export function calculateSoulmate(input: UserInput): SoulmateResult {
  const normalizedName = input.fullName.trim().toLowerCase();
  const normalizedDob = input.dateOfBirth.trim();
  const normalizedPref: GenderPreference = input.genderPreference || 'all';

  const userZodiac = getZodiacSign(normalizedDob);
  const userElement = ZODIAC_ELEMENTS[userZodiac];
  const lifePathNumber = getLifePathNumber(normalizedDob);

  // Hash input deterministically
  const seedString = `${normalizedName}::${normalizedDob}::${normalizedPref}::cosmic_soulradar_v1`;
  const primaryHash = hashString(seedString);
  const secondaryHash = hashString(`${seedString}::resonance`);

  // Score countries based on Astrological and Numerological alignment
  const scoredCountries = COUNTRIES_DATA.map((country, idx) => {
    let score = 0;

    // 1. Elemental compatibility
    score += getElementalAffinity(userElement, country.element);

    // 2. Direct zodiac sign affinity
    if (country.compatibleSigns.includes(userZodiac)) {
      score += 15;
    }

    // 3. Life path numerological alignment (pseudo-random harmonic distribution)
    const countryNumericVibe = (country.name.charCodeAt(0) + country.city.charCodeAt(0)) % 9 + 1;
    if (countryNumericVibe === lifePathNumber) {
      score += 8;
    } else if (Math.abs(countryNumericVibe - lifePathNumber) <= 2) {
      score += 4;
    }

    // 4. Incorporate deterministic hash shift so different names yield distinct resonant destinations
    const hashShift = (primaryHash + idx * 7919) % 37;
    score += hashShift;

    return { country, score };
  });

  // Sort descending by score
  scoredCountries.sort((a, b) => b.score - a.score);

  // Choose the top resonant match deterministically
  const selectedIndex = (primaryHash + secondaryHash) % Math.min(3, scoredCountries.length);
  const matchedCountry = scoredCountries[selectedIndex].country;

  // Cosmic Resonance % guaranteed between 94.1% and 99.8%
  const resonanceBase = 94.0;
  const resonanceDelta = ((secondaryHash % 580) / 100); // 0.00 to 5.80
  const cosmicResonance = parseFloat((resonanceBase + resonanceDelta).toFixed(1));

  // Determine best matched signs for the result card
  const filteredSigns = matchedCountry.compatibleSigns.filter((s) => s !== userZodiac);
  const bestMatchSigns: ZodiacSign[] =
    filteredSigns.length >= 2
      ? filteredSigns.slice(0, 2)
      : matchedCountry.compatibleSigns.slice(0, 2);

  // Generate personalized 2-sentence astrological explanation
  const astrologicalReason = generateAstrologicalExplanation(
    input.fullName.trim(),
    userZodiac,
    userElement,
    lifePathNumber,
    matchedCountry
  );

  return {
    country: matchedCountry,
    userZodiac,
    userElement,
    lifePathNumber,
    cosmicResonance,
    bestMatchSigns,
    astrologicalReason,
    scanTimestamp: Date.now(),
    userName: input.fullName.trim() || 'Cosmic Traveler',
  };
}

/**
 * Generates an evocative, personalized 2-sentence astrological explanation
 */
function generateAstrologicalExplanation(
  name: string,
  zodiac: ZodiacSign,
  element: ElementType,
  lifePath: number,
  country: CountryData
): string {
  const firstName = name.split(' ')[0] || 'Your';

  const elementDescriptions: Record<ElementType, string> = {
    Fire: 'fiery radiance and spirited passion',
    Earth: 'grounded devotion and timeless loyalty',
    Air: 'intellectual charm and graceful curiosity',
    Water: 'deep intuitive empathy and emotional depth',
  };

  const sentenceOne = `As a ${zodiac} with Life Path ${lifePath}, your ${elementDescriptions[element]} resonates profoundly with the ${country.element.toLowerCase()} aura of ${country.city}, ${country.name}.`;
  const sentenceTwo = `${country.symbolicMeaning} In this magnetic sanctuary, your destined bond with a ${country.compatibleSigns[0]} or ${country.compatibleSigns[1]} is cosmically amplified.`;

  return `${sentenceOne} ${sentenceTwo}`;
}
