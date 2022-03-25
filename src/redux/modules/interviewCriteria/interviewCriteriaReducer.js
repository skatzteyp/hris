// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { DELETE_INTERVIEW_CRITERIA } from './interviewCriteriaTypes';
import { ADD_INTERVIEW_CRITERIA } from './interviewCriteriaTypes';
import { UPDATE_INTERVIEW_CRITERIA } from './interviewCriteriaTypes';
import { UPDATE_INTERVIEW_CRITERIAS } from './interviewCriteriaTypes';
import { GET_INTERVIEW_CRITERIAS } from './interviewCriteriaTypes';

const INITIAL_STATE = {
  interviewCriterias: [],
  processing: false,
  error: null
};

// Reducer   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case DELETE_INTERVIEW_CRITERIA:
      // Perform action
      return state;
    case `${DELETE_INTERVIEW_CRITERIA}_SUCCESS`:
      state.interviewCriterias.splice(state.interviewCriterias.findIndex(c => c.id === action.payload.id), 1);

      return {
        ...state,
        processing: false,
        error: null,
        interviewCriterias: [...state.interviewCriterias]
      };
    case `${DELETE_INTERVIEW_CRITERIA}_FAIL`:
      // Perform action
      return state;
    case ADD_INTERVIEW_CRITERIA:
      // Perform action
      return state;
    case `${ADD_INTERVIEW_CRITERIA}_SUCCESS`:
      return {
        ...state,
        processing: false,
        error: null,
        interviewCriterias: [ ...state.interviewCriterias, action.payload ]
      };
    case `${ADD_INTERVIEW_CRITERIA}_FAIL`:
      // Perform action
      return state;
    case UPDATE_INTERVIEW_CRITERIA:
      // Perform action
      return state;
    case `${UPDATE_INTERVIEW_CRITERIA}_SUCCESS`:
      let index = state.interviewCriterias.findIndex(c => c.id === action.payload.id);
      state.interviewCriterias[index] = action.payload;

      return {
        ...state,
        processing: false,
        error: null,
        interviewCriterias: [...state.interviewCriterias],
      }
    case `${UPDATE_INTERVIEW_CRITERIA}_FAIL`:
      // Perform action
      return state;
    case UPDATE_INTERVIEW_CRITERIAS:
      // Perform action
      return state;
    case `${UPDATE_INTERVIEW_CRITERIAS}_SUCCESS`:
      // Perform action
      return state;
    case `${UPDATE_INTERVIEW_CRITERIAS}_FAIL`:
      // Perform action
      return state;
    case GET_INTERVIEW_CRITERIAS:
      return {
        ...state,
        processing: true,
        error: null
      }
    case `${GET_INTERVIEW_CRITERIAS}_SUCCESS`:
      const { payload: { interviewCriterias } } = action;
      return {
        ...state,
        processing: false,
        error: null,
        interviewCriterias: interviewCriterias
      };
    case `${GET_INTERVIEW_CRITERIAS}_FAIL`:
      // Perform action
      return state;
    default: return state;
  }
}

