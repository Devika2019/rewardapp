import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding-right: ${({ theme }) => theme.spacing(1)};
  min-width: 260px;
  background: ${({ theme }) => theme.colors.background};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td { padding: ${({ theme }) => theme.spacing(0.5)}; border-bottom: 1px solid ${({ theme }) => theme.colors.border}; }
`;

const Row = styled.tr`
  cursor: pointer;
  background: ${(p) => (p.selected ? p.theme.colors.muted : 'transparent')};
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

const Pagination = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1)};
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  align-items: center;
`;

const PageIdx = styled.span`
  margin: 0 8px;
`;
