import { all, takeLatest, setContext } from 'redux-saga/effects';
import { client } from './../utils/apollo';

// actionTypes   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { CREATE_EMPLOYEE_TRAINING_TOPICS  } from './modules/employee/employeeTypes.js';
import { CREATE_TRAINING_IMPORT_CSV_QUESTIONS  } from './modules/training/trainingTypes.js';
import { RESET_TRAINING_LIST  } from './modules/training/trainingTypes.js';
import { DELETE_TRAINING  } from './modules/training/trainingTypes.js';
import { DELETE_TRAINING_QUESTION  } from './modules/training/trainingTypes.js';
import { DELETE_TRAINING_CHOICE  } from './modules/training/trainingTypes.js';
import { DELETE_TRAINING_CURRICULUM_TOPIC  } from './modules/trainingCurriculum/trainingCurriculumTypes.js';
import { ADD_TRAINING_CURRICULUM_TOPIC  } from './modules/trainingCurriculum/trainingCurriculumTypes.js';
import { GET_TRAINING_CURRICULUM  } from './modules/trainingCurriculum/trainingCurriculumTypes.js';
import { RESET_TRAINING_CURRICULUM  } from './modules/trainingCurriculum/trainingCurriculumTypes.js';
import { UPSERT_TRAINING_CURRICULUM  } from './modules/trainingCurriculum/trainingCurriculumTypes.js';
import { GET_TRAINING_CURRICULUMS  } from './modules/trainingCurriculum/trainingCurriculumTypes.js';
import { UPDATE_EMPLOYEE_TRAINING  } from './modules/employee/employeeTypes.js';
import { GET_EMPLOYEE_TRAININGS  } from './modules/employee/employeeTypes.js';
import { CREATE_EMPLOYEE_TRAINING_HISTORY  } from './modules/employee/employeeTypes.js';
import { DELETE_INTERVIEW_CRITERIA  } from './modules/interviewCriteria/interviewCriteriaTypes.js';
import { ADD_INTERVIEW_CRITERIA  } from './modules/interviewCriteria/interviewCriteriaTypes.js';
import { UPDATE_INTERVIEW_CRITERIA  } from './modules/interviewCriteria/interviewCriteriaTypes.js';
import { UPDATE_INTERVIEW_CRITERIAS  } from './modules/interviewCriteria/interviewCriteriaTypes.js';
import { DELETE_CATEGORY_BY_TRAINING  } from './modules/training/trainingTypes.js';
import { GET_LIST_OF_TRAINING_CATEGORIES  } from './modules/training/trainingTypes.js';
import { UPDATE_TRAINING_CATEGORY  } from './modules/training/trainingTypes.js';
import { UPDATE_CATEGORY_BY_TRAINING  } from './modules/training/trainingTypes.js';
import { GET_TRAINING_QUESTION  } from './modules/training/trainingTypes.js';
import { UPDATE_TRAINING_CHOICE  } from './modules/training/trainingTypes.js';
import { UPDATE_TRAINING_EXAM  } from './modules/training/trainingTypes.js';
import { UPDATE_TRAINING_QUESTION  } from './modules/training/trainingTypes.js';
import { UPDATE_TRAINING_HANDS_ON  } from './modules/training/trainingTypes.js';
import { UPDATE_TRAINING_SLIDE_SHOW  } from './modules/training/trainingTypes.js';
import { UPDATE_TRAINING_VIDEO  } from './modules/training/trainingTypes.js';
import { UPDATE_TRAINING  } from './modules/training/trainingTypes.js';
import { GET_TRAINING  } from './modules/training/trainingTypes.js';
import { GET_TRAININGS  } from './modules/training/trainingTypes.js';
import { ACCEPTED_JOB_OFFER  } from './modules/applicant/applicantTypes.js';
import { UPLOAD  } from './modules/file/fileTypes.js';
import { CREATE_APPLICANT_PUBLIC  } from './modules/applicant/applicantTypes.js';
import { FAVORITE_APPLICANT  } from './modules/applicant/applicantTypes.js';
import { GET_NEW_APPLICANTS  } from './modules/applicant/applicantTypes.js';
import { UPDATE_APPLICANT_PUBLIC  } from './modules/applicant/applicantTypes.js';
import { GET_CONSTANTS_PUBLIC  } from './modules/constants/constantsTypes.js';
import { GET_APPLICANT_PUBLIC  } from './modules/applicant/applicantTypes.js';
import { APPLICANT_REPORT  } from './modules/applicantReport/applicantReportTypes.js';
import { UPDATE_QUESTIONNAIRE  } from './modules/applicant/applicantTypes.js';
import { UPDATE_ONBOARDING  } from './modules/applicant/applicantTypes.js';
import { DELETE_CHARACTER_REFERENCE  } from './modules/applicant/applicantTypes.js';
import { DELETE_DOCUMENTATION  } from './modules/applicant/applicantTypes.js';
import { UPDATE_DOCUMENTATION  } from './modules/applicant/applicantTypes.js';
import { UPDATE_CHARACTER_REFERENCE  } from './modules/applicant/applicantTypes.js';
import { UPDATE_BACKGROUND  } from './modules/applicant/applicantTypes.js';
import { UPDATE_FINAL_INTERVIEW  } from './modules/applicant/applicantTypes.js';
import { GET_EMPLOYEES  } from './modules/employee/employeeTypes.js';
import { CREATE_TOKEN  } from './modules/applicant/applicantTypes.js';
import { UPDATE_EXAM  } from './modules/applicant/applicantTypes.js';
import { UPDATE_CRITERIA_POINT  } from './modules/applicant/applicantTypes.js';
import { UPDATE_CRITERIA_POINTS  } from './modules/applicant/applicantTypes.js';
import { UPDATE_INTERVIEW  } from './modules/applicant/applicantTypes.js';
import { UPDATE_APPLICANT  } from './modules/applicant/applicantTypes.js';
import { GET_INTERVIEW_CRITERIAS  } from './modules/interviewCriteria/interviewCriteriaTypes.js';
import { GET_EXAMINATIONS  } from './modules/examination/examinationTypes.js';
import { GET_CONSTANTS  } from './modules/constants/constantsTypes.js';
import { GET_APPLICANT  } from './modules/applicant/applicantTypes.js';
import { GET_APPLICANTS  } from './modules/applicant/applicantTypes.js';
import { AUTH_LOGOUT  } from './modules/auth/authTypes.js';
import { AUTH_LOGIN  } from './modules/auth/authTypes.js';
import { USER_GET  } from './modules/user/userTypes.js';

