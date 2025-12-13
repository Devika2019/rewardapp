import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import CustomerList from './CustomerList';

const sample = [
  { customerId: 'cust-001', totalPoints: 100 },
  { customerId: 'cust-002', totalPoints: 50 },
  { customerId: 'cust-003', totalPoints: 0 },
];

test('renders customers and handles selection', () => {
  const handle = jest.fn();
  render(<CustomerList customerSummaries={sample} onSelectCustomer={handle} selectedCustomerId={'cust-002'} pageSize={2} />);
  expect(screen.getByText('cust-001')).toBeInTheDocument();
  expect(screen.getByText('cust-002')).toBeInTheDocument();
  const row = screen.getByText('cust-001');
  fireEvent.click(row);
  expect(handle).toHaveBeenCalledWith('cust-001');
});
