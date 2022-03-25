import { combineReducers } from 'redux'
// reducerImports   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import trainingCurriculum from './trainingCurriculum/trainingCurriculumReducer'
import training from './training/trainingReducer'
import file from './file/fileReducer'
import applicantReport from './applicantReport/applicantReportReducer'
import employee from './employee/employeeReducer'
import interviewCriteria from './interviewCriteria/interviewCriteriaReducer'
import examination from './examination/examinationReducer'
import constants from './constants/constantsReducer'
import applicant from './applicant/applicantReducer'
import toast from './toast/toastReducer'
import auth from './auth/authReducer'
import user from './user/userReducer'

const reducer = combineReducers({
  trainingCurriculum,
  training,
  file,
  applicantReport,
  employee,
  interviewCriteria,
  examination,
  constants,
  applicant,
  toast,
  auth,
  user,
});

export default reducer
