// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { GET_EXAMINATIONS } from './examinationTypes';

// Action Creators   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function getExaminations(data) {
  return { type: GET_EXAMINATIONS , payload: data };
}

