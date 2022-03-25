import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getEmployeeTrainings,
  updateEmployeeTraining,
  createEmployeeTrainingTopics,
  createEmployeeTrainingHistory,
} from '../redux/modules/employee/employeeActions';

export default (id, token = '') => {
  const dispatch = useDispatch();
  const { employee, employeeTrainingTopic,  processing, updating } = useSelector(state => state.employee);

  const employeeId = JSON.parse(localStorage.getItem('token')).user.employeeDetail.id;

  useEffect(() => {
    if (id) {
      if (token) {
        dispatch(getEmployeeTrainings({ trainingId: id, employeeId }));
      }
      else {
        dispatch(getEmployeeTrainings({ employeeId }));
      }
    }
    else {
      dispatch(getEmployeeTrainings({ employeeId }));
    }
  }, [employeeId, id, token, dispatch]);

  return {
    employee,
    processing,
    updating,
    employeeTrainingTopic,
    updateEmployeeTraining(data) {
      dispatch(updateEmployeeTraining(data))
    },
    createEmployeeTrainingHistory(data) {
      dispatch(createEmployeeTrainingHistory(data))
    },
    createEmployeeTrainingTopics(data) {
      data = { ...data, employeeId: employeeId };
      dispatch(createEmployeeTrainingTopics(data))
    },
  };
}
