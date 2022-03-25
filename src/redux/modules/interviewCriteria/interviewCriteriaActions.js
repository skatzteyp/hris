// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { DELETE_INTERVIEW_CRITERIA } from './interviewCriteriaTypes';
import { ADD_INTERVIEW_CRITERIA } from './interviewCriteriaTypes';
import { UPDATE_INTERVIEW_CRITERIA } from './interviewCriteriaTypes';
import { UPDATE_INTERVIEW_CRITERIAS } from './interviewCriteriaTypes';
import { GET_INTERVIEW_CRITERIAS } from './interviewCriteriaTypes';

// Action Creators   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function deleteInterviewCriteria(data) {
  return { type: DELETE_INTERVIEW_CRITERIA , payload: data };
}

export function addInterviewCriteria(data) {
  return { type: ADD_INTERVIEW_CRITERIA , payload: data };
}

export function updateInterviewCriteria(data) {
  return { type: UPDATE_INTERVIEW_CRITERIA , payload: data };
}

export function updateInterviewCriterias(data) {
  return { type: UPDATE_INTERVIEW_CRITERIAS , payload: data };
}

export function getInterviewCriterias(data) {
  return { type: GET_INTERVIEW_CRITERIAS , payload: data };
}

