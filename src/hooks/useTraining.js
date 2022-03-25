import { useEffect } from 'react';
// import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import {
  getTraining,
  getTrainingQuestion,
  updateTraining,
  deleteTraining,
  updateTrainingVideo,
  updateTrainingSlideshow,
  updateTrainingExam,
  updateTrainingQuestion,
  deleteTrainingQuestion,
  updateTrainingChoice,
  deleteTrainingChoice,
  updateTrainingHandsOn,
  updateTrainingCategory,
  updateCategoryByTraining,
  createTrainingImportCsvQuestions,
  resetTrainingList,
  // getTrainings,
  // favoriteApplicant
} from '../redux/modules/training/trainingActions';

export default (id, token = '') => {
  const dispatch = useDispatch();
  const { training, importCsvStatus, pagination, processing, updating } = useSelector(state => state.training);

  useEffect(() => {
    if (id &&  id !== training.id  && id!== 'new') {
      if (token) {
        dispatch(getTraining({ id, token }));
      }
      else {
        dispatch(getTraining({ id }));
      }
    }
  }, [training, id, dispatch, token ]);

  return {
    training,
    pagination,
    processing,
    updating,
    importCsvStatus,
    getTrainingQuestion(data) {
      dispatch(getTrainingQuestion(data));
    },
    updateTraining(data) {
      data.id = training.id;
      dispatch(updateTraining(data));
    },
    deleteTraining(data) {
      data.id = training.id;
      dispatch(deleteTraining(data));
    },
    updateTrainingVideo(data) {
      dispatch(updateTrainingVideo(data));
    },
    updateTrainingSlideshow(data) {
      dispatch(updateTrainingSlideshow(data));
    },
    updateTrainingExam(data) {
      dispatch(updateTrainingExam(data));
    },
    updateTrainingHandsOn(data) {
      dispatch(updateTrainingHandsOn(data));
    },
    updateTrainingQuestion(data) {
      dispatch(updateTrainingQuestion(data));
    },
    deleteTrainingQuestion(data) {
      dispatch(deleteTrainingQuestion(data));
    },
    updateTrainingChoice(data) {
      dispatch(updateTrainingChoice(data));
    },
    deleteTrainingChoice(data) {
      dispatch(deleteTrainingChoice(data));
    },
    updateCategoryByTraining(data) {
      dispatch(updateCategoryByTraining(data));
    },
    updateTrainingCategory(data) {
      dispatch(updateTrainingCategory(data));
    },
    createTrainingImportCsvQuestions(data){
      dispatch(createTrainingImportCsvQuestions(data));
    },
    resetTrainingList(){
      dispatch(resetTrainingList());
    }
  };
}
