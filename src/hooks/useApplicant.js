import { useEffect } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import {
  getApplicant,
  updateApplicant,
  updateCriteriaPoint,
  updateCriteriaPoints,
  updateInterview,
  updateExam,
  createToken,
  updateFinalInterview,
  updateBackground,
  updateDocumentation,
  deleteDocumentation,
  updateCharacterReference,
  deleteCharacterReference,
  updateOnboarding,
  getApplicantPublic,
  updateApplicantPublic,
  // favoriteApplicant
} from '../redux/modules/applicant/applicantActions';

export default (id, token = '') => {
  const dispatch = useDispatch();
  const { applicant, processing, updating } = useSelector(state => state.applicant);

  useEffect(() => {
    if (id && id !== applicant.id && id !== 'new') {
      if (token) {
        dispatch(getApplicantPublic({ id, token }));
      }
      else {
        dispatch(getApplicant({ id }));
      }
    }
  }, [ applicant, id, dispatch, token ]);

  return {
    applicant,
    processing,
    updating,
    updateApplicant(data) {
      data.id = applicant.id;
      dispatch(updateApplicant(data));
    },
    updateCriteriaPoint(data) {
      dispatch(updateCriteriaPoint(data));
    },
    updateCriteriaPoints(data) {
      data.applicantId = applicant.id;
      dispatch(updateCriteriaPoints(data));
    },
    updateInterview(data) {
      data.id = applicant.interview.id;
      dispatch(updateInterview(data));
    },
    updateExam(data) {
      data.id = applicant.applicantExam.id;
      dispatch(updateExam(data));
    },
    createToken() {
      const data = {
        applicantId: applicant.id,
        expiredDate: moment().add(2, 'hours').format('YYYY-MM-DD HH:mm:ss')
      };
      dispatch(createToken(data));
    },
    updateFinalInterview(data) {
      data.id = applicant.applicantFinalInterview.id;
      dispatch(updateFinalInterview(data));
    },
    updateBackground(data) {
      data.id = applicant.applicantBackground.id;
      dispatch(updateBackground(data));
    },
    updateDocumentation(data) {
      if (!Array.isArray(data)) {
        data.applicantId = applicant.id;
      }

      dispatch(updateDocumentation(data));
    },
    deleteDocumentation(data) {
      dispatch(deleteDocumentation(data));
    },
    updateCharacterReference(data) {
      if (!Array.isArray(data)) {
        data.applicantId = applicant.id;
      }

      dispatch(updateCharacterReference(data));
    },
    deleteCharacterReference(data) {
      dispatch(deleteCharacterReference(data));
    },
    updateOnboarding(data) {
      data.id = applicant.applicantOnboarding.id;
      dispatch(updateOnboarding(data));
    },
    updateApplicantPublic(data) {
      dispatch(updateApplicantPublic(data));
    },
    // favoriteApplicant(data) {
    //   dispatch(favoriteApplicant(data));
    // }

  };
}
