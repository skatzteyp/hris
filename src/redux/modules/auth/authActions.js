// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { AUTH_LOGOUT } from './authTypes';
import { AUTH_LOGIN } from './authTypes';

// Action Creators   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function authLogout() {
  return { type: AUTH_LOGOUT };
}

export function authLogin(data) {
  return { type: AUTH_LOGIN , payload: data };
}

