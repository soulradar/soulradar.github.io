import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getZodiacSign,
  getLifePathNumber,
  hashString,
  calculateSoulmate,
  ZODIAC_ELEMENTS
} from './astrology.ts';

test('getZodiacSign calculates accurate Western zodiac signs across dates', () => {
  assert.equal(getZodiacSign('1995-03-21'), 'Aries');
  assert.equal(getZodiacSign('1990-04-25'), 'Taurus');
  assert.equal(getZodiacSign('1988-06-15'), 'Gemini');
  assert.equal(getZodiacSign('2000-07-04'), 'Cancer');
  assert.equal(getZodiacSign('1993-08-10'), 'Leo');
  assert.equal(getZodiacSign('1998-09-01'), 'Virgo');
  assert.equal(getZodiacSign('2001-10-12'), 'Libra');
  assert.equal(getZodiacSign('1985-11-11'), 'Scorpio');
  assert.equal(getZodiacSign('1992-12-05'), 'Sagittarius');
  assert.equal(getZodiacSign('1999-01-05'), 'Capricorn');
  assert.equal(getZodiacSign('1994-02-14'), 'Aquarius');
  assert.equal(getZodiacSign('1996-03-10'), 'Pisces');
});

test('getLifePathNumber calculates single digit numerology correctly', () => {
  // 1990-01-01: 1+9+9+0+0+1+0+1 = 21 -> 2+1 = 3
  assert.equal(getLifePathNumber('1990-01-01'), 3);
  // 1996-08-14: 1+9+9+6+0+8+1+4 = 38 -> 3+8 = 11 (Master 11 -> 2)
  assert.equal(getLifePathNumber('1996-08-14'), 2);
  // 2000-01-01: 2+0+0+0+0+1+0+1 = 4
  assert.equal(getLifePathNumber('2000-01-01'), 4);
});

test('hashString is consistent and non-zero for strings', () => {
  const hash1 = hashString('seraphina::1998-07-22');
  const hash2 = hashString('seraphina::1998-07-22');
  assert.equal(hash1, hash2);
  assert.notEqual(hash1, 0);

  const hash3 = hashString('julian::1995-10-15');
  assert.notEqual(hash1, hash3);
});

test('calculateSoulmate is 100% deterministic with identical inputs', () => {
  const input = {
    fullName: 'Elena Rostova',
    dateOfBirth: '1997-04-12',
    genderPreference: 'all' as const,
  };

  const result1 = calculateSoulmate(input);
  const result2 = calculateSoulmate(input);

  assert.equal(result1.country.name, result2.country.name);
  assert.equal(result1.country.city, result2.country.city);
  assert.equal(result1.userZodiac, 'Aries');
  assert.equal(result1.userElement, 'Fire');
  assert.equal(result1.cosmicResonance, result2.cosmicResonance);
  assert.ok(result1.cosmicResonance >= 94.0 && result1.cosmicResonance <= 100.0);
  assert.ok(result1.bestMatchSigns.length >= 1);
  assert.ok(result1.astrologicalReason.length > 30);
});

test('calculateSoulmate assigns matching elemental signs and coordinates', () => {
  const input = {
    fullName: 'Lucas Vance',
    dateOfBirth: '1993-11-18',
    genderPreference: 'women' as const,
  };

  const result = calculateSoulmate(input);
  assert.equal(result.userZodiac, 'Scorpio');
  assert.equal(result.userElement, 'Water');
  assert.ok(result.country.flag.length > 0);
  assert.ok(result.country.coordinates.latStr.includes('°'));
  assert.ok(result.country.coordinates.lngStr.includes('°'));
});
