import { put, call } from 'redux-saga/effects'
import { queries } from './interviewCriteriaQueries';
// Actions   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { DELETE_INTERVIEW_CRITERIA } from './interviewCriteriaTypes';
import { ADD_INTERVIEW_CRITERIA } from './interviewCriteriaTypes';
import { UPDATE_INTERVIEW_CRITERIA } from './interviewCriteriaTypes';
import { UPDATE_INTERVIEW_CRITERIAS } from './interviewCriteriaTypes';
import { GET_INTERVIEW_CRITERIAS } from './interviewCriteriaTypes';

import useQuery from '../../../hooks/useQuery';
import useMutation from '../../../hooks/useMutation';

// reqFunction   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
function* deleteInterviewCriteriaReq(data) {
  return yield call(useMutation, queries.DELETE_INTERVIEW_CRITERIA, data);
}

function* addInterviewCriteriaReq(data) {
  return yield call(useMutation, queries.ADD_INTERVIEW_CRITERIA, data);
}

function* updateInterviewCriteriaReq(data) {
  return yield call(useMutation, queries.UPDATE_INTERVIEW_CRITERIA, data);
}

function* getInterviewCriteriasReq(data) {
  return yield call(useQuery, queries.GET_INTERVIEW_CRITERIAS);
}


// exportFuntion   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function* deleteInterviewCriteria(action) {
  try {
    const { data: { interviewCriteria } } = yield call(deleteInterviewCriteriaReq, action.payload)
    yield put({ type: `${DELETE_INTERVIEW_CRITERIA}_SUCCESS`, payload: interviewCriteria })
  } catch(e) {
    yield put({ type: `${DELETE_INTERVIEW_CRITERIA}_FAIL`, payload: e.response })
  }
}

export function* addInterviewCriteria(action) {
  try {
    const { data: { interviewCriteria } } = yield call(addInterviewCriteriaReq, action.payload)
    yield put({ type: `${ADD_INTERVIEW_CRITERIA}_SUCCESS`, payload: interviewCriteria })
  } catch(e) {
    yield put({ type: `${ADD_INTERVIEW_CRITERIA}_FAIL`, payload: e.response })
  }
}

export function* updateInterviewCriteria(action) {
  try {
    const { data: { interviewCriteria } } = yield call(updateInterviewCriteriaReq, action.payload)
    yield put({ type: `${UPDATE_INTERVIEW_CRITERIA}_SUCCESS`, payload: interviewCriteria })
  } catch(e) {
    yield put({ type: `${UPDATE_INTERVIEW_CRITERIA}_FAIL`, payload: e.response })
  }
}

export function* updateInterviewCriterias(action) {
  try {
    for(let i = 0; i < action.payload.length; i++) {
      yield call(updateInterviewCriteria, { payload: action.payload[i] });
    }
  } catch(e) {
    yield put({ type: `${UPDATE_INTERVIEW_CRITERIAS}_FAIL`, payload: e.response })
  }
}

export function* getInterviewCriterias(action) {
  try {
     let response = yield call(getInterviewCriteriasReq, action.payload)
     yield put({ type: `${GET_INTERVIEW_CRITERIAS}_SUCCESS`, payload: response.data })
  } catch(e) {
     yield put({ type: `${GET_INTERVIEW_CRITERIAS}_FAIL`, payload: e.response })
  }
}


