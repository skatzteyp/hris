// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { ACCEPTED_JOB_OFFER } from './applicantTypes';
import { CREATE_APPLICANT_PUBLIC } from './applicantTypes';
import { FAVORITE_APPLICANT } from './applicantTypes';
import { UPDATE_APPLICANT_PUBLIC } from './applicantTypes';
import { GET_APPLICANT_PUBLIC } from './applicantTypes';
import { UPDATE_QUESTIONNAIRE } from './applicantTypes';
import { UPDATE_ONBOARDING } from './applicantTypes';
import { DELETE_CHARACTER_REFERENCE } from './applicantTypes';
import { DELETE_DOCUMENTATION } from './applicantTypes';
import { UPDATE_DOCUMENTATION } from './applicantTypes';
import { UPDATE_CHARACTER_REFERENCE } from './applicantTypes';
import { UPDATE_BACKGROUND } from './applicantTypes';
import { UPDATE_FINAL_INTERVIEW } from './applicantTypes';
import { CREATE_TOKEN } from './applicantTypes';
import { UPDATE_EXAM } from './applicantTypes';
import { UPDATE_CRITERIA_POINT } from './applicantTypes';
import { UPDATE_CRITERIA_POINTS } from './applicantTypes';
import { UPDATE_INTERVIEW } from './applicantTypes';
import { UPDATE_APPLICANT } from './applicantTypes';
import { GET_APPLICANT } from './applicantTypes';
import { GET_APPLICANTS } from './applicantTypes';
import { GET_NEW_APPLICANTS } from './applicantTypes';

const INITIAL_STATE = {
  applicant: {
    token: '',
    jobTitle: {},
    level: {},
    source: {},
    referrer: {},
    maritalStatus: {},
    homeAddress: {},
    currentAddress: {},
    educationalAttainment: {},
    workHistories: [],
    portfolios: [],
    questionnaire: {},
    interview: {
      interviewer: {},
      criteriaPoints: []
    },
    applicantExam: {},
    applicantOnboarding: {
      acceptedJobOffer: null
    },
    applicantBackground: {},
    applicantFinalInterview: {},
    applicantDocumentations: [],
    applicantCharacterReferences: [],
    isFavorite: false,
  },
  applicants: [],
  pagination: {},
  processing: false,
  updating: false,
  error: null
}

