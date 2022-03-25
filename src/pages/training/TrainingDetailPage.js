import React, { useState, useEffect, useCallback } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useTraining from '../../hooks/useTraining';
import useEmployee from '../../hooks/useEmployee';

import useTrainingCurriculum from '../../hooks/useTrainingCurriculum';
import TrainingDetailMainInfo from '../../components/training/TrainingDetailMainInfo';

const TrainingDetailPage = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const { employeeTrainingTopic,
          employee: { employeeTrainings },
          createEmployeeTrainingTopics
        } = useEmployee(id);

  const {trainingCurriculums, getTrainingCurriculums } = useTrainingCurriculum();
  const { training } = useTraining(id);

  // const [ trainingCurriculum, setTrainingCurriculum] = useState({});
  const [ myTrainingTopics, setMyTrainingTopics] = useState(); // NEED
  const [ trainingDetailStatus, setTrainingDetailStatus ] = useState({}); // NEED
  const [ mySortTrainingTopics, setMySortTrainingTopics] = useState([]); //NEED
  const [ nextTraining, setNextTraining] = useState({}); //NEED

  // fetch the assign training curriculum
  const fetchTrainingCurriculum = useCallback(() => {
    let searchData = { isAdmin: false, levelId: 24, jobTitleId: 2,  first: 9999 }
    getTrainingCurriculums(searchData);
  }, [ getTrainingCurriculums ]);

  useEffect(fetchTrainingCurriculum, [dispatch]);

  // get all my topics in training curriculum
  useEffect(() => {
    const getTrainingTopics = trainingCurriculums.map((f) => f.trainingTopics);
    setMyTrainingTopics( getTrainingTopics.flat(1) );
  }, [ trainingCurriculums ]);

  //get current emplyee training status
  const getCurrentEmployeeTrainingDetails = (trainingId) => {
    let checkEmployeeTrainingDetails = {};

    employeeTrainings.forEach(function(employeeTraining) {
      if(parseInt(trainingId) === parseInt(employeeTraining.trainingId)){
        checkEmployeeTrainingDetails = employeeTraining;
        return true;
      }
    })
    setTrainingDetailStatus(checkEmployeeTrainingDetails);
  };

  // create if training topics not in employyeetrianing
  const processEmployeeTrainingTopics = () => {
    if(employeeTrainings !== undefined && nextTraining.hasOwnProperty("trainingId")){

      let getEmployeeTrainingIds = employeeTrainings.map((f) => f.trainingId);
      let mySortTrainingTopicIds = mySortTrainingTopics.map((f) => f.trainingId);

      let isPartOfTrainingTopics = mySortTrainingTopicIds.includes(parseInt(id));
      let notYetInEmployeetraining = !getEmployeeTrainingIds.includes(parseInt(id))

      // trigger if current training in the training curriculum
      if(isPartOfTrainingTopics){
        if(parseInt(id) === parseInt(nextTraining.trainingId)){
          if(notYetInEmployeetraining){
            createEmployeeTrainingTopics({ trainingId: parseInt(id) })
          } else{
            getCurrentEmployeeTrainingDetails(id);
          }
        }else{
          if(!notYetInEmployeetraining){
            getCurrentEmployeeTrainingDetails(id);
          }else{
            window.location.href = `/training/trainings/${nextTraining.trainingId}`;
          }
        }
      }
      // free training create and assing details
      if(!isPartOfTrainingTopics && notYetInEmployeetraining){
        createEmployeeTrainingTopics({ trainingId: parseInt(id) })
      }else{
        getCurrentEmployeeTrainingDetails(id);
      }
    }
  };
  useEffect(processEmployeeTrainingTopics, [ employeeTrainings, mySortTrainingTopics, nextTraining ]);

  // get the new employee training topic
  useEffect(()=> {
    if(employeeTrainingTopic.hasOwnProperty("id")){
      setTrainingDetailStatus(employeeTrainingTopic)
    }
  },[ employeeTrainingTopic ]);

  //current training details status
  useEffect(()=> {
    if(myTrainingTopics !== undefined && employeeTrainings !== undefined ){
      let  processMyTrainingTopicStatus = [];
      myTrainingTopics.forEach(function(data){
        let trainingId =  parseInt(data.pivot.trainingId);
        let topicData = { trainingId , isDone: false, completionLevel: 0, hasData: false };

        employeeTrainings.forEach(function(employeeTraining) {
          if(trainingId === parseInt(employeeTraining.trainingId)){
            let isDone = (employeeTraining.completionLevel === 4);
            topicData = { ...topicData, isDone, completionLevel: employeeTraining.completionLevel, hasData: true };
            return true;
          }
        });
        processMyTrainingTopicStatus = [...processMyTrainingTopicStatus, topicData];
      })

      setMySortTrainingTopics(prevState => processMyTrainingTopicStatus);
    }
  },[ myTrainingTopics, employeeTrainings ]);

  useEffect(() => {
    if(mySortTrainingTopics.length !== 0){
      let breakCondition = false;
      mySortTrainingTopics.forEach(function(data) {
        if(data.isDone === false && !breakCondition ){
          setNextTraining(data);
          breakCondition = true;
        }
      })
    }
  }, [ mySortTrainingTopics ]);

   useEffect(() => {
    console.group();
     //console.log("next Training");
     //console.log(nextTraining);
     //console.log("Training Status");
    console.log("TRAINING STATUS DETAILS PAGW");
    console.log(trainingDetailStatus);
     //console.log(employeeTrainingTopic);
    console.groupEnd();
  }, [ trainingDetailStatus, nextTraining, employeeTrainingTopic]);

  return (
    <TrainingDetailMainInfo
      training={ training }
      trainingDetailStatus={ trainingDetailStatus }
    />
  );
}

export default TrainingDetailPage;
