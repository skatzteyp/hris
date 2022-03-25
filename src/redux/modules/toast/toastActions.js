// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { TOAST_REMOVE_ALL } from './toastTypes';
import { TOAST_REMOVE } from './toastTypes';
import { TOAST_ADD } from './toastTypes';

// Action Creators   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function toastRemoveAll(data) {
  return { type: TOAST_REMOVE_ALL , payload: data.payload };
}

export function toastRemove(data) {
  return { type: TOAST_REMOVE , payload: data.payload };
}

export function toastAdd(data) {
  return { type: TOAST_ADD , payload: data };
}

