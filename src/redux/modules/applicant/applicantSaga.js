import { put, call, getContext } from 'redux-saga/effects'
import { queries } from './applicantQueries';
// Actions   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { ACCEPTED_JOB_OFFER } from './applicantTypes';
import { CREATE_APPLICANT_PUBLIC } from './applicantTypes';
import { FAVORITE_APPLICANT } from './applicantTypes';
import { UPDATE_APPLICANT_PUBLIC } from './applicantTypes';
import { GET_APPLICANT_PUBLIC } from './applicantTypes';
import { UPDATE_QUESTIONNAIRE } from './applicantTypes';
import { UPDATE_ONBOARDING } from './applicantTypes';
import { DELETE_CHARACTER_REFERENCE } from './applicantTypes';
import { DELETE_DOCUMENTATION } from './applicantTypes';
import { UPDATE_DOCUMENTATION } from './applicantTypes';
import { UPDATE_CHARACTER_REFERENCE } from './applicantTypes';
import { UPDATE_BACKGROUND } from './applicantTypes';
import { UPDATE_FINAL_INTERVIEW } from './applicantTypes';
import { CREATE_TOKEN } from './applicantTypes';
import { UPDATE_EXAM } from './applicantTypes';
import { UPDATE_CRITERIA_POINT } from './applicantTypes';
import { UPDATE_CRITERIA_POINTS } from './applicantTypes';
import { UPDATE_INTERVIEW } from './applicantTypes';
import { UPDATE_APPLICANT } from './applicantTypes';
import { GET_APPLICANT } from './applicantTypes';
import { GET_APPLICANTS } from './applicantTypes';
import { GET_NEW_APPLICANTS } from './applicantTypes';

import useQuery from '../../../hooks/useQuery';
import useMutation from '../../../hooks/useMutation';

// reqFunction   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
function* acceptedJobOfferReq(data) {
  return yield call(useMutation, queries.UPDATE_APPLICANT_ONBOARDING, data);
}

function* createApplicantPublicReq(data) {
  return yield call(useMutation, queries.CREATE_APPLICANT_PUBLIC, data);
}

function* favoriteApplicantReq(data) {
  const client = yield getContext('client');
  const mutation = queries.UPDATE_APPLICANT;

  return yield call(client.mutate, { mutation,
    variables: {
      ...data
    }
  });
}

function* updateApplicantPublicReq(data) {
  return yield call(useMutation, queries.UPDATE_APPLICANT_PUBLIC, data);
}

function* getApplicantPublicReq(data) {
  return yield call(useQuery, queries.GET_APPLICANT_PUBLIC, data);
}

function* updateQuestionnaireReq(data) {
  return yield call(useMutation, queries.UPDATE_APPLICANT_QUESTIONNAIRE, data);
}

function* updateOnboardingReq(data) {
  return yield call(useMutation, queries.UPDATE_APPLICANT_ONBOARDING, data);
}

function* deleteCharacterReferenceReq(data) {
  return yield call(useMutation, queries.DELETE_APPLICANT_CHARACTER_REFERENCE, data);
}

function* deleteDocumentationReq(data) {
  return yield call(useMutation, queries.DELETE_APPLICANT_DOCUMENTATION, data);
}

function* updateDocumentationReq(data) {
  return yield call(useMutation, queries.UPDATE_APPLICANT_DOCUMENTATION, data);
}

function* updateCharacterReferenceReq(data) {
  return yield call(useMutation, queries.UPDATE_APPLICANT_CHARACTER_REFERENCE, data);
}

function* updateBackgroundReq(data) {
  return yield call(useMutation, queries.UPDATE_APPLICANT_BACKGROUND, data);
}

function* updateFinalInterviewReq(data) {
  return yield call(useMutation, queries.UPDATE_APPLICANT_FINAL_INTERVIEW, data);
}

function* createTokenReq(data) {
  return yield call(useMutation, queries.CREATE_APPLICANT_TOKEN, data);
}

