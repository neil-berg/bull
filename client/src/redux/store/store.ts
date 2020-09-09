import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from '../reducers';
import { User } from '../../types';

export interface StoreState {
  user: User;
}

export const initialState: StoreState = {
  user: {
    id: '',
    userName: '',
  },
};

// Add redux devtools in development
const middleware =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk);

export const store = createStore(rootReducer, middleware);