// Reducer   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    
    case ACCEPTED_JOB_OFFER:
    case CREATE_APPLICANT_PUBLIC:
    case FAVORITE_APPLICANT:
    case UPDATE_APPLICANT_PUBLIC:
    case GET_APPLICANT_PUBLIC:
    case UPDATE_QUESTIONNAIRE:
    case UPDATE_ONBOARDING:
    case DELETE_CHARACTER_REFERENCE:
    case DELETE_DOCUMENTATION:
    case UPDATE_DOCUMENTATION:
    case UPDATE_CHARACTER_REFERENCE:
    case UPDATE_BACKGROUND:
    case UPDATE_FINAL_INTERVIEW:
    case CREATE_TOKEN:
    case UPDATE_EXAM:
    case UPDATE_CRITERIA_POINT:
    case UPDATE_CRITERIA_POINTS:
    case UPDATE_INTERVIEW:
    case UPDATE_APPLICANT:
    case GET_APPLICANT:
    case GET_APPLICANTS:
    case GET_NEW_APPLICANTS:
      return {
        ...state,
        processing: true,
        updating: true,
        error: null
      };
    case `${ACCEPTED_JOB_OFFER}_FAIL`:
    case `${FAVORITE_APPLICANT}_FAIL`:
    case `${CREATE_APPLICANT_PUBLIC}_FAIL`:
    case `${UPDATE_APPLICANT_PUBLIC}_FAIL`:
    case `${GET_APPLICANT_PUBLIC}_FAIL`:
    case `${UPDATE_QUESTIONNAIRE}_FAIL`:
    case `${UPDATE_ONBOARDING}_FAIL`:
    case `${DELETE_CHARACTER_REFERENCE}_FAIL`:
    case `${DELETE_DOCUMENTATION}_FAIL`:
    case `${UPDATE_DOCUMENTATION}_FAIL`:
    case `${UPDATE_CHARACTER_REFERENCE}_FAIL`:
    case `${UPDATE_BACKGROUND}_FAIL`:
    case `${UPDATE_FINAL_INTERVIEW}_FAIL`:
    case `${CREATE_TOKEN}_FAIL`:
    case `${UPDATE_EXAM}_FAIL`:
    case `${UPDATE_CRITERIA_POINT}_FAIL`:
    case `${UPDATE_CRITERIA_POINTS}_FAIL`:
    case `${UPDATE_INTERVIEW}_FAIL`:
    case `${UPDATE_APPLICANT}_FAIL`:
    case `${GET_APPLICANT}_FAIL`:
    case `${GET_APPLICANTS}_FAIL`:
    case `${GET_NEW_APPLICANTS}_FAIL`:
      return {
        ...state,
        processing: false,
        updating: false,
        error: action.payload
      };
    // ----
    case `${FAVORITE_APPLICANT}_SUCCESS`:
      return {
        ...state,
        applicant: {
          ...state.applicant,
          ...action.payload
        }
      };
    case `${CREATE_APPLICANT_PUBLIC}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        error: null
      };
    case `${UPDATE_APPLICANT_PUBLIC}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        error: null
      };
    case `${GET_APPLICANT_PUBLIC}_SUCCESS`:
      const cleanedPublic = Object.keys(action.payload)
        .filter(key => action.payload[key])
        .reduce((acc, curr) => {
          return { ...acc, [curr]: action.payload[curr] };
        }, {});

      return {
        ...state,
        applicant: Object.assign({}, INITIAL_STATE.applicant, cleanedPublic),
        processing: false,
        updating: false,
        error: null
      };
    case `${UPDATE_QUESTIONNAIRE}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        applicant: {
          ...state.applicant,
          questionnaire: {
            ...action.payload
          }
        }
      };
    case `${ACCEPTED_JOB_OFFER}_SUCCESS`:
    case `${UPDATE_ONBOARDING}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        applicant: {
          ...state.applicant,
          applicantOnboarding: {
            ...action.payload
          }
        }
      };
    case `${DELETE_CHARACTER_REFERENCE}_SUCCESS`:
      let indexRef = state.applicant.applicantCharacterReferences.findIndex((ref) => ref.id === action.payload.id);
      state.applicant.applicantCharacterReferences.splice(indexRef, 1);

      return {
        ...state,
        processing: false,
        updating: false
      };
    case `${DELETE_DOCUMENTATION}_SUCCESS`:
      let indexDocu = state.applicant.applicantDocumentations.findIndex((docu) => docu.id === action.payload.id);
      state.applicant.applicantDocumentations.splice(indexDocu, 1);

      return {
        ...state,
        processing: false,
        updating: false
      };
    case `${UPDATE_DOCUMENTATION}_SUCCESS`:
      if (!action.payload.insert) {
        let docu = state.applicant.applicantDocumentations.find((docu) => docu.id === action.payload.documentation.id);
        docu.url = action.payload.documentation.url;
      }
      else {
        state.applicant.applicantDocumentations.push(action.payload.documentation);
      }

      return {
        ...state,
        processing: false,
        updating: false
      };
    case `${UPDATE_CHARACTER_REFERENCE}_SUCCESS`:
      if (!action.payload.insert) {
        let index = state.applicant.applicantCharacterReferences.findIndex((ref) => ref.id === action.payload.reference.id);
        state.applicant.applicantCharacterReferences[index] = action.payload.reference;
      }
      else {
        state.applicant.applicantCharacterReferences.push(action.payload.reference);
      }

      return {
        ...state,
        processing: false,
        updating: false
      }
    case `${UPDATE_BACKGROUND}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        applicant: {
          ...state.applicant,
          applicantBackground: {
            ...action.payload
          }
        }
      };
    case `${UPDATE_FINAL_INTERVIEW}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        applicant: {
          ...state.applicant,
          applicantFinalInterview: {
            ...action.payload
          }
        }
      }
    case `${CREATE_TOKEN}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        applicant: {
          ...state.applicant,
          token: action.payload.token
        }
      }
    case `${UPDATE_EXAM}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        applicant: {
          ...state.applicant,
          applicantExam: {
            ...action.payload
          }
        }
      };
    case `${UPDATE_CRITERIA_POINT}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        error: null
      };
    case `${UPDATE_CRITERIA_POINTS}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        applicant: {
          ...state.applicant,
          interview: {
            ...state.applicant.interview,
            criteriaPoints: [
              ...state.applicant.interview.criteriaPoints,
              ...action.payload
            ]
          }
        }
      };
    case `${UPDATE_INTERVIEW}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        applicant: {
          ...state.applicant,
          interview: action.payload
        }
      };
    case `${UPDATE_APPLICANT}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        error: null
      };
    case `${GET_APPLICANT}_SUCCESS`:
      const clean = Object.keys(action.payload)
        .filter(key => action.payload[key])
        .reduce((acc, curr) => {
          return { ...acc, [curr]: action.payload[curr] };
        }, {});

      return {
        ...state,
        applicant: Object.assign({}, INITIAL_STATE.applicant, clean),
        processing: false,
        updating: false,
        error: null
      };
    case `${GET_APPLICANTS}_SUCCESS`:
    case `${GET_NEW_APPLICANTS}_SUCCESS`:
      return {
        ...state,
        applicants: action.payload.data,
        pagination: action.payload.paginatorInfo,
        processing: false,
        updating: false,
        error: null
      };
    default: return state;
  }
}

