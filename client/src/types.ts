// General data shapes
export interface Stock {
  symbol: string;
  currentPrice: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  previousClosePrice: number;
  timestamp: number;
}

// Server response types
export type StaticTickerResp = Stock[];

// WebSocket message types
