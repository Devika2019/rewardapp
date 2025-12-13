import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import MonthYearFilter from './MonthYearFilter';

test('selecting month/year disables lastThree (calls handler)', () => {
  const onMonthChange = jest.fn();
  const onYearChange = jest.fn();
  const onLastThreeChange = jest.fn();
  render(<MonthYearFilter month={-1} year={2025} lastThree={true} onMonthChange={onMonthChange} onYearChange={onYearChange} onLastThreeChange={onLastThreeChange} />);
  const monthSelect = screen.getByLabelText(/Month:/i);
  fireEvent.change(monthSelect, { target: { value: '2' } }); // March (0-based index)
  expect(onMonthChange).toHaveBeenCalledWith(2);
  expect(onLastThreeChange).toHaveBeenCalledWith(false);
  const yearSelect = screen.getByLabelText(/Year:/i);
  fireEvent.change(yearSelect, { target: { value: '2021' } });
  expect(onYearChange).toHaveBeenCalledWith(2021);
  expect(onLastThreeChange).toHaveBeenCalledWith(false);
});
