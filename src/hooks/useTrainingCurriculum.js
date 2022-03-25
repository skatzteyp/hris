// import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import {
  getTrainingCurriculum,
  getTrainingCurriculums,
  upsertTrainingCurriculum,
  addTrainingCurriculumTopic,
  deleteTrainingCurriculumTopic,
  resetTrainingCurriculum,
} from '../redux/modules/trainingCurriculum/trainingCurriculumActions';

export default (id, token = '') => {
  const dispatch = useDispatch();
  const {
    trainingCurriculums,
    trainingCurriculum,
    pagination,
    processing,
    updating } = useSelector(state => state.trainingCurriculum);

  return {
    trainingCurriculums,
    pagination,
    trainingCurriculum,
    processing,
    updating,
    getTrainingCurriculums(data) {
      dispatch(getTrainingCurriculums(data));
    },
    getTrainingCurriculum(data) {
      dispatch(getTrainingCurriculum(data));
    },
    upsertTrainingCurriculum(data) {
      dispatch(upsertTrainingCurriculum(data));
    },
    addTrainingCurriculumTopic(data) {
      dispatch(addTrainingCurriculumTopic(data));
    },
    deleteTrainingCurriculumTopic(data) {
      dispatch(deleteTrainingCurriculumTopic(data));
    },
    resetTrainingCurriculum(){
      dispatch(resetTrainingCurriculum());
    },
  };
}
