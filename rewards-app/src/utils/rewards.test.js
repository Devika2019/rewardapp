import { getRewardForTransaction, getMonthlyRewards, getTotalPoints, filterMonthlyMap } from './rewards';

describe('getRewardForTransaction', () => {
  test('120 dollars => 90 points', () => expect(getRewardForTransaction(120)).toBe(90));
  test('100 dollars => 50 points', () => expect(getRewardForTransaction(100)).toBe(50));
  test('75 dollars => 25 points', () => expect(getRewardForTransaction(75)).toBe(25));
  test('49.99 dollars => 0 points (no points)', () => expect(getRewardForTransaction(49.99)).toBe(0));
  test('0 dollars => 0 points', () => expect(getRewardForTransaction(0)).toBe(0));
  test('-10 dollars => 0 points (negative amount)', () => expect(getRewardForTransaction(-10)).toBe(0));
  test('120.75 => 90 points (fractional ignored)', () => expect(getRewardForTransaction(120.75)).toBe(90));
});

describe('aggregation', () => {
  test('getMonthlyRewards groups by yyyy-mm and computes points', () => {
    const txs = [
      { transactionId: 't1', amount: 120, date: '2025-12-01T10:00:00Z' },
      { transactionId: 't2', amount: 75, date: '2025-12-02T10:00:00Z' },
      { transactionId: 't3', amount: 40, date: '2025-11-02T10:00:00Z' },
    ];
    const map = getMonthlyRewards(txs);
    expect(map.get('2025-12').points).toBe(115);
    expect(map.get('2025-11').points).toBe(0); 
    expect(map.get('2025-12').transactions.length).toBe(2);
  });

  test('getTotalPoints sums points across transactions', () => {
    const txs = [
      { amount: 120 },
      { amount: 75 },
      { amount: 45 },
    ];
    expect(getTotalPoints(txs)).toBe(115);
  });
});

describe('filterMonthlyMap', () => {
  function mk(keys) {
    const m = new Map(); keys.forEach((k) => m.set(k, { points: 1, transactions: [] })); return m;
  }
  test('filters by month and year', () => {
    const m = mk(['2025-01', '2025-02', '2024-01']);
    const out = filterMonthlyMap(m, { month: 0, year: 2025 });
    expect(Array.from(out.keys())).toEqual(['2025-01']);
  });
  test('filters by lastThree using now param', () => {
    const now = new Date(2025, 8, 15); // Sep 2025
    const m = mk(['2025-07', '2025-08', '2025-09', '2025-04']);
    const out = filterMonthlyMap(m, { lastThree: true, now });
    expect(Array.from(out.keys()).sort()).toEqual(['2025-07', '2025-08', '2025-09']);
  });

  test('lastThree overrides year filter', () => {
    const now = new Date(2025, 8, 15); // Sep 2025
    const m = mk(['2025-07', '2025-08', '2025-09', '2024-12']);
    const out = filterMonthlyMap(m, { lastThree: true, now, year: 2024 });
    // Even though year filter requests 2024, lastThree should override and include last 3 months
    expect(Array.from(out.keys()).sort()).toEqual(['2025-07', '2025-08', '2025-09']);
  });
});