function* updateExamReq(data) {
  return yield call(useMutation, queries.UPDATE_APPLICANT_EXAM, data);
}

function* updateCriteriaPointReq(data) {
  return yield call(useMutation, queries.UPDATE_CRITERIA_POINT, data);
}

function* updateCriteriaPointsReq(data) {
  return yield call(useMutation, queries.UPDATE_CRITERIA_POINT, data);
}

function* updateInterviewReq(data) {
  return yield call(useMutation, queries.UPDATE_APPLICANT_INTERVIEW, data);
}

function* updateApplicantReq(data) {
  return yield call(useMutation, queries.UPDATE_APPLICANT, data)
}

function* getApplicantReq(data) {
  return yield call(useQuery, queries.GET_APPLICANT, data)
}

const SORT_FIELDS = {
  id: 'ID',
  firstName: 'FIRST_NAME',
  lastName: 'LAST_NAME',
  jobTitle: 'JOB_TITLE',
  source: 'SOURCE',
  appliedAt: 'APPLIED_AT',
  status: 'STATUS',
};

function* getApplicantsReq(data = {}) {

  const variables = {
    page: data.page || 1,
    first: data.first || 10,
    sort: data.sort ? SORT_FIELDS[data.sort.substring(1, data.sort.length)] : 'APPLIED_AT',
    sortOrder: data.sort ? (data.sort.includes('+') ? 'ASC' : 'DESC') : 'DESC',
    search: data.search,
    filter: formatFilters(data.filters)
  };

  return yield call(useQuery, queries.GET_APPLICANTS, variables);
}

// exportFuntion   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function* acceptedJobOffer(action) {
  try {
    const { data: { applicantOnboarding } } = yield call(acceptedJobOfferReq, action.payload)
    yield put({ type: `${ACCEPTED_JOB_OFFER}_SUCCESS`, payload: applicantOnboarding })
  } catch(e) {
    yield put({ type: `${ACCEPTED_JOB_OFFER}_FAIL`, payload: e.response })
  }
}

export function* createApplicantPublic(action) {
  try {
    const { data: { applicant } } = yield call(createApplicantPublicReq, action.payload)
    yield put({ type: `${CREATE_APPLICANT_PUBLIC}_SUCCESS`, payload: applicant })
  } catch(e) {
    yield put({ type: `${CREATE_APPLICANT_PUBLIC}_FAIL`, payload: e.response })
  }
}

export function* favoriteApplicant(action) {
  try {
    const { data: { applicant } } = yield call(favoriteApplicantReq, action.payload)
    yield put({ type: `${FAVORITE_APPLICANT}_SUCCESS`, payload: applicant })
  } catch(e) {
    yield put({ type: `${FAVORITE_APPLICANT}_FAIL`, payload: e.response })
  }
}

export function* updateApplicantPublic(action) {
  try {
    const { data: { applicant } } = yield call(updateApplicantPublicReq, action.payload)
    yield put({ type: `${UPDATE_APPLICANT_PUBLIC}_SUCCESS`, payload: applicant })
  } catch(e) {
    yield put({ type: `${UPDATE_APPLICANT_PUBLIC}_FAIL`, payload: e.response })
  }
}

export function* getApplicantPublic(action) {
  try {
    const { data: { applicant } } = yield call(getApplicantPublicReq, action.payload)
    yield put({ type: `${GET_APPLICANT_PUBLIC}_SUCCESS`, payload: applicant })
  } catch(e) {
    yield put({ type: `${GET_APPLICANT_PUBLIC}_FAIL`, payload: e.response })
  }
}

export function* updateQuestionnaire(action) {
  try {
    const { data: { questionnaire } } = yield call(updateQuestionnaireReq, action.payload)
    yield put({ type: `${UPDATE_QUESTIONNAIRE}_SUCCESS`, payload: questionnaire })
  } catch(e) {
    yield put({ type: `${UPDATE_QUESTIONNAIRE}_FAIL`, payload: e.response })
  }
}

