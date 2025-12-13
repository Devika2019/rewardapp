import React, { useEffect, useMemo, useState } from 'react';
import logger from './logger';
import { fetchTransactions } from './services/transactionsService';
import { getMonthlyRewards, getTotalPoints, filterMonthlyMap } from './utils/rewards';
import MonthYearFilter from './components/MonthYearFilter';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import styled from 'styled-components';

const Page = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
    display: flex;
  justify-content: center;
`;

const Message = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const AppContainer = styled.div`
  display: flex;
  gap: 12px;
`;
const Content = styled.div`
  width: 100%;
  max-width: 1200px;   /* adjust as needed */
`;

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [monthFilter, setMonthFilter] = useState(-1);
  const [yearFilter, setYearFilter] = useState(2025);
  const [lastThree, setLastThree] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchTransactions({ delay: 200 })
      .then((data) => {
        if (!mounted) return;
        setTransactions(data || []);
        setLoading(false);
        logger.info('App: transactions loaded');
      })
      .catch((err) => {
        if (!mounted) return;
        setLoading(false);
        setError(err.message);
        logger.error(err, 'App: error loading transactions');
      });
    return () => { mounted = false; };
  }, []);

  const customerSummaries = useMemo(() => {
    const grouped = new Map();
    transactions.forEach((tx) => {
      const id = tx.customerId;
      if (!grouped.has(id)) grouped.set(id, []);
      grouped.get(id).push(tx);
    });
    return Array.from(grouped.entries()).map(([customerId, txs]) => ({
      customerId,
      totalPoints: getTotalPoints(txs),
      monthlyMap: getMonthlyRewards(txs),
    })).sort((a, b) => b.totalPoints - a.totalPoints);
  }, [transactions]);

  useEffect(() => {
    if (!selectedCustomer && customerSummaries.length > 0) {
      setSelectedCustomer(customerSummaries[0].customerId);
    }
  }, [customerSummaries, selectedCustomer]);

  const selectedSummary = customerSummaries.find((c) => c.customerId === selectedCustomer) ?? null;
  const filteredMonthlyMap = useMemo(() => {
    if (!selectedSummary) return new Map();
    return filterMonthlyMap(selectedSummary.monthlyMap, { month: monthFilter, year: yearFilter, lastThree });
  }, [selectedSummary, monthFilter, yearFilter, lastThree]);

  if (loading) return <Message>Loading...</Message>;
  if (error) return <Message>Error: {error}</Message>;

  return (
    <Page>
       <Content>
      <h1 style={{ textAlign: 'center' }}>Rewards Program Dashboard</h1>
      <MonthYearFilter month={monthFilter} year={yearFilter} lastThree={lastThree} onMonthChange={setMonthFilter} onYearChange={setYearFilter} onLastThreeChange={setLastThree} />
      <AppContainer>
        <CustomerList customerSummaries={customerSummaries} selectedCustomerId={selectedCustomer} onSelectCustomer={(id) => { logger.info({ id }, 'App: select customer'); setSelectedCustomer(id); }} />
        <CustomerDetails customerId={selectedCustomer} monthlyMap={filteredMonthlyMap} />
      </AppContainer>
      </Content>
    </Page>
  );
}

export default App;
