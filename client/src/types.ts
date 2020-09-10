// General data shapes
export interface User {
  id: string;
  userName: string;
}

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
export type CreateUserResp = User;
export type StaticTickerResp = Stock[];

// WebSocket message types

// Error code mappings
export const enum ErrorCode {
  EMAIL_ALREADY_TAKEN = 0,
  UNABLE_TO_CREATE_USER = 1,
  INVALID_CREDENTIALS = 2,
}
