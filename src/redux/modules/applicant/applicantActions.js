// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
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

// Action Creators   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function acceptedJobOffer(data) {
  return { type: ACCEPTED_JOB_OFFER , payload: data };
}

export function createApplicantPublic(data) {
  return { type: CREATE_APPLICANT_PUBLIC , payload: data };
}

export function favoriteApplicant(data) {
  return { type: FAVORITE_APPLICANT , payload: data };
}

export function getNewApplicants(data) {
  return { type: GET_NEW_APPLICANTS , payload: data };
}

export function updateApplicantPublic(data) {
  return { type: UPDATE_APPLICANT_PUBLIC , payload: data };
}

export function getApplicantPublic(data) {
  return { type: GET_APPLICANT_PUBLIC , payload: data };
}

export function updateQuestionnaire(data) {
  return { type: UPDATE_QUESTIONNAIRE , payload: data };
}

export function updateOnboarding(data) {
  return { type: UPDATE_ONBOARDING , payload: data };
}

export function deleteCharacterReference(data) {
  return { type: DELETE_CHARACTER_REFERENCE , payload: data };
}

export function deleteDocumentation(data) {
  return { type: DELETE_DOCUMENTATION , payload: data };
}

export function updateDocumentation(data) {
  return { type: UPDATE_DOCUMENTATION , payload: data };
}

export function updateCharacterReference(data) {
  return { type: UPDATE_CHARACTER_REFERENCE , payload: data };
}

export function updateBackground(data) {
  return { type: UPDATE_BACKGROUND , payload: data };
}

export function updateFinalInterview(data) {
  return { type: UPDATE_FINAL_INTERVIEW , payload: data };
}

export function createToken(data) {
  return { type: CREATE_TOKEN , payload: data };
}

export function updateExam(data) {
  return { type: UPDATE_EXAM , payload: data };
}

export function updateCriteriaPoint(data) {
  return { type: UPDATE_CRITERIA_POINT , payload: data };
}

export function updateCriteriaPoints(data) {
  return { type: UPDATE_CRITERIA_POINTS , payload: data };
}

export function updateInterview(data) {
  return { type: UPDATE_INTERVIEW , payload: data };
}

export function updateApplicant(data) {
  return { type: UPDATE_APPLICANT , payload: data };
}

export function getApplicant(data) {
  return { type: GET_APPLICANT , payload: data };
}

export function getApplicants(data) {
  return { type: GET_APPLICANTS , payload: data };
}

