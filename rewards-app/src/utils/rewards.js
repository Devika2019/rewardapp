export function getRewardForTransaction(amount) {
  const parsed = Number(amount);
  if (!Number.isFinite(parsed) || parsed <= 50) return 0;
  const dollars = Math.floor(parsed);
  let points = 0;
  if (dollars > 100) {
    points += (dollars - 100) * 2;
    points += 50; 
  } else if (dollars > 50) {
    points += (dollars - 50) * 1;
  }
  return points;
}

export function getTotalPoints(transactions) {
  if (!Array.isArray(transactions)) return 0;
  return transactions.reduce((sum, tx) => sum + getRewardForTransaction(tx.amount), 0);
}

export function getMonthlyRewards(transactions) {
  const map = new Map();
  if (!Array.isArray(transactions)) return map;
  transactions.forEach((tx) => {
    const d = new Date(tx.date);
    if (!isFinite(d.getTime())) return;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const points = getRewardForTransaction(tx.amount);
    if (!map.has(key)) map.set(key, { points: 0, transactions: [] });
    const entry = map.get(key);
    entry.points += points;
    entry.transactions.push({ ...tx, points });
  });
  return map;
}

export function filterMonthlyMap(monthlyMap, { month = -1, year = null, lastThree = false, now = new Date() } = {}) {
  const out = new Map();
  if (!(monthlyMap instanceof Map)) return out;
  let cutoff = null;
  if (lastThree) {
    cutoff = new Date(now.getFullYear(), now.getMonth() - 2, 1);
  }
  monthlyMap.forEach((value, key) => {
    const [y, m] = key.split('-').map(Number);
    if (Number.isNaN(y) || Number.isNaN(m)) return;
    // If `lastThree` is enabled, it takes precedence - ignore explicit month/year filters
    if (cutoff) {
      const d = new Date(y, m - 1, 1);
      if (d < cutoff) return;
    } else {
      if (year && y !== year) return;
      if (month >= 0 && m !== month + 1) return;
    }
    out.set(key, value);
  });
  return out;
}
