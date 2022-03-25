// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { AUTH_LOGOUT } from './authTypes';
import { AUTH_LOGIN } from './authTypes';

const INITIAL_STATE = {
  token: {},
  error: null
}

// Reducer   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case `${AUTH_LOGOUT}_SUCCESS`:
      localStorage.removeItem('token');
      return {
        ...state,
        token: {},
        error: null
      };
    case `${AUTH_LOGOUT}_FAIL`:
      return {
        ...state,
        message: null,
        error: action.payload
      };

    case AUTH_LOGIN:
      return {
        ...state,
        error: null
      };
    case `${AUTH_LOGIN}_SUCCESS`:
      localStorage.setItem('token', JSON.stringify(action.payload));
      return {
        token: action.payload,
        error: null
      };
    case `${AUTH_LOGIN}_FAIL`:
      sessionStorage.removeItem('token');
      return {
        token: {},
        error: action.payload
      };
    default: return state;
  }
}

