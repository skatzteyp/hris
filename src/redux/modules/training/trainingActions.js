// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { CREATE_TRAINING_IMPORT_CSV_QUESTIONS } from './trainingTypes';
import { RESET_TRAINING_LIST } from './trainingTypes';
import { DELETE_TRAINING } from './trainingTypes';
import { DELETE_TRAINING_QUESTION } from './trainingTypes';
import { DELETE_TRAINING_CHOICE } from './trainingTypes';
import { DELETE_CATEGORY_BY_TRAINING } from './trainingTypes';
import { GET_LIST_OF_TRAINING_CATEGORIES } from './trainingTypes';
import { UPDATE_TRAINING_CATEGORY } from './trainingTypes';
import { UPDATE_CATEGORY_BY_TRAINING } from './trainingTypes';
import { UPDATE_TRAINING_CHOICE } from './trainingTypes';
import { UPDATE_TRAINING_EXAM } from './trainingTypes';
import { UPDATE_TRAINING_QUESTION } from './trainingTypes';
import { UPDATE_TRAINING_HANDS_ON } from './trainingTypes';
import { UPDATE_TRAINING_VIDEO } from './trainingTypes';
import { UPDATE_TRAINING_SLIDE_SHOW } from './trainingTypes';
import { UPDATE_TRAINING } from './trainingTypes';
import { GET_TRAINING } from './trainingTypes';
import { GET_TRAININGS } from './trainingTypes';
import { GET_TRAINING_QUESTION } from './trainingTypes';

// Action Creators   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function createTrainingImportCsvQuestions(data) {
  return { type: CREATE_TRAINING_IMPORT_CSV_QUESTIONS , payload: data };
}

export function resetTrainingList(data) {
  return { type: RESET_TRAINING_LIST , payload: data };
}

export function deleteTraining(data) {
  return { type: DELETE_TRAINING , payload: data };
}

export function deleteTrainingQuestion(data) {
  return { type: DELETE_TRAINING_QUESTION , payload: data };
}

export function deleteTrainingChoice(data) {
  return { type: DELETE_TRAINING_CHOICE , payload: data };
}

export function deleteCategoryByTraining(data) {
  return { type: DELETE_CATEGORY_BY_TRAINING , payload: data };
}

export function getListOfTrainingCategories(data) {
  return { type: GET_LIST_OF_TRAINING_CATEGORIES , payload: data };
}

export function updateTrainingCategory(data) {
  return { type: UPDATE_TRAINING_CATEGORY , payload: data };
}

export function updateCategoryByTraining(data) {
  return { type: UPDATE_CATEGORY_BY_TRAINING , payload: data };
}

export function getTrainingQuestion(data) {
  return { type: GET_TRAINING_QUESTION , payload: data };
}

export function updateTrainingChoice(data) {
  return { type: UPDATE_TRAINING_CHOICE , payload: data };
}

export function updateTrainingExam(data) {
  return { type: UPDATE_TRAINING_EXAM , payload: data };
}

export function updateTrainingQuestion(data) {
  return { type: UPDATE_TRAINING_QUESTION , payload: data };
}
export function updateTrainingHandsOn(data) {
  return { type: UPDATE_TRAINING_HANDS_ON , payload: data };
}

export function updateTrainingSlideshow(data) {
  return { type: UPDATE_TRAINING_SLIDE_SHOW , payload: data };
}

export function updateTrainingVideo(data) {
  return { type: UPDATE_TRAINING_VIDEO , payload: data };
}

export function updateTraining(data) {
  return { type: UPDATE_TRAINING , payload: data };
}

export function getTraining(data) {
  return { type: GET_TRAINING , payload: data };
}

export function getTrainings(data) {
  return { type: GET_TRAININGS , payload: data };
}

