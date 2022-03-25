// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { GET_CONSTANTS_PUBLIC } from './constantsTypes';
import { GET_CONSTANTS } from './constantsTypes';

const initialState = {
  jobTitles: [],
  levels: [],
  sources: [],
  statuses: [],
  validities: [],
  maritalStatuses: [],
  educationalAttainments: [],
  yearsExperiences: [],
  compensationPackages: [],
  examRatings: [],
  examinations: [],
  finalInterviewRatings: [],
  finalInterviewerRatings: [],
  requirements: [],
  cached: false,
  publicCached: false,
};

// Reducer   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_CONSTANTS_PUBLIC:
      // Perform action
      return state;
    case `${GET_CONSTANTS_PUBLIC}_SUCCESS`:
      return Object.keys(initialState).reduce((acc, current) => {
        if (current === 'examinations') {
          return {
            ...acc,
            [current]: action.payload[current]
          };
        }
        else if (Array.isArray(action.payload[current])) {
          return {
            ...acc,
            [current]: toKeyValuePair(action.payload[current])
          };
        }
        else {
          return acc;
        }
      }, {publicCached: true});
    case `${GET_CONSTANTS_PUBLIC}_FAIL`:
      // Perform action
      return state;
    case GET_CONSTANTS:
      // Perform action
      return state;
    case `${GET_CONSTANTS}_SUCCESS`:
      return Object.keys(initialState).reduce((acc, current) => {
        if (current === 'examinations') {
          return {
            ...acc,
            [current]: action.payload[current]
          };
        }
        else if (Array.isArray(action.payload[current])) {
          return {
            ...acc,
            [current]: toKeyValuePair(action.payload[current])
          };
        }
        else {
          return acc;
        }
      }, {cached: true});
    case `${GET_CONSTANTS}_FAIL`:
      // Perform action
      return state;
    default: return state;
  }
}

const toKeyValuePair = (array = [], key = 'id', value = 'name') => {
  return array.map((i) => {
    return {
      key: i[key],
      value: i[value]
    };
  });
};
