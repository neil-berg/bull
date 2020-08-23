import * as React from 'react';
import { renderWithProviders } from '../../tests';
import '@testing-library/jest-dom';

import {
  ChangeStockPrice,
  PercentChangeStockPrice,
  StockPrice,
  NumberFormattersDataTestID as TestID,
} from './NumberFormatters';

describe('Number formatters', () => {
  describe('<StockPrice />', () => {
    test('shows amount in USD with 2 decimal places', () => {
      const value = 123.456;
      const component = renderWithProviders(<StockPrice value={value} />);
      const price = component.getByTestId(TestID.StockPrice);
      expect(price.textContent).toStrictEqual('$123.46');
    });
  });

  describe('<ChangeStockPrice />', () => {
    test('shows 2 decimal places by default', () => {
      const value = 123.456;
      const component = renderWithProviders(<ChangeStockPrice value={value} />);
      const change = component.getByTestId(TestID.ChangeStockPrice);
      expect(change.textContent).toStrictEqual('123.46');
    });
    test('shows N decimal places if specified', () => {
      const value = 123.456;
      const component = renderWithProviders(
        <ChangeStockPrice value={value} numDecimals={3} />,
      );
      const change = component.getByTestId(TestID.ChangeStockPrice);
      expect(change.textContent).toStrictEqual('123.456');
    });
    test('shows sign when value is negative', () => {
      const value = -123.45;
      const component = renderWithProviders(<ChangeStockPrice value={value} />);
      const change = component.getByTestId(TestID.ChangeStockPrice);
      expect(change.textContent).toStrictEqual('-123.45');
    });
    test('does not show sign when value is positive', () => {
      const value = 123.45;
      const component = renderWithProviders(<ChangeStockPrice value={value} />);
      const change = component.getByTestId(TestID.ChangeStockPrice);
      expect(change.textContent).toStrictEqual('123.45');
    });
  });

  describe('<PercentChangeStockPrice />', () => {
    test('shows 2 decimal places by default', () => {
      const value = 0.00123;
      const component = renderWithProviders(
        <PercentChangeStockPrice value={value} />,
      );
      const change = component.getByTestId(TestID.ChangeStockPrice);
      expect(change.textContent).toStrictEqual('0.12%');
    });
    test('shows N decimal places if specified', () => {
      const value = 0.00123;
      const component = renderWithProviders(
        <PercentChangeStockPrice value={value} numDecimals={3} />,
      );
      const change = component.getByTestId(TestID.ChangeStockPrice);
      expect(change.textContent).toStrictEqual('0.123%');
    });
    test('shows sign when value is negative', () => {
      const value = -0.01234;
      const component = renderWithProviders(
        <PercentChangeStockPrice value={value} />,
      );
      const change = component.getByTestId(TestID.ChangeStockPrice);
      expect(change.textContent).toStrictEqual('-1.23%');
    });
    test('does not show sign when value is positive', () => {
      const value = 0.01234;
      const component = renderWithProviders(
        <PercentChangeStockPrice value={value} />,
      );
      const change = component.getByTestId(TestID.ChangeStockPrice);
      expect(change.textContent).toStrictEqual('1.23%');
    });
  });
});
