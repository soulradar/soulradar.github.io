export type ElementType = 'Fire' | 'Earth' | 'Air' | 'Water';

export type ZodiacSign =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

export type GenderPreference = 'all' | 'men' | 'women' | 'nonbinary';

export interface CountryData {
  id: string;
  name: string;
  code: string;
  flag: string;
  city: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
    latStr: string;
    lngStr: string;
  };
  element: ElementType;
  rulingPlanets: string[];
  compatibleSigns: ZodiacSign[];
  romanticVibe: string;
  symbolicMeaning: string;
}

export interface UserInput {
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD
  genderPreference: GenderPreference;
}

export interface SoulmateResult {
  country: CountryData;
  userZodiac: ZodiacSign;
  userElement: ElementType;
  lifePathNumber: number;
  cosmicResonance: number; // e.g. 97.4
  bestMatchSigns: ZodiacSign[];
  astrologicalReason: string;
  scanTimestamp: number;
  userName: string;
}

export type LanguageCode = 'en' | 'es' | 'pt' | 'de' | 'fr' | 'ja' | 'zh' | 'ru';
