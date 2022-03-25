// ImportActionType   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
import { DELETE_TRAINING_CURRICULUM_TOPIC } from './trainingCurriculumTypes';
import { ADD_TRAINING_CURRICULUM_TOPIC } from './trainingCurriculumTypes';
import { GET_TRAINING_CURRICULUM } from './trainingCurriculumTypes';
import { RESET_TRAINING_CURRICULUM } from './trainingCurriculumTypes';
import { UPSERT_TRAINING_CURRICULUM } from './trainingCurriculumTypes';
import { GET_TRAINING_CURRICULUMS } from './trainingCurriculumTypes';

const INITIAL_STATE = {
  trainingCurriculums: [],
  trainingCurriculum: {},
  error: null,
  processing: false,
  pagination: {},
  updating: false,
}

// Reducer   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case DELETE_TRAINING_CURRICULUM_TOPIC:
    case ADD_TRAINING_CURRICULUM_TOPIC:
    case GET_TRAINING_CURRICULUM:
    case RESET_TRAINING_CURRICULUM:
    case UPSERT_TRAINING_CURRICULUM:
    case GET_TRAINING_CURRICULUMS:
      return {
        ...state,
        processing: true,
        updating: true,
        error: null
      };
    case `${UPSERT_TRAINING_CURRICULUM}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        trainingCurriculums: state.trainingCurriculums.push(action.payload),
        trainingCurriculum: action.payload,
      }
    case `${GET_TRAINING_CURRICULUMS}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        pagination: action.payload.paginatorInfo,
        trainingCurriculums: action.payload.data,
      }
    case `${RESET_TRAINING_CURRICULUM}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        trainingCurriculum: {}
      }
    case `${GET_TRAINING_CURRICULUM}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        trainingCurriculum: action.payload,
      }
    case `${ADD_TRAINING_CURRICULUM_TOPIC}_SUCCESS`:

      const result = action.payload
      let newTrainingCurriculum = state.trainingCurriculum;
      newTrainingCurriculum.trainingTopics.push({title: result.title,
                                                pivot: {id: result.id, trainingId: result.trainingId}})

      return {
        ...state,
        processing: false,
        updating: false,
        trainingCurriculum: { ...newTrainingCurriculum },
      }
    case `${DELETE_TRAINING_CURRICULUM_TOPIC}_SUCCESS`:
      let trainingCurriculum = state.trainingCurriculum;

      const findIndex = trainingCurriculum.trainingTopics.findIndex((t) => t.pivot.id === action.payload.id);
      trainingCurriculum.trainingTopics.splice(findIndex, 1);

      return {
        ...state,
        processing: false,
        updating: false,
        trainingCurriculum: { ...trainingCurriculum }
      }

    case `${DELETE_TRAINING_CURRICULUM_TOPIC}_FAIL`:
    case `${ADD_TRAINING_CURRICULUM_TOPIC}_FAIL`:
    case `${GET_TRAINING_CURRICULUM}_FAIL`:
    case `${RESET_TRAINING_CURRICULUM}_FAIL`:
    case `${UPSERT_TRAINING_CURRICULUM}_FAIL`:
    case `${GET_TRAINING_CURRICULUMS}_FAIL`:
      return {
        ...state,
        error: action.payload,
        processing: false,
        updating: false,
      }
    default: return state;
  }
}

