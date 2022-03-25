import { put, call, getContext } from 'redux-saga/effects'
// Actions   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
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
import { UPDATE_TRAINING_QUESTION } from './trainingTypes';
import { UPDATE_TRAINING_HANDS_ON } from './trainingTypes';
import { UPDATE_TRAINING_VIDEO } from './trainingTypes';
import { UPDATE_TRAINING_SLIDE_SHOW } from './trainingTypes';
import { UPDATE_TRAINING } from './trainingTypes';
import { GET_TRAINING } from './trainingTypes';
import { GET_TRAININGS } from './trainingTypes';
import { queries } from './trainingQueries';

import useQuery from '../../../hooks/useQuery';
import useMutation from '../../../hooks/useMutation';

// reqFunction   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)

function* deleteTrainingReq(data) {
  return yield call(useMutation, queries.DELETE_TRAINING, data)
}

function* deleteTrainingQuestionReq(data) {
  return yield call(useMutation, queries.DELETE_TRAINING_QUESTION, data)
}

function* deleteTrainingChoiceReq(data) {
  return yield call(useMutation, queries.DELETE_TRAINING_CHOICE, data)
}

function* deleteCategoryByTrainingReq(data) {
  // return yield call(useMutation, queries.DELETE_CATEGORY_BY_TRAINING, {id: data.id});
  const client = yield getContext('client');
  const mutation = queries.DELETE_CATEGORY_BY_TRAINING;
  return yield call(client.mutate, {
    mutation,
    variables: {id: data.id},
    refetchQueries: () => [{query: queries.GET_TRAINING, variables: {id: data.training_id}}],
  })
}

function* getListOfTrainingCategoriesReq(data) {
  return yield call(useQuery, queries.GET_LIST_CATEGORIES, data);
}

function* updateTrainingCategoryReq(data) {
  const client = yield getContext('client');
  const mutation = queries.UPDATE_TRAINING_CATEGORY;
  return yield call(client.mutate, {
    mutation,
    variables: data,
    refetchQueries: () => [{query: queries.GET_LIST_CATEGORIES}],
  })
}

function* updateCategoryByTrainingReq(data) {
  // return yield call(useMutation, queries.UPDATE_CATEGORY_BY_TRAINING, data)
  const client = yield getContext('client');
  const mutation = queries.UPDATE_CATEGORY_BY_TRAINING;
  return yield call(client.mutate, {
    mutation,
    variables: data,
    refetchQueries: () => [{query: queries.GET_TRAINING, variables: {id: data.training_id}}],
  })
}

function* getTrainingQuestionReq(data) {
  return yield call(useQuery, queries.GET_TRAINING_QUESTION, data);
}

function* updateTrainingChoiceReq(data) {
  return yield call(useMutation, queries.UPDATE_TRAINING_CHOICE, data)
}

function* updateTrainingExamReq(data) {
  return yield call(useMutation, queries.UPDATE_TRAINING_EXAM, data)
}

function* updateTrainingQuestionReq(data) {
  return yield call(useMutation, queries.UPDATE_TRAINING_QUESTION, data)
}

function* updateTrainingHandsOnReq(data) {
  return yield call(useMutation, queries.UPDATE_TRAINING_HANDS_ON, data)
}

function* updateTrainingSlideshowReq(data) {
  return yield call(useMutation, queries.UPDATE_TRAINING_SLIDE_SHOW, data)
}

function* updateTrainingVideoReq(data) {
  return yield call(useMutation, queries.UPDATE_TRAINING_VIDEO, data)
}

function* updateTrainingReq(data) {
  const client = yield getContext('client');
  const mutation = queries.UPDATE_TRAINING;
  return yield call(client.mutate, {
    mutation,
    variables: data,
    refetchQueries: () => [{ query: queries.GET_TRAININGS, variables: { filter: 10 } }],
  });
}

function* getTrainingReq(data) {
  return yield call(useQuery, queries.GET_TRAINING, data);
}

function* getTrainingsReq(data) {
  return yield call(useQuery, queries.GET_TRAININGS, data);
}


