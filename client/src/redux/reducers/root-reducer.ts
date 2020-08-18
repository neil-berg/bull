import { combineReducers } from 'redux';

import { StoreState } from '../store';
import { userReducer } from './user-reducer';

export const rootReducer = combineReducers<StoreState>({
  user: userReducer,
});
