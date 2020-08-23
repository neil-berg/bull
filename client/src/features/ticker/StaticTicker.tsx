import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FormattedNumber } from 'react-intl';

import { StaticTickerResp } from '../../types';

const enum Classes {
  StockContainer = 'ticker-stock-container',
  StockSymbol = 'ticker-stock-symbol',
  StockCurrentPrince = 'ticker-stock-currentp-price',
}

export const StaticTicker = () => {
  const [stocks, setStocks] = React.useState<StaticTickerResp | null>(null);

  const fetchTickerStocks = async () => {
    try {
      const url = process.env.API_URL + '/stocks/ticker';
      const resp: { data: StaticTickerResp } = await axios.get(url);
      setStocks(resp.data);
    } catch (e) {
      console.log(e);
    }
  };

  // Fetch previous close prices for static ticker on mount
  React.useEffect(() => {
    fetchTickerStocks();
  }, []);

  const renderStocks = () => {
    return stocks.map((s) => {
      const change = s.currentPrice - s.previousClosePrice;
      const percentChange = (change / s.previousClosePrice) * 100;
      return (
        <div key={s.symbol} className={Classes.StockContainer}>
          <span className={Classes.StockSymbol}>{s.symbol}</span>
          <FormattedNumber
            value={s.currentPrice}
            style={'currency'}
            currency={'USD'}
            currencyDisplay={'symbol'}
          />
          <span>{change}</span>
          <span>{percentChange}</span>
        </div>
      );
    });
  };

  return !stocks ? (
    <h1>Loading stock ticker</h1>
  ) : (
    <StyledStaticTicker>{renderStocks()}</StyledStaticTicker>
  );
};

const StyledStaticTicker = styled.h2`
  color: red;

  .${Classes.StockContainer} {
    display: flex;
    flex-direction: column;
  }
`;