// exportFuntion   (DONT DELETE THIS LINE: USED FOR BATTLECRY DUCK GENERATOR)
export function* createTrainingImportCsvQuestions(action) {

  try {

    let questionList = action.payload.list;
    let examId = action.payload.examId;
    let questionListCount = questionList.length;
    let processQuestion  = 0;

    //saving questions
    yield* questionList.map(function* (item, questionIndx) {
      let question = { examId, question: item["question"] }
      let choicesList = item["choices"];

      const { data: { upsertTrainingQuestion: trainingQuestion } } = yield call(updateTrainingQuestionReq, question);
      yield put({ type: `${UPDATE_TRAINING_QUESTION}_SUCCESS`, payload: trainingQuestion })

      try {
        //saving choices

        processQuestion = questionIndx + 1;
        yield* choicesList.map(function* (choiceItem, indx) {

          let isCorrect = (indx === item.answerIndex);
          let choice = { text: choiceItem, isCorrect, question: { connect: trainingQuestion.id } };

          try {
            const { data : { upsertTrainingChoice: trainingChoice } } = yield call(updateTrainingChoiceReq, choice)
            yield put({ type: `${UPDATE_TRAINING_CHOICE}_SUCCESS`, payload: trainingChoice })
          } catch(e) {
            yield put({ type: `${UPDATE_TRAINING_CHOICE}_FAIL`, payload: e.response })
          }
        });

      } catch (e) {
        yield put({ type: `${UPDATE_TRAINING_QUESTION}_FAIL`, payload: e })
      }

      if(questionListCount === processQuestion){
        yield put({ type: `${CREATE_TRAINING_IMPORT_CSV_QUESTIONS}_SUCCESS`, payload: [] })
      }
    });

  } catch(e) {
    console.log(e);
    yield put({ type: `${CREATE_TRAINING_IMPORT_CSV_QUESTIONS}_FAIL`, payload: e.response })
  }
}

export function* resetTrainingList(action) {
    yield put({ type: `${RESET_TRAINING_LIST}_SUCCESS`})
}

export function* deleteTraining(action) {
  try {
    const { data: { deleteTraining } } = yield call(deleteTrainingReq, action.payload);
    yield put({ type: `${DELETE_TRAINING}_SUCCESS`, payload: deleteTraining })
  } catch(e) {
    yield put({ type: `${DELETE_TRAINING}_FAIL`, payload: e.response })
  }
}

export function* deleteTrainingQuestion(action) {
  try {
    const { data: { deleteTrainingQuestion } } = yield call(deleteTrainingQuestionReq, action.payload);
    yield put({ type: `${DELETE_TRAINING_QUESTION}_SUCCESS`, payload: deleteTrainingQuestion })
  } catch(e) {
    yield put({ type: `${DELETE_TRAINING_QUESTION}_FAIL`, payload: e.response })
  }
}

export function* deleteTrainingChoice(action) {
  try {
    const { data: { deleteTrainingChoice } } = yield call(deleteTrainingChoiceReq, action.payload);
    yield put({ type: `${DELETE_TRAINING_CHOICE}_SUCCESS`, payload: deleteTrainingChoice })
  } catch(e) {
    yield put({ type: `${DELETE_TRAINING_CHOICE}_FAIL`, payload: e.response })
  }
}

export function* deleteCategoryByTraining(action) {
  try {
    const { data: { deleteCategoryPerTraining: deletedCategory} } = yield call(deleteCategoryByTrainingReq, action.payload)
    yield put({ type: `${DELETE_CATEGORY_BY_TRAINING}_SUCCESS`, payload: deletedCategory })
  } catch (e) {
    yield put({ type: `${DELETE_CATEGORY_BY_TRAINING}_FAIL`, payload: e.response })
  }
}

export function* getListOfTrainingCategories(action) {
  try {
    const { data: { getListOfTrainingCategories: allCategories} } = yield call(getListOfTrainingCategoriesReq, action.payload)
    yield put({ type: `${GET_LIST_OF_TRAINING_CATEGORIES}_SUCCESS`, payload: allCategories })
  } catch(e) {
    yield put({ type: `${GET_LIST_OF_TRAINING_CATEGORIES}_FAIL`, payload: e.response })
  }
}

export function* updateTrainingCategory(action) {
  try {
    const { data: { upsertTrainingCategory: categories} } = yield call(updateTrainingCategoryReq, action.payload)
    yield put({ type: `${UPDATE_TRAINING_CATEGORY}_SUCCESS`, payload: categories })
  } catch(e) {
    yield put({ type: `${UPDATE_TRAINING_CATEGORY}_FAIL`, payload: e.response })
  }
}

