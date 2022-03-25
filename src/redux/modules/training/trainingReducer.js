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
import { GET_TRAINING_QUESTION } from './trainingTypes';
import { UPDATE_TRAINING_CHOICE } from './trainingTypes';
import { UPDATE_TRAINING_EXAM } from './trainingTypes';
import { UPDATE_TRAINING_QUESTION} from './trainingTypes';
import { UPDATE_TRAINING_HANDS_ON } from './trainingTypes';
import { UPDATE_TRAINING_VIDEO } from './trainingTypes';
import { UPDATE_TRAINING_SLIDE_SHOW } from './trainingTypes';
import { UPDATE_TRAINING } from './trainingTypes';
import { GET_TRAINING } from './trainingTypes';
import { GET_TRAININGS } from './trainingTypes';

const INITIAL_STATE = {
  trainings: [],
  training: {
    prerequisite: {},
    video: {},
    slideshow: {},
    exam: {
      questions: [{
        choices: []
      }]
    },
    handsOn: {},
    jobTitles: [],
    trainingExam: {},
    categories: [],
    categoryDetails: [],
  },
  categories: [],
  error: null,
  processing: false,
  pagination: {},
  updating: false,
  importCsvStatus: false,
}

// Reducer   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case CREATE_TRAINING_IMPORT_CSV_QUESTIONS:
    case RESET_TRAINING_LIST:
    case DELETE_TRAINING:
    case DELETE_TRAINING_QUESTION:
    case DELETE_TRAINING_CHOICE:
    case UPDATE_CATEGORY_BY_TRAINING:
    case DELETE_CATEGORY_BY_TRAINING:
    case UPDATE_TRAINING_CATEGORY:
    case GET_TRAINING_QUESTION:
    case UPDATE_TRAINING_CHOICE:
    case GET_TRAINING:
    case GET_TRAININGS:
    case UPDATE_TRAINING_EXAM:
    case UPDATE_TRAINING:
    case UPDATE_TRAINING_VIDEO:
    case UPDATE_TRAINING_SLIDE_SHOW:
    case UPDATE_TRAINING_QUESTION:
    case UPDATE_TRAINING_HANDS_ON:
      return {
        ...state,
        processing: true,
        updating: true,
        error: null
      };
    case `${UPDATE_TRAINING}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        error: null
      };
    case `${UPDATE_TRAINING_EXAM}_SUCCESS`:
      // Perform action
      return {
        ...state,
        processing: false,
        updating: false,
        error: null,
        training: {
          ...state.training,
          exam: action.payload
        }
      }
    case `${UPDATE_TRAINING_VIDEO}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        error: null,
        training: {
          ...state.training,
          video: action.payload
        }
      };

    case `${UPDATE_TRAINING_SLIDE_SHOW}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        error: null,
        training: {
          ...state.training,
          slideshow: action.payload
        }
      };
    case `${UPDATE_TRAINING_QUESTION}_SUCCESS`:
      if (state.training.exam && state.training.exam.id) {
        if (state.training.exam.questions.length > 0) {
          //check if data exists already and get Index
          const check = state.training.exam.questions.findIndex((t) => t.id === action.payload.id);
          if (check >= 0) {
            //update data by index
            state.training.exam.questions[check] = action.payload;
          } else {
            //if not exist data, push new data
            state.training.exam.questions.push(action.payload);
          }
        } else {
          //push data
          state.training.exam.questions.push(action.payload);
        }
      }

      return {
        ...state,
        processing: false,
        updating: false,
        error: null,
        training: {
          ...state.training,
          questionaire: action.payload
        }
      };

    case `${UPDATE_TRAINING_CHOICE}_SUCCESS`:
      // console.log('actionpayload', action.payload);
      let trainingExamQuestions = state.training.exam.questions;

      // console.log(trainingExamQuestions);

      const quesWithChoices = trainingExamQuestions.map((data) => {
        if (data.id === action.payload.question.id) {
          if (data.choices.length > 0) {
            const checkIndex = data.choices.findIndex((t) => t.id === action.payload.id);
            if (checkIndex >= 0) {
              data.choices[checkIndex] = action.payload;
              return { ...data };
            } else {
              data.choices.push(action.payload);
              return { ...data };
            }
          } else {
            return { ...data, choices: [action.payload] }
          }
        } else {
          return { ...data };
        }
      })

      // console.log('quesWithChoices', quesWithChoices);

        state.training.exam.questions = quesWithChoices;

        return {
        ...state,
        processing: false,
        updating: false,
        error: null,
        training: {
          ...state.training,
          choices: action.payload
        }
      };
    
    case `${UPDATE_CATEGORY_BY_TRAINING}_SUCCESS`:
      console.log('payload', action.payload);
      return {
        ...state,
        processing: false,
        updating: false,
        training: {
          ...state.training,
          categories: [...state.training.categories, action.payload.category],
          categoryDetails: [...state.training.categoryDetails, action.payload],
        }
      }

    case `${DELETE_CATEGORY_BY_TRAINING}_SUCCESS`:
      const findIndex = state.training.categoryDetails.findIndex((t) => t.id === action.payload.id);
      const categoryIndex = state.training.categories.findIndex((t) => t.id === action.payload.category_id);
      state.training.categoryDetails.splice(findIndex, 1)
      state.training.categories.splice(categoryIndex, 1)
      
      return {
        ...state,
        processing: false,
        updating: false,
        training: {
          ...state.training,
        }
      }
  
    
    case `${GET_LIST_OF_TRAINING_CATEGORIES}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        categories: action.payload,
      }
    case `${UPDATE_TRAINING_CATEGORY}_SUCCESS`:
      const cat = [];
      cat.push(action.payload);
      
      return {
        ...state,
        processing: false,
        updating: false,
        categories: [...state.categories, ...cat],
        category: action.payload,
      }

    case `${GET_TRAINING_QUESTION}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        error: null,
        ...state.training,
        question: action.payload
      };
    case `${UPDATE_TRAINING_HANDS_ON}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        error: null,
        training: {
          ...state.training,
          handsOn: action.payload
        }
      };
    case `${GET_TRAINING}_SUCCESS`:
      return {
        ...state,
        training: action.payload,
        processing: false,
        updating: false,
        error: null,
      }
    case `${GET_TRAININGS}_SUCCESS`:
      // const check = action.payload.find((payload) => payload.id === state.training.id );

      // const newTrainings = [...action.payload,
      //   (state.training.id && !check ?
      //     {
      //       id: state.training.id,
      //       title: state.training.title,
      //       description: state.training.description
      //     } : undefined)].filter(d => d !== undefined)

      return{
        ...state,
        trainings: action.payload.data,
        pagination: action.payload.paginatorInfo,
        processing: false,
        updating: false,
        error: null
      }
    case `${DELETE_TRAINING_CHOICE}_SUCCESS`:

      let getTrainingQuestions = state.training.exam.questions;
      const getQuestionChoices = getTrainingQuestions.map((data) => {
        if (data.id === action.payload.question.id) {
          const checkIndex = data.choices.findIndex((t) => t.id === action.payload.id);
          data.choices.splice(checkIndex, 1);
          return { ...data };

        } else {
          return { ...data };
        }
      })

      state.training.exam.questions = getQuestionChoices;

        return {
        ...state,
        processing: false,
        updating: false,
        error: null,
        training: {
          ...state.training,
          choices: action.payload
        }
      };

    case `${DELETE_TRAINING_QUESTION}_SUCCESS`:

      if (state.training.exam && state.training.exam.id) {
        const checkIndex = state.training.exam.questions.findIndex((t) => t.id === action.payload.id);
        state.training.exam.questions.splice(checkIndex, 1);
      }

      return {
        ...state,
        processing: false,
        updating: false,
        error: null,
        training: {
          ...state.training,
          questionaire: action.payload
        }
      };
    case `${DELETE_TRAINING}_SUCCESS`:
      const checkIndex = state.trainings.findIndex((t) => t.id === action.payload.id);
      state.trainings.splice(checkIndex, 1);

      return {
        ...state,
        processing: false,
        updating: false,
        error: null,
        trainings: [...state.trainings]
      };

    case `${RESET_TRAINING_LIST}_SUCCESS`:
      return {
        ...INITIAL_STATE,
        trainings: [],
        updating: false
      };
    case `${CREATE_TRAINING_IMPORT_CSV_QUESTIONS}_SUCCESS`:
      return {
        ...state,
        processing: false,
        updating: false,
        error: null,
        importCsvStatus: true
      };
    case `${CREATE_TRAINING_IMPORT_CSV_QUESTIONS}_FAIL`:
    case `${RESET_TRAINING_LIST}_FAIL`:
    case `${DELETE_TRAINING}_FAIL`:
    case `${DELETE_TRAINING_QUESTION}_FAIL`:
    case `${DELETE_TRAINING_CHOICE}_FAIL`:
    case `${UPDATE_TRAINING}_FAIL`:
    case `${UPDATE_TRAINING_VIDEO}_FAIL`:
    case `${UPDATE_TRAINING_SLIDE_SHOW}_FAIL`:
    case `${UPDATE_TRAINING_QUESTION}_FAIL`:
    case `${UPDATE_TRAINING_CHOICE}_FAIL`:
    case `${UPDATE_TRAINING_HANDS_ON}_FAIL`:
    case `${GET_TRAINING}_FAIL`:
    case `${GET_TRAININGS}_FAIL`:
    case `${UPDATE_TRAINING_EXAM}_FAIL`:
    case `${GET_TRAINING_QUESTION}_FAIL`:
    case `${UPDATE_CATEGORY_BY_TRAINING}_FAIL`:
    case `${UPDATE_TRAINING_CATEGORY}_FAIL`:
    case `${GET_LIST_OF_TRAINING_CATEGORIES}_FAIL`:
    case `${DELETE_CATEGORY_BY_TRAINING}_FAIL`:
      // Perform action
      return {
        ...state,
        error: action.payload,
        processing: false,
        updating: false,
      }
    default: return state;
  }
}

