import { put, call, getContext } from 'redux-saga/effects'
import { queries } from './examinationQueries';
// Actions   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { GET_EXAMINATIONS } from './examinationTypes';

// reqFunction   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
function* getExaminationsReq(data) {
  const client = yield getContext('client');
  const query = queries.GET_EXAMINATIONS;

  return yield call(client.query, {
    query,
    variables: {
      jobTitle: data.jobTitle,
      level: data.level
    }
  });
}

// exportFuntion   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function* getExaminations({ payload }) {
  try {
     let { data: { examinations } } = yield call(getExaminationsReq, payload)
     yield put({ type: `${GET_EXAMINATIONS}_SUCCESS`, payload: { ...payload, examinations }})
  } catch(e) {
     yield put({ type: `${GET_EXAMINATIONS}_FAIL`, payload: e.response })
  }
}