export function* updateCategoryByTraining(action) {
  try {
    const { data: { upsertCategoryPerTraining: trainingCategory} } = yield call(updateCategoryByTrainingReq, action.payload)
    yield put({ type: `${UPDATE_CATEGORY_BY_TRAINING}_SUCCESS`, payload: trainingCategory })
  } catch (e) {
    yield put({ type: `${UPDATE_CATEGORY_BY_TRAINING}_FAIL`, payload: e.response })
  }
}

export function* getTrainingQuestion(action) {
  try {
    const { data: { getTrainingQuestion: question} } = yield call(getTrainingQuestionReq, action.payload);
    yield put({ type: `${GET_TRAINING_QUESTION}_SUCCESS`, payload: question })
  } catch(e) {
    yield put({ type: `${GET_TRAINING_QUESTION}_FAIL`, payload: e.response })
  }
}

export function* updateTrainingChoice(action) {
  try {
    const { data : { upsertTrainingChoice: trainingChoice } } = yield call(updateTrainingChoiceReq, action.payload)
    yield put({ type: `${UPDATE_TRAINING_CHOICE}_SUCCESS`, payload: trainingChoice })
  } catch(e) {
    yield put({ type: `${UPDATE_TRAINING_CHOICE}_FAIL`, payload: e.response })
  }
}

export function* updateTrainingExam(action) {
  try {
    const { data : { upsertTrainingExam: trainingExam } } = yield call(updateTrainingExamReq, action.payload)
    yield put({ type: `${UPDATE_TRAINING_EXAM}_SUCCESS`, payload: trainingExam })
  } catch (e) {
    yield put({ type: `${UPDATE_TRAINING_EXAM}_FAIL`, payload: e.response })
  }
}

export function* updateTrainingQuestion(action) {
  try {
    const { data: { upsertTrainingQuestion: trainingQuestion } } = yield call(updateTrainingQuestionReq, action.payload);

    yield put({ type: `${UPDATE_TRAINING_QUESTION}_SUCCESS`, payload: trainingQuestion })
  } catch (e) {
    yield put({ type: `${UPDATE_TRAINING_QUESTION}_FAIL`, payload: e })
  }
}

export function* updateTrainingHandsOn(action) {
  try {
    const { data: { upsertTrainingHandsOn: trainingHandsOn } } = yield call(updateTrainingHandsOnReq, action.payload);
    
    yield put({ type: `${UPDATE_TRAINING_HANDS_ON}_SUCCESS`, payload: trainingHandsOn })
  } catch(e) {
    yield put({ type: `${UPDATE_TRAINING_HANDS_ON}_FAIL`, payload: e.response })
  }
}

export function* updateTrainingSlideshow(action) {
  try {
    const { data: { upsertTrainingSlideshow: trainingSlideshow } } = yield call(updateTrainingSlideshowReq, action.payload);
    
    yield put({ type: `${UPDATE_TRAINING_SLIDE_SHOW}_SUCCESS`, payload: trainingSlideshow })
  } catch(e) {
    yield put({ type: `${UPDATE_TRAINING_SLIDE_SHOW}_FAIL`, payload: e.response })
  }
}

export function* updateTrainingVideo(action) {
  try {
    const { data: { upsertTrainingVideo: trainingVideo } } = yield call(updateTrainingVideoReq, action.payload);
    
    yield put({ type: `${UPDATE_TRAINING_VIDEO}_SUCCESS`, payload: trainingVideo })
  } catch(e) {
    yield put({ type: `${UPDATE_TRAINING_VIDEO}_FAIL`, payload: e.response })
  }
}

export function* updateTraining(action) {
  try {
    const { data: { upsertTraining: training } } =  yield call(updateTrainingReq, action.payload);

    if (!action.payload.id) {
      training.new = true;
    }

    yield put({ type: `${GET_TRAINING}_SUCCESS`, payload: training })
  } catch(e) {
     yield put({ type: `${UPDATE_TRAINING}_FAIL`, payload: e.response })
  }
}

export function* getTraining(action) {
  try {
    const { data: { getTraining: training } } = yield call(getTrainingReq, action.payload);
    yield put({ type: `${GET_TRAINING}_SUCCESS`, payload: training })
  } catch(e) {
    yield put({ type: `${GET_TRAINING}_FAIL`, payload: e.response })
  }
}

export function* getTrainings(action) {
  try {
    const { data: { getTrainings: trainings } } = yield call(getTrainingsReq, action.payload);
    yield put({ type: `${GET_TRAININGS}_SUCCESS`, payload: trainings })
  } catch(error) {
    yield put({ type: `${GET_TRAININGS}_FAIL`, payload: error })
  }
}


