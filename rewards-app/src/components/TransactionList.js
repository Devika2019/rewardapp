import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logger from '../logger';

const Container = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMuted};
    padding-bottom: 6px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  td {
    padding: 8px 0;
    font-size: 14px;
  }

  tbody tr:hover {
    background: ${({ theme }) => theme.colors.muted};
  }
`;

const Pagination = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1)};
  display: flex;
  justify-content: center;
  gap: 8px;
`;


export default function TransactionList({ transactions, pageSize = 5 }) {
  const [page, setPage] = useState(0);
  const txs = transactions || [];
  const pages = Math.max(1, Math.ceil(txs.length / pageSize));
  const current = useMemo(() => txs.slice(page * pageSize, page * pageSize + pageSize), [txs, page, pageSize]);
  if (txs.length === 0) { logger.info('TransactionList: No transactions'); return <div>No transactions</div>; }
  logger.info({ count: txs.length }, 'TransactionList: show');
  return (
    <Container>
      <h4>Transactions</h4>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {current.map((t) => (
            <tr key={t.transactionId}>
              <td>{t.transactionId}</td>
              <td>{new Date(t.date).toLocaleString()}</td>
              <td>{t.amount}</td>
              <td>{t.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <button disabled={page <= 0} onClick={() => setPage((s) => Math.max(0, s - 1))}>Prev</button>
        <PageIdx>{page + 1} / {pages}</PageIdx>
        <button disabled={page >= pages - 1} onClick={() => setPage((s) => Math.min(pages - 1, s + 1))}>Next</button>
      </Pagination>
    </Container>
  );
}

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    transactionId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    points: PropTypes.number,
  })).isRequired,
  pageSize: PropTypes.number,
};



const PageIdx = styled.span`
  margin: 0 8px;
`;
