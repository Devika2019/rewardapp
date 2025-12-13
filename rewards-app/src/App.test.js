import { render, screen, waitFor } from './test-utils';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn();
});
afterEach(() => {
  jest.resetAllMocks();
});

test('renders Rewards Program header and loads customers', async () => {
  const mockData = [
    { customerId: 'cust-1', transactionId: 't1', amount: 120, date: '2025-12-01T10:00:00Z' },
    { customerId: 'cust-2', transactionId: 't2', amount: 75, date: '2025-12-02T11:00:00Z' },
  ];
  global.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockData });
  render(<App />);
  await waitFor(() => expect(screen.getByText(/Rewards Program Dashboard/i)).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText('cust-1')).toBeInTheDocument());
  expect(screen.getByText('cust-2')).toBeInTheDocument();
});
