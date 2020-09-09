import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { StoreState } from './store';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StoreState,
  unknown,
  Action<string>
>;
