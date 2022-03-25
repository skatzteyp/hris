// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { GET_EXAMINATIONS } from './examinationTypes';

const INITIAL_STATE = {
  processing: false,
  error: null
};

// Reducer   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case GET_EXAMINATIONS:
      return {
        ...state,
        processing: true
      };
    case `${GET_EXAMINATIONS}_SUCCESS`:
      const { payload: { examinations, jobTitle, level } } = action;
      return {
        ...state,
        processing: false,
        error: null,
        [`${jobTitle}-${level}`]: examinations
      }
    case `${GET_EXAMINATIONS}_FAIL`:
      return {
        ...state,
        process: false,
        error: action.payload
      }
    default: return state;
  }
}

