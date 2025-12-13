import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  min-width: 260px;
  padding: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.colors.background};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    font-size: 13px;
    font-weight: 600;
    padding-bottom: 6px;
    color: ${({ theme }) => theme.colors.textMuted};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  td {
    padding: 8px 4px;
    font-size: 14px;
  }
`;

const Row = styled.tr`
  cursor: pointer;
  background: ${(p) => (p.selected ? p.theme.colors.muted : 'transparent')};

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
  }
`;

const Pagination = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1)};
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
`;

export default function CustomerList({ customerSummaries, onSelectCustomer, selectedCustomerId, pageSize = 6 }) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(customerSummaries.length / pageSize));
  const current = useMemo(() => customerSummaries.slice(page * pageSize, page * pageSize + pageSize), [customerSummaries, page, pageSize]);

  return (
    <Container>
      <h3>Customers</h3>
      <Table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {current.map((c) => (
            <Row key={c.customerId} selected={c.customerId === selectedCustomerId} onClick={() => onSelectCustomer(c.customerId)}>
              <td>{c.customerId}</td>
              <td>{c.totalPoints}</td>
            </Row>
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

CustomerList.propTypes = {
  customerSummaries: PropTypes.arrayOf(PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    totalPoints: PropTypes.number.isRequired,
    monthlyMap: PropTypes.instanceOf(Map),
  })).isRequired,
  onSelectCustomer: PropTypes.func.isRequired,
  selectedCustomerId: PropTypes.string,
  pageSize: PropTypes.number,
};


const PageIdx = styled.span`
  margin: 0 8px;
`;
