import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import CustomerDetails from './CustomerDetails';

const monthlyMap = new Map();
monthlyMap.set('2025-12', { points: 115, transactions: [ { transactionId: 't1', amount: 120, date: '2025-12-01T10:00:00Z', points: 90 }, { transactionId: 't2', amount: 75, date: '2025-12-02T11:00:00Z', points: 25 } ] });

test('shows total and monthly list and transactions on month select', () => {
  render(<CustomerDetails customerId={'cust-1'} monthlyMap={monthlyMap} />);
  expect(screen.getByText(/Total Points/i)).toBeInTheDocument();
  expect(screen.getByText('2025-12 - 115 pts')).toBeInTheDocument();
  const btn = screen.getByText('2025-12 - 115 pts');
  fireEvent.click(btn);
  expect(screen.getByText('Transactions')).toBeInTheDocument();
  expect(screen.getByText('t1')).toBeInTheDocument();
});

test('shows No transactions when monthlyMap empty', () => {
  const empty = new Map();
  render(<CustomerDetails customerId={'no'} monthlyMap={empty} />);
  expect(screen.getByText('No transactions')).toBeInTheDocument();
});
