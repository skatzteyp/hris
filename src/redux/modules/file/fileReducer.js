// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { UPLOAD } from './fileTypes';

const initialState = {
  processing: false,
  error: null,
  items: {}
};

// Reducer   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPLOAD:
      return {
        ...state,
        processing: true
      };
    case `${UPLOAD}_SUCCESS`:
      return {
        ...state,
        processing: false,
        items: {
          ...state.items,
          [action.payload.name]: action.payload.filename
        }
      };
    case `${UPLOAD}_FAIL`:
      return {
        ...state,
        processing: false,
        error: action.payload
      };
    default: return state;
  }
}

