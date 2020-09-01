import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Ticker from 'react-ticker';

import {
  ChangeStockPrice,
  PercentChangeStockPrice,
  StockPrice,
  TextSpan,
} from '../../components';
import { StaticTickerResp } from '../../types';

const enum Classes {
  TickerContainer = 'ticker-container',
  StockContainer = 'ticker-stock-container',
  StockContainerRow = 'ticker-stock-container-row',
  StockSymbol = 'ticker-stock-symbol',
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
            <div
              key={s.symbol}
              className={Classes.StockContainer}
              style={{
                background:
                  change > 0
                    ? 'linear-gradient(45deg, #00f986, #ccffda)'
                    : 'linear-gradient(45deg, #ef3694, #ffd2e9)',
              }}
            >
              <div className={Classes.StockContainerRow}>
                <TextSpan className={Classes.StockSymbol}>{s.symbol}</TextSpan>
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
      {/* {renderTicker()} */}
    </StyledStaticTicker>
  );
};

const StyledStaticTicker = styled.div`
  .${Classes.TickerContainer} {
    display: flex;
    padding: 12px 0;
    background: black;
    display: flex;
    justify-content: center;
  }

  .${Classes.StockContainer} {
    min-width: 160px;
    margin-right: 6px;
    padding: 6px;
  }

  .${Classes.StockContainerRow} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .${Classes.StockSymbol} {
    font-size: 20px;
    color: white;
  }
`;
