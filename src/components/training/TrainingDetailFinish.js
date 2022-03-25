import React from 'react';
import { Button } from '@ligph/ui';
import { useDispatch } from 'react-redux';
import { routes } from '../../utils/routes';
import { useHistory } from 'react-router-dom';
import { updateEmployeeTraining } from '../../redux/modules/employee/employeeActions';

const TrainingDetailFinish = ({ setActiveStep, employeeTrainingId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRetake = () => {
    setActiveStep('video');
    dispatch(updateEmployeeTraining({id: employeeTrainingId, completionLevel: 0}))
  }

  return (
    <div className="text-center">
      <br/>
      <h3 className="text-2xl text-black font-semibold mb-4">Congratulations!</h3>
      <p className="text-sm text-black mb-8">You have completed this training. You can still retake this anytime from My Training page.</p>
      <div className="flex justify-center">
        <div className="px-4">
          <Button
            onClick={() =>
              history.push(routes.training.trainingList)
            }
            variant="outline"
            color="purple"
            className="w-32 flex justify-center">
            Home
          </Button>
        </div>
        <div className="px-4">
          <Button
            onClick={() =>
            history.push(routes.training.trainingList)
          }
            variant="outline"
            color="purple"
            className="w-32 flex justify-center">
            My Training
          </Button>
        </div>
        <div className="px-4">
          <Button variant="outline"
            onClick={handleRetake}
            color="purple"
            className="w-32 flex justify-center">
            Retake
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TrainingDetailFinish;
