// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { APPLICANT_REPORT } from './applicantReportTypes';

const INITIAL_STATE = {
  processing: false,
  error: '',
  reports: {}
};

// Reducer   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case APPLICANT_REPORT:
      // Perform action
      return {
        ...state,
        processing: true,
        error: ''
      };
    case `${APPLICANT_REPORT}_SUCCESS`:
      // Perform action
      return {
        ...state,
        processing: false,
        error: null,
        reports: {
          ...state.reports,
          ...action.payload
        }
      };
    case `${APPLICANT_REPORT}_FAIL`:
      // Perform action
      return {
        ...state,
        processing: false,
        error: action.payload
      };
    default: return state;
  }
}