// sagaActions   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { createEmployeeTrainingTopics  } from './modules/employee/employeeSaga.js';
import { createTrainingImportCsvQuestions  } from './modules/training/trainingSaga.js';
import { resetTrainingList  } from './modules/training/trainingSaga.js';
import { deleteTraining  } from './modules/training/trainingSaga.js';
import { deleteTrainingQuestion  } from './modules/training/trainingSaga.js';
import { deleteTrainingChoice  } from './modules/training/trainingSaga.js';
import { deleteTrainingCurriculumTopic  } from './modules/trainingCurriculum/trainingCurriculumSaga.js';
import { addTrainingCurriculumTopic  } from './modules/trainingCurriculum/trainingCurriculumSaga.js';
import { getTrainingCurriculum  } from './modules/trainingCurriculum/trainingCurriculumSaga.js';
import { resetTrainingCurriculum  } from './modules/trainingCurriculum/trainingCurriculumSaga.js';
import { upsertTrainingCurriculum  } from './modules/trainingCurriculum/trainingCurriculumSaga.js';
import { getTrainingCurriculums  } from './modules/trainingCurriculum/trainingCurriculumSaga.js';
import { updateEmployeeTraining  } from './modules/employee/employeeSaga.js';
import { getEmployeeTrainings  } from './modules/employee/employeeSaga.js';
import { createEmployeeTrainingHistory  } from './modules/employee/employeeSaga.js';
import { deleteInterviewCriteria  } from './modules/interviewCriteria/interviewCriteriaSaga.js';
import { addInterviewCriteria  } from './modules/interviewCriteria/interviewCriteriaSaga.js';
import { updateInterviewCriteria  } from './modules/interviewCriteria/interviewCriteriaSaga.js';
import { updateInterviewCriterias  } from './modules/interviewCriteria/interviewCriteriaSaga.js';
import { deleteCategoryByTraining  } from './modules/training/trainingSaga.js';
import { getListOfTrainingCategories  } from './modules/training/trainingSaga.js';
import { updateTrainingCategory  } from './modules/training/trainingSaga.js';
import { updateCategoryByTraining  } from './modules/training/trainingSaga.js';
import { getTrainingQuestion  } from './modules/training/trainingSaga.js';
import { updateTrainingChoice  } from './modules/training/trainingSaga.js';
import { updateTrainingExam  } from './modules/training/trainingSaga.js';
import { updateTrainingQuestion  } from './modules/training/trainingSaga.js';
import { updateTrainingHandsOn  } from './modules/training/trainingSaga.js';
import { updateTrainingSlideshow  } from './modules/training/trainingSaga.js';
import { updateTrainingVideo  } from './modules/training/trainingSaga.js';
import { updateTraining  } from './modules/training/trainingSaga.js';
import { getTraining  } from './modules/training/trainingSaga.js';
import { getTrainings  } from './modules/training/trainingSaga.js';
import { acceptedJobOffer  } from './modules/applicant/applicantSaga.js';
import { upload  } from './modules/file/fileSaga.js';
import { createApplicantPublic  } from './modules/applicant/applicantSaga.js';
import { favoriteApplicant  } from './modules/applicant/applicantSaga.js';
import { getNewApplicants  } from './modules/applicant/applicantSaga.js';
import { updateApplicantPublic  } from './modules/applicant/applicantSaga.js';
import { getConstantsPublic  } from './modules/constants/constantsSaga.js';
import { getApplicantPublic  } from './modules/applicant/applicantSaga.js';
import { applicantReport  } from './modules/applicantReport/applicantReportSaga.js';
import { updateQuestionnaire  } from './modules/applicant/applicantSaga.js';
import { updateOnboarding  } from './modules/applicant/applicantSaga.js';
import { deleteCharacterReference  } from './modules/applicant/applicantSaga.js';
import { deleteDocumentation  } from './modules/applicant/applicantSaga.js';
import { updateDocumentation  } from './modules/applicant/applicantSaga.js';
import { updateCharacterReference  } from './modules/applicant/applicantSaga.js';
import { updateBackground  } from './modules/applicant/applicantSaga.js';
import { updateFinalInterview  } from './modules/applicant/applicantSaga.js';
import { getEmployees  } from './modules/employee/employeeSaga.js';
import { createToken  } from './modules/applicant/applicantSaga.js';
import { updateExam  } from './modules/applicant/applicantSaga.js';
import { updateCriteriaPoint  } from './modules/applicant/applicantSaga.js';
import { updateCriteriaPoints  } from './modules/applicant/applicantSaga.js';
import { updateInterview  } from './modules/applicant/applicantSaga.js';
import { updateApplicant  } from './modules/applicant/applicantSaga.js';
import { getInterviewCriterias  } from './modules/interviewCriteria/interviewCriteriaSaga.js';
import { getExaminations  } from './modules/examination/examinationSaga.js';
import { getConstants  } from './modules/constants/constantsSaga.js';
import { getApplicant  } from './modules/applicant/applicantSaga.js';
import { getApplicants  } from './modules/applicant/applicantSaga.js';
import { authLogout  } from './modules/auth/authSaga.js';
import { authLogin  } from './modules/auth/authSaga.js';
import { userGet  } from './modules/user/userSaga.js';

