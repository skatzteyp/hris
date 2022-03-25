import { put, call, getContext } from 'redux-saga/effects';
import { queries } from './constantsQueries';
// Actions   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { GET_CONSTANTS_PUBLIC } from './constantsTypes';
import { GET_CONSTANTS } from './constantsTypes';

// reqFunction   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
function* getConstantsPublicReq(data) {
  const client = yield getContext('client');
  const query = queries.GET_CONSTANTS_PUBLIC;

  return yield call(client.query, { query });
}

function* getConstantsReq(data) {
  const client = yield getContext('client');
  const query = queries.GET_CONSTANTS;

  return yield call(client.query, { query });
}


// exportFuntion   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function* getConstantsPublic(action) {
  try {
    let response = yield call(getConstantsPublicReq, action.payload)
    yield put({ type: `${GET_CONSTANTS_PUBLIC}_SUCCESS`, payload: response.data })
  } catch(e) {
    yield put({ type: `${GET_CONSTANTS_PUBLIC}_FAIL`, payload: e.response })
  }
}

export function* getConstants() {
  try {
    let response = yield call(getConstantsReq)
    yield put({ type: `${GET_CONSTANTS}_SUCCESS`, payload: response.data })
  } catch(e) {
    yield put({ type: `${GET_CONSTANTS}_FAIL`, payload: e.response })
  }
}
