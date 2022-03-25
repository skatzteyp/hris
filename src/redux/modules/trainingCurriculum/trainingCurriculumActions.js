// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { DELETE_TRAINING_CURRICULUM_TOPIC } from './trainingCurriculumTypes';
import { ADD_TRAINING_CURRICULUM_TOPIC } from './trainingCurriculumTypes';
import { GET_TRAINING_CURRICULUM } from './trainingCurriculumTypes';
import { RESET_TRAINING_CURRICULUM } from './trainingCurriculumTypes';
import { UPSERT_TRAINING_CURRICULUM } from './trainingCurriculumTypes';
import { GET_TRAINING_CURRICULUMS } from './trainingCurriculumTypes';

// Action Creators   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function deleteTrainingCurriculumTopic(data) {
  return { type: DELETE_TRAINING_CURRICULUM_TOPIC , payload: data };
}

export function addTrainingCurriculumTopic(data) {
  return { type: ADD_TRAINING_CURRICULUM_TOPIC , payload: data };
}

export function getTrainingCurriculum(data) {
  return { type: GET_TRAINING_CURRICULUM , payload: data };
}

export function resetTrainingCurriculum(data) {
  return { type: RESET_TRAINING_CURRICULUM , payload: data };
}

export function upsertTrainingCurriculum(data) {
  return { type: UPSERT_TRAINING_CURRICULUM , payload: data };
}

export function getTrainingCurriculums(data) {
  return { type: GET_TRAINING_CURRICULUMS , payload: data };
}

