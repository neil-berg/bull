import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Ticker from 'react-ticker';

import {
  ChangeStockPrice,
  PercentChangeStockPrice,
  StockPrice,
} from '../../components';
import { StaticTickerResp } from '../../types';

const enum Classes {
  TickerContainer = 'ticker-container',
  StockContainer = 'ticker-stock-container',
  StockContainerRow = 'ticker-stock-container-row',
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

  const renderTicker = () => {
    return (
      <div className={Classes.TickerContainer}>
        {stocks.map((s) => {
          const change = s.currentPrice - s.previousClosePrice;
          const percentChange = change / s.previousClosePrice;
          return (
            <div key={s.symbol} className={Classes.StockContainer}>
              <div className={Classes.StockContainerRow}>
                <span className={Classes.StockSymbol}>{s.symbol}</span>
                <StockPrice value={s.currentPrice} />
              </div>
              <div className={Classes.StockContainerRow}>
                <ChangeStockPrice value={change} />
                <PercentChangeStockPrice value={percentChange} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return !stocks ? (
    <h1>Loading stock ticker</h1>
  ) : (
    <StyledStaticTicker>
      <Ticker>{() => renderTicker()}</Ticker>
    </StyledStaticTicker>
  );
};

const StyledStaticTicker = styled.div`
  height: 80px;
  background: lightgrey;

  .${Classes.TickerContainer} {
    display: flex;
  }

  .${Classes.StockContainer} {
    border: 2px grey solid;
    border-radius: 4px;
    min-width: 200px;
    max-width: 200px;
  }

  .${Classes.StockContainerRow} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
