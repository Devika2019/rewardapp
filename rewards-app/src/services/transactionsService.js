import logger from '../logger';

const DATA_PATH = '/data/transactions.json';

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch transaction mock data with simulated delay.
 * Options: { delay, fail } - if fail=true, throws an error for testing.
 */
export async function fetchTransactions({ delay = 250, fail = false } = {}) {
  logger.info('Service: fetchTransactions start');
  await timeout(delay);
  if (fail) {
    const err = new Error('Simulated service error');
    logger.error(err, 'Service: simulated failure');
    throw err;
  }
  try {
    const res = await fetch(DATA_PATH);
    if (!res.ok) throw new Error(`Failed to fetch ${DATA_PATH}: ${res.status}`);
    const data = await res.json();
    logger.info({ count: data.length }, 'Service: fetched transactions');
    return data;
  } catch (err) {
    logger.error(err, 'Service: fetch error');
    throw err;
  }
}

export default { fetchTransactions };
