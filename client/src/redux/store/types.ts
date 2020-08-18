import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { StoreState } from './store';

export interface User {
  _id: number | null;
  name: string;
  username: string;
  email: string;
  created: Date | null;
  updated: Date | null;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StoreState,
  unknown,
  Action<string>
>;
