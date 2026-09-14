import { describe, expect, it } from 'vitest';
import { calculateNights, calculateTotal } from './booking.js';

describe('Booking calculations', () => {
  it('calculates the number of nights correctly', () => {
    expect(calculateNights('2026-09-15', '2026-09-18')).toBe(3);
  });

  it('calculates the total price correctly', () => {
    expect(calculateTotal(3, 3500)).toBe(10500);
  });
});