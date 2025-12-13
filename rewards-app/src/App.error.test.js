import React from 'react';
import { render, screen, waitFor } from './test-utils';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn();
});
afterEach(() => {
  jest.resetAllMocks();
});

test('shows error message when fetch rejects', async () => {
  global.fetch.mockRejectedValueOnce(new Error('network fail'));
  render(<App />);
  await waitFor(() => expect(screen.getByText(/Error:/i)).toBeInTheDocument());
  expect(screen.queryByText(/Rewards Program Dashboard/)).not.toBeInTheDocument();
});

test('shows error message when fetch returns non-ok', async () => {
  global.fetch.mockResolvedValueOnce({ ok: false, status: 500 });
  render(<App />);
  await waitFor(() => expect(screen.getByText(/Error:/i)).toBeInTheDocument());
});
