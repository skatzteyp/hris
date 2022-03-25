import React, { useState, useEffect } from 'react';
import { Dashboard, Button, Loader } from '@ligph/ui';

import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';

import { ReactComponent as IconX } from '../../assets/images/icon-x.svg';
import { ReactComponent as IconBack } from '../../assets/images/icon-back.svg';

import { routes, route } from '../../utils/routes';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useDebounce from '../../hooks/useDebounce';
import LoadingMessage from '../../components/common/LoadingMessage';
import useTrainingCurriculum from '../../hooks/useTrainingCurriculum';

import TrainingCurriculumForm from '../../components/admin/trainingCurriculum/TrainingCurriculumForm';

const TrainingCurriculumNew = () => {
  const [modules, setModule] = useModules();
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    trainingCurriculum,
    resetTrainingCurriculum,
    upsertTrainingCurriculum,
    processing,
    updating
  } = useTrainingCurriculum();

  const [ curriculumDetails, setCurriculumDetails] = useState({ levelId: '', jobTitleId: '', name: '', dirty: false });

  const [process, setProcess] = useState(processing);

  const debouncedTrainingCurriculum = useDebounce(curriculumDetails, 1000);

  useEffect(resetTrainingCurriculum,[ dispatch ]);

  useEffect(() => {
    if (curriculumDetails.dirty && debouncedTrainingCurriculum.dirty) {
      if(trainingCurriculum.id !== undefined){
        history.push(route(routes.admin.curriculumDetail, trainingCurriculum))
      }
    }
  },[ trainingCurriculum, history, debouncedTrainingCurriculum, curriculumDetails]);

  const handleCreateCurriculum = () => {
    if (debouncedTrainingCurriculum.dirty) {
      if(curriculumDetails.levelId && curriculumDetails.jobTitleId && curriculumDetails.name){
        setProcess(true);
        let data = { ...curriculumDetails };
        delete data.dirty;
        upsertTrainingCurriculum(data);
      }
    }
  }

  const handleCancelCurriculum = () => {
    history.push(route(routes.admin.curriculumList));
  }

  useEffect(() => {
    if(updating) {
      setProcess(false);
    }
  }, [updating])

  return (
    <>
      {processing && process ?
       <div className="relative min-h-sm">
         <Loader />
       </div> :
         updating ? <LoadingMessage text="Saving"/>
       : null
       }

      <Dashboard
        color="gray"
        menuItems={dashboard.getMenu('admin', 'curriculums')}
        modules={modules}
        onModuleChange={setModule}
        module="Admin"
        darkmode
      >
        <div className="px-12 py-4">
          <div className="flex items-center">
            <Button
              color="white"
              className="mr-5"
            >
              <IconBack className="fill-current" />
            </Button>
            <h2 className="text-3xl text-white font-medium">Add New Curriculum</h2>
          </div>

          <TrainingCurriculumForm
            curriculumDetails={curriculumDetails}
            onChangeCurriculumDetails={setCurriculumDetails}
          />

          <div className="py-4 px-8 mt-4 bg-darkmode-900 rounded text-white flex justify-between items-center">
            <Button
              color="red"
              variant="outline"
              onClick={ handleCancelCurriculum }
            >

              <IconX className="stroke-current stroke-2 mr-2 transform scale-75" />
              Cancel
            </Button>

            <Button
              onClick={ handleCreateCurriculum }
              variant="fill">
               Create
            </Button>
          </div>

        </div>
      </Dashboard>
    </>
  );
}

export default TrainingCurriculumNew;
