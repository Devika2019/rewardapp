import { fetchTransactions } from './transactionsService';

describe('transactionsService fetchTransactions', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
    delete global.fetch;
  });

  test('resolves with JSON data on success', async () => {
    const mockData = [{ transactionId: 't1', amount: 100 }];
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockData });
    const data = await fetchTransactions({ delay: 0 });
    expect(data).toEqual(mockData);
  });

  test('throws error when fetch returns non-ok response', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(fetchTransactions({ delay: 0 })).rejects.toThrow();
  });

  test('throws error when fail=true (simulated)', async () => {
    await expect(fetchTransactions({ delay: 0, fail: true })).rejects.toThrow('Simulated service error');
  });
});
