import { put, call } from 'redux-saga/effects'
import { queries } from './trainingCurriculumQueries';

import useQuery from '../../../hooks/useQuery';
import useMutation from '../../../hooks/useMutation';

// Actions   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { DELETE_TRAINING_CURRICULUM_TOPIC } from './trainingCurriculumTypes';
import { ADD_TRAINING_CURRICULUM_TOPIC } from './trainingCurriculumTypes';
import { GET_TRAINING_CURRICULUM } from './trainingCurriculumTypes';
import { RESET_TRAINING_CURRICULUM } from './trainingCurriculumTypes';
import { UPSERT_TRAINING_CURRICULUM } from './trainingCurriculumTypes';
import { GET_TRAINING_CURRICULUMS } from './trainingCurriculumTypes';

// reqFunction   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
function* deleteTrainingCurriculumTopicReq(data) {
  return yield call(useMutation, queries.DELETE_TRAINING_CURRICULUM_TOPIC, data);
}

function* addTrainingCurriculumTopicReq(data) {
  return yield call(useMutation, queries.ADD_TRAINING_CURRICULUM_TOPIC, data);
}

function* getTrainingCurriculumReq(data) {
  return yield call(useQuery, queries.GET_TRAINING_CURRICULUM, data);
}

function* upsertTrainingCurriculumReq(data) {
  return yield call(useMutation, queries.UPSERT_TRAINING_CURRICULUM, data);
}

function* getTrainingCurriculumsReq(data) {
  return yield call(useQuery, queries.GET_TRAINING_CURRICULUMS, data);
}

// exportFuntion   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function* deleteTrainingCurriculumTopic(action) {
  try {
    const { data: { deleteTrainingCurriculumTopic} } = yield call(deleteTrainingCurriculumTopicReq, action.payload);
    yield put({ type: `${DELETE_TRAINING_CURRICULUM_TOPIC}_SUCCESS`, payload: deleteTrainingCurriculumTopic })
  } catch(e) {
    yield put({ type: `${DELETE_TRAINING_CURRICULUM_TOPIC}_FAIL`, payload: e.response })
  }
}

export function* addTrainingCurriculumTopic(action) {
  try {
    const { data: { upsertTrainingCurriculumTopic} } = yield call(addTrainingCurriculumTopicReq, action.payload);
    yield put({ type: `${ADD_TRAINING_CURRICULUM_TOPIC}_SUCCESS`, payload: upsertTrainingCurriculumTopic })
  } catch(e) {
    yield put({ type: `${ADD_TRAINING_CURRICULUM_TOPIC}_FAIL`, payload: e.response })
  }
}

export function* getTrainingCurriculum(action) {
  try {
    const { data: { getTrainingCurriculum } } = yield call(getTrainingCurriculumReq, action.payload);
    yield put({ type: `${GET_TRAINING_CURRICULUM}_SUCCESS`, payload: getTrainingCurriculum })
  } catch(e) {
    yield put({ type: `${GET_TRAINING_CURRICULUM}_FAIL`, payload: e.response })
  }
}

export function* resetTrainingCurriculum() {
  yield put({ type: `${RESET_TRAINING_CURRICULUM}_SUCCESS`})
}

export function* upsertTrainingCurriculum(action) {
  try {
    const { data: { upsertTrainingCurriculum } } = yield call(upsertTrainingCurriculumReq, action.payload);
    yield put({ type: `${UPSERT_TRAINING_CURRICULUM}_SUCCESS`, payload: upsertTrainingCurriculum })
  } catch(e) {
    yield put({ type: `${UPSERT_TRAINING_CURRICULUM}_FAIL`, payload: e.response })
  }
}

export function* getTrainingCurriculums(action) {
  try {
     const { data: { getTrainingCurriculums } } = yield call(getTrainingCurriculumsReq, action.payload);
    yield put({ type: `${GET_TRAINING_CURRICULUMS}_SUCCESS`, payload: getTrainingCurriculums })
  } catch(e) {
    yield put({ type: `${GET_TRAINING_CURRICULUMS}_FAIL`, payload: e.response })
  }
}