export function* updateOnboarding(action) {
  try {
    const { data: { applicantOnboarding } } = yield call(updateOnboardingReq, action.payload)
    yield put({ type: `${UPDATE_ONBOARDING}_SUCCESS`, payload: applicantOnboarding })
  } catch(e) {
    yield put({ type: `${UPDATE_ONBOARDING}_FAIL`, payload: e.response })
  }
}

export function* deleteCharacterReference(action) {
  try {
    const { data: { id } } = yield call(deleteCharacterReferenceReq, action.payload)
    yield put({ type: `${DELETE_CHARACTER_REFERENCE}_SUCCESS`, payload: id })
  } catch(e) {
    yield put({ type: `${DELETE_CHARACTER_REFERENCE}_FAIL`, payload: e.response })
  }
}

export function* deleteDocumentation(action) {
  try {
    const { data: { id } } = yield call(deleteDocumentationReq, action.payload)
    yield put({ type: `${DELETE_DOCUMENTATION}_SUCCESS`, payload: id })
  } catch(e) {
    yield put({ type: `${DELETE_DOCUMENTATION}_FAIL`, payload: e.response })
  }
}

export function* updateDocumentation(action) {
  try {
    if (Array.isArray(action.payload)) {
      for (let i = 0; i < action.payload.length; i++) {
        const { data: { applicantDocumentation } } = yield call(updateDocumentationReq, action.payload[i])
        yield put({ type: `${UPDATE_DOCUMENTATION}_SUCCESS`, payload: { documentation: applicantDocumentation, insert: false } })
      }
    }
    else {
      const { data: { applicantDocumentation } } = yield call(updateDocumentationReq, action.payload)
      yield put({ type: `${UPDATE_DOCUMENTATION}_SUCCESS`, payload: { documentation: applicantDocumentation, insert: !action.payload.id } })
    }
  } catch(e) {
    yield put({ type: `${UPDATE_DOCUMENTATION}_FAIL`, payload: e.response })
  }
}

export function* updateCharacterReference(action) {
  try {
    if (Array.isArray(action.payload)) {
      for (let i = 0; i <action.payload.length; i++) {
        const { data: { applicantCharacterReference } } = yield call(updateCharacterReferenceReq, action.payload[i])
        yield put({ type: `${UPDATE_CHARACTER_REFERENCE}_SUCCESS`, payload: { reference: applicantCharacterReference, insert: false } })
      }
    }
    else {
      const { data: { applicantCharacterReference } } = yield call(updateCharacterReferenceReq, action.payload)
      yield put({ type: `${UPDATE_CHARACTER_REFERENCE}_SUCCESS`, payload: { reference: applicantCharacterReference, insert: !action.payload.id } })
    }
  } catch(e) {
    yield put({ type: `${UPDATE_CHARACTER_REFERENCE}_FAIL`, payload: e.response })
  }
}

export function* updateBackground(action) {
  try {
    const { data: { applicantBackground } }  = yield call(updateBackgroundReq, action.payload)
    yield put({ type: `${UPDATE_BACKGROUND}_SUCCESS`, payload: applicantBackground })
  } catch(e) {
    yield put({ type: `${UPDATE_BACKGROUND}_FAIL`, payload: e.response })
  }
}

export function* updateFinalInterview(action) {
  try {
    const { data: { applicantFinalInterview } } = yield call(updateFinalInterviewReq, action.payload)
    yield put({ type: `${UPDATE_FINAL_INTERVIEW}_SUCCESS`, payload: applicantFinalInterview })
  } catch(e) {
    yield put({ type: `${UPDATE_FINAL_INTERVIEW}_FAIL`, payload: e.response })
  }
}

export function* createToken(action) {
  try {
    const { data: { token } } = yield call(createTokenReq, action.payload)
    yield put({ type: `${CREATE_TOKEN}_SUCCESS`, payload: token })
  } catch(e) {
    yield put({ type: `${CREATE_TOKEN}_FAIL`, payload: e.response })
  }
}

