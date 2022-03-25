import { put, call, getContext } from 'redux-saga/effects';
import { queries } from './employeeQueries';
// Actions   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { CREATE_EMPLOYEE_TRAINING_TOPICS } from './employeeTypes';
import { UPDATE_EMPLOYEE_TRAINING } from './employeeTypes';
import { GET_EMPLOYEE_TRAININGS } from './employeeTypes';
import { CREATE_EMPLOYEE_TRAINING_HISTORY } from './employeeTypes';
import { GET_EMPLOYEES } from './employeeTypes';

import useQuery from '../../../hooks/useQuery';
import useMutation from '../../../hooks/useMutation';

// reqFunction   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
function* createEmployeeTrainingTopicsReq(data) {
  return yield call(useMutation, queries.CREATE_EMPLOYEE_TRAINING_TOPICS, data)
}

function* updateEmployeeTrainingReq(data) {
  return yield call(useMutation, queries.UPDATE_EMPLOYEE_TRAINING, data)
}

function* getEmployeeTrainingsReq(data) {
  return yield call(useQuery, queries.GET_EMPLOYEE_TRAININGS, data)
}

function* createEmployeeTrainingHistoryReq(data) {
  return yield call(useMutation, queries.CREATE_EMPLOYEE_TRAINING, data)
}

function* getEmployeesReq(data) {
  const client = yield getContext('client');
  const query = queries.GET_EMPLOYEES;

  return yield call(client.query, { query });
}


// exportFuntion   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function* createEmployeeTrainingTopics(action) {
  try {
    const { data: { upsertEmployeeTraining } } = yield call(createEmployeeTrainingTopicsReq, action.payload)
    yield put({ type: `${CREATE_EMPLOYEE_TRAINING_TOPICS}_SUCCESS`, payload: upsertEmployeeTraining })
  } catch(e) {
    yield put({ type: `${CREATE_EMPLOYEE_TRAINING_TOPICS}_FAIL`, payload: e.response })
  }
}

export function* updateEmployeeTraining(action) {
  try {
    const { data: { employeeTraining } } = yield call(updateEmployeeTrainingReq, action.payload)
    yield put({ type: `${UPDATE_EMPLOYEE_TRAINING}_SUCCESS`, payload: employeeTraining })
  } catch (e) {
    console.log(e);
    yield put({ type: `${UPDATE_EMPLOYEE_TRAINING}_FAIL`, payload: e.response })
  }
}

export function* getEmployeeTrainings(action) {
  try {
    const { data: { employeeTrainings } } = yield call(getEmployeeTrainingsReq, action.payload)
    yield put({ type: `${GET_EMPLOYEE_TRAININGS}_SUCCESS`, payload: employeeTrainings })
  } catch(e) {
    console.log(e);
    yield put({ type: `${GET_EMPLOYEE_TRAININGS}_FAIL`, payload: e.response })
  }
}

export function* createEmployeeTrainingHistory(action) {
  try {
    const { data: { employeeTrainingHistory } } = yield call(createEmployeeTrainingHistoryReq, action.payload)
    yield put({ type: `${CREATE_EMPLOYEE_TRAINING_HISTORY}_SUCCESS`, payload: employeeTrainingHistory })
  } catch(e) {
    yield put({ type: `${CREATE_EMPLOYEE_TRAINING_HISTORY}_FAIL`, payload: e.response })
  }
}

export function* getEmployees(action) {
  try {
    const { data: { employees } } = yield call(getEmployeesReq, action.payload)
    yield put({ type: `${GET_EMPLOYEES}_SUCCESS`, payload: employees })
  } catch(e) {
    yield put({ type: `${GET_EMPLOYEES}_FAIL`, payload: e.response })
  }
}


