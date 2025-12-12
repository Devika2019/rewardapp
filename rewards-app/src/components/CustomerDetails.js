import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TransactionList from './TransactionList';
import logger from '../logger';

const Container = styled.div`
  padding-left: ${({ theme }) => theme.spacing(2)};
  flex: 1;
`;

const MonthList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

const MonthButton = styled.button`
  padding: ${({ theme }) => theme.spacing(0.5)} ${({ theme }) => theme.spacing(1)};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
`;

export default function CustomerDetails({ customerId, monthlyMap }) {
  const [selectedMonthKey, setSelectedMonthKey] = useState(null);
  const keys = useMemo(() => Array.from(monthlyMap.keys()).sort().reverse(), [monthlyMap]);
  const total = useMemo(() => {
    let s = 0; monthlyMap.forEach((v) => s += v.points); return s;
  }, [monthlyMap]);
  const selectedTransactions = selectedMonthKey ? monthlyMap.get(selectedMonthKey)?.transactions ?? [] : [];

  if (!customerId) return <Container>Select a customer to view details</Container>;
  if (monthlyMap.size === 0) return <Container>No transactions</Container>;

  return (
    <Container>
      <h3>Customer: {customerId}</h3>
      <div>Total Points: {total}</div>
      <h4>Monthly</h4>
      <MonthList>
        {keys.map((k) => (
          <li key={k}>
            <MonthButton onClick={() => { logger.info({ k }, 'CustomerDetails: month selected'); setSelectedMonthKey(k); }}>{k} - {monthlyMap.get(k).points} pts</MonthButton>
          </li>
        ))}
      </MonthList>
      {selectedMonthKey && (
        <div>
          <h4>Transactions for {selectedMonthKey}</h4>
          <TransactionList transactions={selectedTransactions} />
        </div>
      )}
    </Container>
  );
}

CustomerDetails.propTypes = {
  customerId: PropTypes.string,
  monthlyMap: PropTypes.instanceOf(Map).isRequired,
};
