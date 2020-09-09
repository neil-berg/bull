import { User } from '../../types';

/** User action types */
export const ADD_USER = 'user/add';
export const REMOVE_USER = 'user/remove';

interface AddUserAction {
  type: typeof ADD_USER;
  payload: User;
}

interface RemoveUserAction {
  type: typeof REMOVE_USER;
}

export type UserActionTypes = AddUserAction | RemoveUserAction;
