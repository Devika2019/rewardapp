import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TransactionList from './TransactionList';
import logger from '../logger';

const Container = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.colors.background};
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const CustomerTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const TotalPoints = styled.div`
  margin-top: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const SectionTitle = styled.h4`
  margin-top: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  font-size: 15px;
  font-weight: 600;
`;

const MonthList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const MonthButton = styled.button`
  padding: 6px 12px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
  }
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
       <Header>
    <CustomerTitle>Customer: {customerId}</CustomerTitle>
    <TotalPoints>Total Points: {total}</TotalPoints>
  </Header>

  <SectionTitle>Monthly</SectionTitle>
      <MonthList>
        {keys.map((k) => (
          <li key={k}>
            <MonthButton onClick={() => { logger.info({ k }, 'CustomerDetails: month selected'); setSelectedMonthKey(k); }}>{k} - {monthlyMap.get(k).points} pts</MonthButton>
          </li>
        ))}
      </MonthList>
      {selectedMonthKey && (
          <>
      <SectionTitle>Transactions for {selectedMonthKey}</SectionTitle>
      <TransactionList transactions={selectedTransactions} />
    </>
      )}
    </Container>
  );
}

CustomerDetails.propTypes = {
  customerId: PropTypes.string,
  monthlyMap: PropTypes.instanceOf(Map).isRequired,
};
