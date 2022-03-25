// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { CREATE_EMPLOYEE_TRAINING_TOPICS } from './employeeTypes';
import { UPDATE_EMPLOYEE_TRAINING } from './employeeTypes';
import { GET_EMPLOYEE_TRAININGS } from './employeeTypes';
import { CREATE_EMPLOYEE_TRAINING_HISTORY } from './employeeTypes';
import { GET_EMPLOYEES } from './employeeTypes';

// Action Creators   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function createEmployeeTrainingTopics(data) {
  return { type: CREATE_EMPLOYEE_TRAINING_TOPICS , payload: data };
}

export function updateEmployeeTraining(data) {
  return { type: UPDATE_EMPLOYEE_TRAINING , payload: data };
}

export function getEmployeeTrainings(data) {
  return { type: GET_EMPLOYEE_TRAININGS , payload: data };
}

export function createEmployeeTrainingHistory(data) {
  return { type: CREATE_EMPLOYEE_TRAINING_HISTORY , payload: data };
}

export function getEmployees(data) {
  return { type: GET_EMPLOYEES , payload: data };
}

