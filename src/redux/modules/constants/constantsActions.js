// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { GET_CONSTANTS_PUBLIC } from './constantsTypes';
import { GET_CONSTANTS } from './constantsTypes';

// Action Creators   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function getConstantsPublic(data) {
  return { type: GET_CONSTANTS_PUBLIC , payload: data };
}

export function getConstants(data) {
  return { type: GET_CONSTANTS , payload: data };
}

