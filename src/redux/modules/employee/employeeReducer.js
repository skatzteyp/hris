// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { CREATE_EMPLOYEE_TRAINING_TOPICS } from './employeeTypes';
import { UPDATE_EMPLOYEE_TRAINING } from './employeeTypes';
import { GET_EMPLOYEE_TRAININGS } from './employeeTypes';
import { CREATE_EMPLOYEE_TRAINING_HISTORY } from './employeeTypes';
import { GET_EMPLOYEES } from './employeeTypes';

const initialState = {
  employees: [],
  employee: {
    employeeTraining: {
        training: [],
        video: {},
        slideshow: {},
        handsOn: {},
        trainingHistories: [],
    },
  },
  employeeTrainingHistory: {},
  employeeTrainingTopic: {},
  processing: false,
  updating: false,
  cached: false
};

// Reducer   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_EMPLOYEE_TRAINING_TOPICS:
    case GET_EMPLOYEES:
    case GET_EMPLOYEE_TRAININGS:
    case CREATE_EMPLOYEE_TRAINING_HISTORY:
    case UPDATE_EMPLOYEE_TRAINING:
      // Perform action
      return state;
    case `${UPDATE_EMPLOYEE_TRAINING}_SUCCESS`:
      // Perform action
        if (state.employee.employeeTrainings.length > 0) {
          //check if data exists already and get Index
          const check = state.employee.employeeTrainings.findIndex(
            (t) => t.id === action.payload.id);
          if (check >= 0) {
            //update data by index
            state.employee.employeeTrainings[check] = action.payload;
          }
        }

      return {
        ...state,
        processing: false,
        updating: false,
        employeeTrainingTopic: { ...state.employeeTrainingTopic, completionLevel: action.payload.completionLevel },
        employee: {
          ...state.employee,
          employeeTraining: action.payload,
        }
      };
    case `${GET_EMPLOYEE_TRAININGS}_SUCCESS`:
      // Perform action
      // console.log('action.payload', action.payload);
      return {
        ...state,
        processing: false,
        updating: false,
        employee: {
          employeeTrainings: action.payload,
        }
      };
    case `${CREATE_EMPLOYEE_TRAINING_HISTORY}_SUCCESS`:
      // Perform action
      return {
        ...state,
        employeeTrainingHistory: action.payload,
        prcessing: false,
        updating: false
      };
    case `${GET_EMPLOYEES}_SUCCESS`:
      return {
        ...state,
        employees: action.payload,
        cached: true
      };
    case `${CREATE_EMPLOYEE_TRAINING_TOPICS}_SUCCESS`:
      return {
        ...state,
        employeeTrainingTopic: action.payload,
        prcessing: false,
        updating: false
      };
    case `${CREATE_EMPLOYEE_TRAINING_TOPICS}_FAIL`:
    case `${GET_EMPLOYEES}_FAIL`:
    case `${CREATE_EMPLOYEE_TRAINING_HISTORY}_FAIL`:
    case `${GET_EMPLOYEE_TRAININGS}_FAIL`:
    case `${UPDATE_EMPLOYEE_TRAINING}_FAIL`:
      // Perform action
      return state;
    default: return state;
  }
}

