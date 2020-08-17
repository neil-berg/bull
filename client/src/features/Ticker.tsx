import * as React from 'react';

export const Ticker = () => {
  const ws = React.useRef<WebSocket | null>(null);
  const [lastPrice, setLastPrice] = React.useState<number | null>(null)

  React.useEffect(() => {
      const url = `wss://ws.finnhub.io?token=${process.env.FINNHUB_API_TOKEN}`;
      ws.current = new WebSocket(url);
      
      // Subscribe to some stocks
      ws.current.onopen = () => {
        console.log('websocket is open, subscribing to trades:');
        ws.current.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
      };
      
      ws.current.onclose = () => console.log('Connection closed');
      // ws.current.onmessage = (e: MessageEvent) => {
      //   setWsData(prevState => [...prevState, e.data])
      // }
      
      // Listen for messages
      ws.current.onmessage = (e: MessageEvent) => {
        console.log('receiving message from server');
        console.log(e);
        // const {s: symbol, p: lastPrice, t: timestamp, v: volume} = e.data;

        // console.log(`${symbol}, ${lastPrice}, ${timestamp}, ${volume}`);
        // setLastPrice(lastPrice);
      }

      return () => {
        console.log('unsubscribing to web socket')
        // Unsubscribe to the trades
        ws.current.send(JSON.stringify({'type':'unsubscribe','symbol': 'AAPL'}))
      }
  }, [])
  
  return (
    <div>
      <h2>Real time trades</h2>
  <h3>{`Last price for Apple:$  ${lastPrice}`}</h3>
    </div>
  )
}