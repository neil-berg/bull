import { ADD_USER, REMOVE_USER, UserActionTypes } from '../actions';

import { StoreState } from '../store';

const initialState: StoreState['user'] = {
  _id: null,
  username: '',
  created: null,
  updated: null,
};

export const userReducer = (
  state = initialState,
  action: UserActionTypes,
): StoreState['user'] => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, ...action.payload };
    case REMOVE_USER:
      return { ...initialState };
    default:
      return { ...state };
  }
};
