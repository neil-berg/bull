import * as React from 'react';
import styled from 'styled-components';

import { StockPrice } from '../../components';
import { tickerSymbols } from '../../data/symbols';

const enum Classes {
  TickerContainer = 'ticker-container',
  StockContainer = 'ticker-stock-container',
  StockSymbol = 'ticker-stock-symbol',
  StockCurrentPrice = 'ticker-stock-currentp-price',
}

export const LiveTicker = () => {
  const ws = React.useRef<WebSocket | null>(null);

  const initialStocks = tickerSymbols.map((symbol) => ({
    symbol,
    price: 0,
    timestamp: Date.now(),
  }));

  // Initially populate liveStock with initial data, then update with socket response
  const [stocks, setStocks] = React.useState(initialStocks);

  React.useEffect(() => {
    const url = `wss://ws.finnhub.io?token=${process.env.FINNHUB_API_TOKEN}`;
    ws.current = new WebSocket(url);

    // Subscribe to some stocks
    ws.current.onopen = () => {
      console.log('websocket is open, subscribing to trades:');
      tickerSymbols.forEach((symbol) => {
        ws.current.send(JSON.stringify({ type: 'subscribe', symbol }));
      });
    };

    ws.current.onclose = () => console.log('Connection closed');

    // Listen for messages
    ws.current.onmessage = (e: MessageEvent) => {
      // console.log('receiving message from servvver');
      const { data } = JSON.parse(e.data);
      const { s: symbol, p: price, t: timestamp } = data[0];
      setStocks((prevState) => {
        const indexToUpdate = prevState.findIndex((s) => s.symbol === symbol);
        const newState = [...prevState];
        newState[indexToUpdate] = { symbol, price, timestamp };
        return newState;
      });
    };

    return () => {
      console.log('unsubscribing to web socket');
      // Unsubscribe to the trades
      tickerSymbols.forEach((symbol) => {
        ws.current.send(JSON.stringify({ type: 'unsubscribe', symbol }));
      });
    };
  }, []);

  const renderTicker = () => {
    return (
      <div className={Classes.TickerContainer}>
        {stocks.map((s) => {
          return (
            <div key={s.symbol} className={Classes.StockContainer}>
              <span className={Classes.StockSymbol}>{s.symbol}</span>
              <StockPrice value={s.price} />
            </div>
          );
        })}
      </div>
    );
  };

  return <StyledStaticTicker>{renderTicker()}</StyledStaticTicker>;
};

const StyledStaticTicker = styled.div`
  height: 80px;
  background: lightgrey;

  .${Classes.TickerContainer} {
    display: flex;
    flex-direction: column;
  }

  .${Classes.StockContainer} {
    border: 2px grey solid;
    border-radius: 4px;
    min-width: 100px;
    max-width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
