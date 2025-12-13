import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import TransactionList from './TransactionList';

function mk(count) {
  const txs = [];
  for (let i = 0; i < count; i += 1) {
    txs.push({ transactionId: `t${i}`, date: '2025-12-01T10:00:00Z', amount: 100 + i, points: i });
  }
  return txs;
}

test('pagination: shows first page and next page', () => {
  const txs = mk(7);
  render(<TransactionList transactions={txs} pageSize={3} />);
  expect(screen.getByText('t0')).toBeInTheDocument();
  expect(screen.queryByText('t3')).not.toBeInTheDocument();
  const next = screen.getByText('Next');
  fireEvent.click(next);
  expect(screen.getByText('t3')).toBeInTheDocument();
});

test('shows No transactions when empty', () => {
  render(<TransactionList transactions={[]} />);
  expect(screen.getByText('No transactions')).toBeInTheDocument();
});
