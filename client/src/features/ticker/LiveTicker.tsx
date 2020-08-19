import * as React from 'react';

import {tickerSymbols} from '../../data/symbols';

export const LiveTicker = () => {
  const ws = React.useRef<WebSocket | null>(null);

  const initialStocks = tickerSymbols.reduce((acc: any, item) => {
    acc[item] = {
      price: 0,
      timestamp: Date.now(),
    }
    return acc;
  }, {})

  // Initially populate liveStock with initial data, then update with socket response
  const [stocks, setStocks] = React.useState(initialStocks);

  React.useEffect(() => {
    const url = `wss://ws.finnhub.io?token=${process.env.FINNHUB_API_TOKEN}`;
    ws.current = new WebSocket(url);

    // Subscribe to some stocks
    ws.current.onopen = () => {
      console.log('websocket is open, subscribing to trades:');
      tickerSymbols.forEach(symbol=> {
        ws.current.send(JSON.stringify({ type: 'subscribe', symbol }));
      })
    };

    ws.current.onclose = () => console.log('Connection closed');

    // Listen for messages
    ws.current.onmessage = (e: MessageEvent) => {
      // console.log('receiving message from server');
      const { data } = JSON.parse(e.data);
      const { s: symbol, p: price, t: timestamp, v: volume } = data[0];
      stocks[symbol] = { price, timestamp };
      setStocks({...stocks });
    };

    return () => {
      console.log('unsubscribing to web socket');
      // Unsubscribe to the trades
      tickerSymbols.forEach(symbol => {
        ws.current.send(JSON.stringify({ type: 'unsubscribe', symbol }));
      })
    };
  }, []);

  console.log(stocks);

  return (
    <div>
      <h2>Real time trades</h2>
      <ul>
        {Object.keys(stocks).map(s => {
          return (
            <li key={s}>
              <span>{s}:</span>
              <span>{stocks[s].price}</span>
            </li>
          )
        })}
      </ul>
    </div>
  );
};
