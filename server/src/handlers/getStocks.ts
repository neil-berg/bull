import { Request, Response } from 'express';

import { finnhub } from '../finnhub-api';

interface Stock {
  o: number;
  h: number;
  l: number;
  c: number;
  pc: number;
  t: number;
}

type StockResp = { data: Stock };
type GetStocksResp = StockResp[];

type Accumulator = {
  [k: string]: {
    currentPrice: number;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
    previousClosePrice: number;
    timestamp: number;
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStocks = async (req: Request, res: Response) => {
  const symbols = ['MSFT', 'GOOG'];
  const makeRequestURLs = (symbol: string) =>
    finnhub.get(`quote?symbol=${symbol}`);

  const urls = symbols.map((symbol) => makeRequestURLs(symbol));

  try {
    const allStocks: GetStocksResp = await Promise.all(urls);

    // Format the response
    const formattedRes = allStocks.reduce((acc: Accumulator, item, index) => {
      acc[symbols[index]] = {
        currentPrice: item.data.c,
        openPrice: item.data.o,
        highPrice: item.data.h,
        lowPrice: item.data.l,
        previousClosePrice: item.data.pc,
        timestamp: item.data.t,
      };
      return acc;
    }, {});
    res.send([formattedRes]);
    res.status(200);
  } catch (e) {
    res.send({ error: e });
    res.status(400);
  }
};
