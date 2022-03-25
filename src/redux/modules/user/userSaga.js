import { put, call, getContext } from 'redux-saga/effects';
import { queries } from './userQueries';
// Actions   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { USER_GET } from './userTypes';

// reqFunction   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
function* userGetReq(data) {
  const client = yield getContext('client');
  const query = queries.USER;
  return yield call(client.query, { query, variables: { "id": data.id } });
}

// exportFuntion   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function* userGet(action) {
  try {
    const { data: { user } } = yield call(userGetReq, action.payload);
    yield put({ type: `${USER_GET}_SUCCESS`, payload: user })
  } catch(error) {
    yield put({ type: `${USER_GET}_FAIL`, payload: error })
  }
}