export default function* rootSaga() {
  yield setContext({ client })
  yield all([
    takeLatest(CREATE_EMPLOYEE_TRAINING_TOPICS, createEmployeeTrainingTopics),
    takeLatest(CREATE_TRAINING_IMPORT_CSV_QUESTIONS, createTrainingImportCsvQuestions),
    takeLatest(RESET_TRAINING_LIST, resetTrainingList),
    takeLatest(DELETE_TRAINING, deleteTraining),
    takeLatest(DELETE_TRAINING_QUESTION, deleteTrainingQuestion),
    takeLatest(DELETE_TRAINING_CHOICE, deleteTrainingChoice),
    takeLatest(DELETE_TRAINING_CURRICULUM_TOPIC, deleteTrainingCurriculumTopic),
    takeLatest(ADD_TRAINING_CURRICULUM_TOPIC, addTrainingCurriculumTopic),
    takeLatest(GET_TRAINING_CURRICULUM, getTrainingCurriculum),
    takeLatest(RESET_TRAINING_CURRICULUM, resetTrainingCurriculum),
    takeLatest(UPSERT_TRAINING_CURRICULUM, upsertTrainingCurriculum),
    takeLatest(GET_TRAINING_CURRICULUMS, getTrainingCurriculums),
    takeLatest(UPDATE_EMPLOYEE_TRAINING, updateEmployeeTraining),
    takeLatest(GET_EMPLOYEE_TRAININGS, getEmployeeTrainings),
    takeLatest(CREATE_EMPLOYEE_TRAINING_HISTORY, createEmployeeTrainingHistory),
    takeLatest(DELETE_INTERVIEW_CRITERIA, deleteInterviewCriteria),
    takeLatest(ADD_INTERVIEW_CRITERIA, addInterviewCriteria),
    takeLatest(UPDATE_INTERVIEW_CRITERIA, updateInterviewCriteria),
    takeLatest(UPDATE_INTERVIEW_CRITERIAS, updateInterviewCriterias),
    takeLatest(DELETE_CATEGORY_BY_TRAINING, deleteCategoryByTraining),
    takeLatest(GET_LIST_OF_TRAINING_CATEGORIES, getListOfTrainingCategories),
    takeLatest(UPDATE_TRAINING_CATEGORY, updateTrainingCategory),
    takeLatest(UPDATE_CATEGORY_BY_TRAINING, updateCategoryByTraining),
    takeLatest(GET_TRAINING_QUESTION, getTrainingQuestion),
    takeLatest(UPDATE_TRAINING_CHOICE, updateTrainingChoice),
    takeLatest(UPDATE_TRAINING_EXAM, updateTrainingExam),
    takeLatest(UPDATE_TRAINING_QUESTION, updateTrainingQuestion),
    takeLatest(UPDATE_TRAINING_HANDS_ON, updateTrainingHandsOn),
    takeLatest(UPDATE_TRAINING_SLIDE_SHOW, updateTrainingSlideshow),
    takeLatest(UPDATE_TRAINING_VIDEO, updateTrainingVideo),
    takeLatest(UPDATE_TRAINING, updateTraining),
    takeLatest(GET_TRAINING, getTraining),
    takeLatest(GET_TRAININGS, getTrainings),
    takeLatest(ACCEPTED_JOB_OFFER, acceptedJobOffer),
    takeLatest(UPLOAD, upload),
    takeLatest(CREATE_APPLICANT_PUBLIC, createApplicantPublic),
    takeLatest(FAVORITE_APPLICANT, favoriteApplicant),
    takeLatest(GET_NEW_APPLICANTS, getNewApplicants),
    takeLatest(UPDATE_APPLICANT_PUBLIC, updateApplicantPublic),
    takeLatest(GET_CONSTANTS_PUBLIC, getConstantsPublic),
    takeLatest(GET_APPLICANT_PUBLIC, getApplicantPublic),
    takeLatest(APPLICANT_REPORT, applicantReport),
    takeLatest(UPDATE_QUESTIONNAIRE, updateQuestionnaire),
    takeLatest(UPDATE_ONBOARDING, updateOnboarding),
    takeLatest(DELETE_CHARACTER_REFERENCE, deleteCharacterReference),
    takeLatest(DELETE_DOCUMENTATION, deleteDocumentation),
    takeLatest(UPDATE_DOCUMENTATION, updateDocumentation),
    takeLatest(UPDATE_CHARACTER_REFERENCE, updateCharacterReference),
    takeLatest(UPDATE_BACKGROUND, updateBackground),
    takeLatest(UPDATE_FINAL_INTERVIEW, updateFinalInterview),
    takeLatest(GET_EMPLOYEES, getEmployees),
    takeLatest(CREATE_TOKEN, createToken),
    takeLatest(UPDATE_EXAM, updateExam),
    takeLatest(UPDATE_CRITERIA_POINT, updateCriteriaPoint),
    takeLatest(UPDATE_CRITERIA_POINTS, updateCriteriaPoints),
    takeLatest(UPDATE_INTERVIEW, updateInterview),
    takeLatest(UPDATE_APPLICANT, updateApplicant),
    takeLatest(GET_INTERVIEW_CRITERIAS, getInterviewCriterias),
    takeLatest(GET_EXAMINATIONS, getExaminations),
    takeLatest(GET_CONSTANTS, getConstants),
    takeLatest(GET_APPLICANT, getApplicant),
    takeLatest(GET_APPLICANTS, getApplicants),
    takeLatest(AUTH_LOGOUT, authLogout),
    takeLatest(AUTH_LOGIN, authLogin),
    takeLatest(USER_GET, userGet),
  ])
}
