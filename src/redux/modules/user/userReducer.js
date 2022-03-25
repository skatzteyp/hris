// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { USER_GET } from './userTypes';

// Reducer   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
const INITIAL_STATE = {
  user: {},
  error: null
}
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case USER_GET:
      return { ...state }
    case `${USER_GET}_SUCCESS`:
      return { ...state, user: action.payload, error: null }
    case `${USER_GET}_FAIL`:
      return { ...state, user: {}, error: action.payload }
    default: return state;
  }
}

