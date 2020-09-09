import { UserActionTypes } from './types';
import { ADD_USER, REMOVE_USER } from './types';
import { User } from '../../types';

export const addUser = (user: User): UserActionTypes => ({
  type: ADD_USER,
  payload: user,
});

export const removeUser = (): UserActionTypes => ({
  type: REMOVE_USER,
});
