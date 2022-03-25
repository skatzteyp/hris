import { put, call } from 'redux-saga/effects'
import { queries } from './applicantReportQueries'
import useQuery from '../../../hooks/useQuery';

// Actions   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { APPLICANT_REPORT } from './applicantReportTypes';

// reqFunction   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
function* applicantReportReq(data) {
  return yield call(useQuery, queries.GET_APPLICATION_REPORT_QUERY, data);
}


// exportFuntion   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function* applicantReport(action) {
  try {
    const { data: { applicantReport } } = yield call(applicantReportReq, action.payload)
    yield put({ type: `${APPLICANT_REPORT}_SUCCESS`, payload: applicantReport })
  } catch(e) {
    yield put({ type: `${APPLICANT_REPORT}_FAIL`, payload: e.response })
  }
}


