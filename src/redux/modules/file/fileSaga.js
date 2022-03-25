import { put, call } from 'redux-saga/effects'
import { queries } from './fileQueries';
// Actions   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { UPLOAD } from './fileTypes';

import useMutation from '../../../hooks/useMutation';

// reqFunction   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
function* uploadReq(data) {
  return yield call(useMutation, queries.UPLOAD, { file: data.file });
}

// exportFuntion   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function* upload(action) {
  try {
    const { data: { filename } } = yield call(uploadReq, action.payload)
    yield put({ type: `${UPLOAD}_SUCCESS`, payload: { filename, name: action.payload.name } });
  } catch(e) {
    yield put({ type: `${UPLOAD}_FAIL`, payload: e.response })
  }
}


