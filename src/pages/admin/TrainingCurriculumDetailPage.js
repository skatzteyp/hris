import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dashboard, Button, Dropdown, Well, Loader } from '@ligph/ui';

import useDebounce from '../../hooks/useDebounce';
import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';

import { ReactComponent as IconBurger } from '../../assets/images/icon-burger.svg';
import { ReactComponent as IconX } from '../../assets/images/icon-x.svg';
import { ReactComponent as IconBack } from '../../assets/images/icon-back.svg';

import TrainingCurriculumForm from '../../components/admin/trainingCurriculum/TrainingCurriculumForm';
import { getTrainings } from '../../redux/modules/training/trainingActions';
import useTrainingCurriculum from '../../hooks/useTrainingCurriculum';
import LoadingMessage from '../../components//common/LoadingMessage';

const TrainingCurriculumDetailPage = () => {
  const dispatch = useDispatch();
  const [modules, setModule] = useModules();

  const { id } = useParams();

  const { training: { trainings } } = useSelector(store => store);
  const [ newTrainingTopic, setNewTrainingTopic ] = useState({id: null, dirty: false});

  const {
    trainingCurriculum,
    upsertTrainingCurriculum,
    addTrainingCurriculumTopic,
    deleteTrainingCurriculumTopic,
    getTrainingCurriculum,
    processing, updating
  } = useTrainingCurriculum();

  const [ curriculumDetails, setCurriculumDetails] = useState({ dirty: false });

  const { trainingTopics:trainingCurriculumTopics } = trainingCurriculum;
  const [filterTrainingCurriculumTopics, setTrainingCurriculumTopics] = useState();

  const debouncedTrainingCurriculum = useDebounce(curriculumDetails, 1000);

  const [process, setProcess] = useState(processing);

  useEffect(() => {
    if (curriculumDetails.dirty && debouncedTrainingCurriculum.dirty) {
      let data = { ...curriculumDetails, id: parseInt(curriculumDetails.id) };
      delete data.dirty;

      //mutation
      upsertTrainingCurriculum(data)

      setCurriculumDetails({
        ...curriculumDetails,
        dirty: false
      })
    }
  },[curriculumDetails, debouncedTrainingCurriculum, upsertTrainingCurriculum ]);

  // process available training
  useEffect(() => {
    if(trainingCurriculumTopics) {
      let trainingTopicsIds = (trainingCurriculumTopics).map(a => parseInt(a.pivot.trainingId));
      let newTopics = [];

      trainings.forEach(function(topic) {
        if(!trainingTopicsIds.includes(parseInt(topic.id)) && topic.title ){
          newTopics = [...newTopics, {key: topic.id, value: topic.title}]
        }
      })

      setTrainingCurriculumTopics(newTopics);
    }
  },[trainingCurriculumTopics, trainings, trainingCurriculum]);


  const getTrainingName = (trainingId) => {
    let title = ''
    trainings.forEach(function(topic) {
      if(parseInt(trainingId) === parseInt(topic.id)){
        title  = topic.title;
        return true;
      }
    })

    return title;
  };

  useEffect(() => {
    if(trainingCurriculum) {
      setCurriculumDetails(curriculumDetails => trainingCurriculum);
    }
  }, [trainingCurriculum]);


  const fetchTrainingCurriculum = useCallback(() => {
    dispatch(getTrainings({ first: 9999 }), getTrainingCurriculum({ id }));
  }, [dispatch, getTrainingCurriculum, id ]);

  useEffect(fetchTrainingCurriculum, []);

  const handTrainingTopic = (trainingId) => {
    setNewTrainingTopic({
      id: trainingId,
      dirty: true
    });
  }

  const handleAddTrainingTopic = () => {
    addTrainingCurriculumTopic({trainingCurriculumId: id, trainingId: newTrainingTopic.id });

    setNewTrainingTopic({
      id: null,
      dirty: false
    });
  }

  const handleDeleteTrainingTopic = (trainingCurriculumId) => {
    deleteTrainingCurriculumTopic({id: trainingCurriculumId});
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
          <Loader darkmode/>
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
        <div className="px-12 py-4 min-h-sm">
          <div className="flex items-center">
            <Button
              color="white"
              className="mr-5"
            >
              <IconBack className="fill-current" />
            </Button>
            <h2 className="text-3xl text-white font-medium">Curriculum Detail</h2>
          </div>

          <TrainingCurriculumForm
            curriculumDetails={curriculumDetails}
            onChangeCurriculumDetails={setCurriculumDetails}
            actionType="update"
          />

          <div className="w-full mt-6">
            <ul className="block">
              {trainingCurriculumTopics && (trainingCurriculumTopics).map((topic, index) => (
                <li key={topic.pivot.id} className="flex items-center py-1">
                  <span className="w-1 font-semibold text-white text-sm mr-4">{ index + 1}</span>
                  <div className="bg-black-600  w-8 h-10 rounded-l"><IconBurger className="text-white fill-current mt-3 mx-auto" /></div>
                  <div className="w-full h-10 flex items-center relative bg-darkmode-800 rounded px-2 py-2 rounded-l-none">
                    <p className="font-light flex-1 text-white text-sm leading-none">
                        {getTrainingName(topic.pivot.trainingId)}
                    </p>
                    <Button
                      onClick={() => handleDeleteTrainingTopic(topic.pivot.id)}
                    >
                      <IconX className="stroke-current stroke-2 text-gray-400 w-2" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>

            {(() => {
              if(!trainingCurriculumTopics && processing){
                return(
                  <div className="relative">
                    <Loader darkmode/>
                    <br/>
                  </div>
                );
              }
            })()}
          </div>

          <Well className="mt-8 p-8 border-none bg-darkmode-900">
            <span className="flex text-xs text-white font-light">Add Training</span>
            <div className="relative mt-2 flex">
              <div className="mx-1 w-1/2">

               <Dropdown
                 label=""
                 darkmode
                 placeholder="Select Training"
                 items={ filterTrainingCurriculumTopics }
                 value={ newTrainingTopic.id || 0 }
                 className="text-white not-italic"
                 onChange={(id) => handTrainingTopic(id)}
                 id="level"
               />

              </div>
              <div className="mx-1 w-1/2">
                <Button
                  color="orange"
                  variant="fill"
                  className="px-10 py-3 mx-3"
                  onClick={ handleAddTrainingTopic }
                >Add
                </Button>
              </div>
            </div>
          </Well>

        </div>
      </Dashboard>
    </>
  );
}

export default TrainingCurriculumDetailPage;
