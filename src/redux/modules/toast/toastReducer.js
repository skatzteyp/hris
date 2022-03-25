// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { TOAST_REMOVE_ALL } from './toastTypes';
import { TOAST_REMOVE } from './toastTypes';
import { TOAST_ADD } from './toastTypes';

const INITIAL_STATE = [];

// Reducer   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case TOAST_REMOVE_ALL:
      return INITIAL_STATE
    case TOAST_REMOVE:
      return state.filter(t => t.id !== action.payload.id)
    case TOAST_ADD:
      return [
        ...state,
        {
          id: +new Date(),
          payload: action.payload,
          type: action.payload.type
        }
      ];
    default: return state;
  }
}