export function* updateExam(action) {
  try {
    const { data: { applicantExam }  } = yield call(updateExamReq, action.payload)
    yield put({ type: `${UPDATE_EXAM}_SUCCESS`, payload: applicantExam })
  } catch(e) {
    yield put({ type: `${UPDATE_EXAM}_FAIL`, payload: e.response })
  }
}

export function* updateCriteriaPoint(action) {
  try {
    yield call(updateCriteriaPointReq, action.payload)
  } catch(e) {
    yield put({ type: `${UPDATE_CRITERIA_POINT}_FAIL`, payload: e.response })
  }
}

export function* updateCriteriaPoints(action) {
  try {
    let criteriaPoints = []
    for (let i = 0; i < action.payload.criteriaPoints.length; i++ ){
      const { data: { criteriaPoint } } = yield call(updateCriteriaPointsReq, action.payload.criteriaPoints[i])
      criteriaPoints.push(criteriaPoint);
    }

    yield put({ type: `${UPDATE_CRITERIA_POINTS}_SUCCESS`, payload: criteriaPoints });
  } catch(e) {
    yield put({ type: `${UPDATE_CRITERIA_POINTS}_FAIL`, payload: e.response })
  }
}

export function* updateInterview(action) {
  try {
    const { data: { interview } } = yield call(updateInterviewReq, action.payload)

    yield put({ type: `${UPDATE_INTERVIEW}_SUCCESS`, payload: interview });
  } catch(e) {
    yield put({ type: `${UPDATE_INTERVIEW}_FAIL`, payload: e.response })
  }
}

export function* updateApplicant(action) {
  try {
    const { data: { applicant } } =  yield call(updateApplicantReq, action.payload);

    if (!action.payload.id) {
      applicant.new = true;
    }

    yield put({ type: `${GET_APPLICANT}_SUCCESS`, payload: applicant })
  } catch(e) {
     yield put({ type: `${UPDATE_APPLICANT}_FAIL`, payload: e.response })
  }
}

export function* getApplicant(action) {
  try {
    const { data: { applicant } } = yield call(getApplicantReq, action.payload);

    yield put({ type: `${GET_APPLICANT}_SUCCESS`, payload: applicant })
  } catch(error) {
    yield put({ type: `${GET_APPLICANT}_FAIL`, payload: error })
  }
}

export function* getApplicants(action) {
  try {
    const { data: { applicants } } = yield call(getApplicantsReq, action.payload);
    yield put({ type: `${GET_APPLICANTS}_SUCCESS`, payload: applicants })
  } catch (error) {
    yield put({ type: `${GET_APPLICANTS}_FAIL`, payload: error })
  }
}

export function* getNewApplicants(action) {
  try {
    let { data: { applicants } } = yield call(getApplicantsReq, action.payload)
    yield put({ type: `${GET_NEW_APPLICANTS}_SUCCESS`, payload: applicants })
  } catch(e) {
    yield put({ type: `${GET_NEW_APPLICANTS}_FAIL`, payload: e.response })
  }
}

const formatFilters = (rawFilters) => {
  let filters = {};

  if (rawFilters) {
    // map variable we use to API properties
    const filterKeys = {
      jobTitles: 'byJobTitle',
      sources: 'bySource',
      statuses: 'byStatus',
    };

    Object.keys(filterKeys).forEach((key) => {
      if (rawFilters[key]?.length) {
        filters = {
          ...filters,
          [filterKeys[key]]: rawFilters[key].map(i => +i.key)
        }
      }
    });

    if (rawFilters.appliedAt?.start) {
      filters = {
        ...filters,
        byAppliedAt: {
          ...filters.byAppliedAt,
          start: rawFilters.appliedAt.start
        }
      };
    }

    if (rawFilters.appliedAt?.end) {
      filters = {
        ...filters,
        byAppliedAt: {
          ...filters.byAppliedAt,
          end: rawFilters.appliedAt.end
        }
      };
    }
  }

  return filters;
}
