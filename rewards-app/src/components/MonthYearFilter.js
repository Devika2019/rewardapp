import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MONTHS, YEARS } from '../constants';

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
`;

export default function MonthYearFilter({ month, year, lastThree, onMonthChange, onYearChange, onLastThreeChange }) {
  return (
    <Container>
      <label>
        Month:
        <select value={month} onChange={(e) => { onMonthChange(Number(e.target.value)); if (onLastThreeChange) onLastThreeChange(false); }} disabled={lastThree}>
          <option value="-1">All</option>
          {MONTHS.map((m, i) => (
            <option key={m} value={i}>{m}</option>
          ))}
        </select>
      </label>
      <label>
        Year:
        <select value={year} onChange={(e) => { onYearChange(Number(e.target.value)); if (onLastThreeChange) onLastThreeChange(false); }} disabled={lastThree}>
          {YEARS.map((yr) => (
            <option key={yr} value={yr}>{yr}</option>
          ))}
        </select>
      </label>
      <label>
        <input type="checkbox" checked={lastThree} onChange={(e) => onLastThreeChange(e.target.checked)} /> Last 3 months
      </label>
    </Container>
  );
}

MonthYearFilter.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  lastThree: PropTypes.bool,
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
  onLastThreeChange: PropTypes.func,
};
