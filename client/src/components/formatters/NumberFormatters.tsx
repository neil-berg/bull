import * as React from 'react';
import { FormattedNumber } from 'react-intl';

export const enum NumberFormattersDataTestID {
  StockPrice = 'stock-price',
  ChangeStockPrice = 'change-stock-price',
  PercentChangeStockPrice = 'percent-change-stock-price',
}

interface StockPriceProps {
  value: number;
}

export const StockPrice = (props: StockPriceProps) => {
  return (
    <span data-testid={NumberFormattersDataTestID.StockPrice}>
      <FormattedNumber
        value={props.value}
        style={'currency'}
        currency={'USD'}
        currencyDisplay={'symbol'}
      />
    </span>
  );
};

interface ChangeStockPriceProps {
  value: number;
  numDecimals?: number;
}

export const ChangeStockPrice = (props: ChangeStockPriceProps) => {
  return (
    <span data-testid={NumberFormattersDataTestID.ChangeStockPrice}>
      <FormattedNumber
        value={props.value}
        style='decimal'
        minimumFractionDigits={props.numDecimals ? props.numDecimals : 2}
        maximumFractionDigits={props.numDecimals ? props.numDecimals : 2}
      />
    </span>
  );
};

interface PercentChangeStockPriceProps {
  value: number;
  numDecimals?: number;
}

export const PercentChangeStockPrice = (
  props: PercentChangeStockPriceProps,
) => {
  return (
    <span data-testid={NumberFormattersDataTestID.ChangeStockPrice}>
      <FormattedNumber
        value={props.value}
        style='percent'
        minimumFractionDigits={props.numDecimals ? props.numDecimals : 2}
        maximumFractionDigits={props.numDecimals ? props.numDecimals : 2}
      />
    </span>
  );
};
