import { Request, Response } from 'express';

import { finnhub } from '../finnhub-api';
import { tickerSymbols } from '../data';

interface Stock {
  o: number; // Open price
  h: number; // High price
  l: number; // Low price
  c: number; // Current price
  pc: number; // Previous close price
  t: number; // Timestamp
}

type StockResp = { data: Stock };
type GetStocksResp = StockResp[];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getTickerStocks = async (req: Request, res: Response) => {
  const makeRequestURLs = (symbol: string) =>
    finnhub.get(`quote?symbol=${symbol}`);

  const urls = tickerSymbols.map((symbol) => makeRequestURLs(symbol));

  try {
    const allStocks: GetStocksResp = await Promise.all(urls);

    // Format the response
    const formattedRes = allStocks.map((item, index) => ({
      symbol: tickerSymbols[index],
      currentPrice: item.data.c,
      openPrice: item.data.o,
      highPrice: item.data.h,
      lowPrice: item.data.l,
      previousClosePrice: item.data.pc,
      timestamp: item.data.t,
    }));
    res.send(formattedRes);
    res.status(200);
  } catch (e) {
    res.send({ error: e });
    res.status(400);
  }
};
