import React, { useState, useEffect } from 'react';

import TrainingDetailDashboard from '../../components/training/TrainingDetailDashboard';
import TrainingDetailVideo from '../../components/training/TrainingDetailVideo';
import TrainingDetailExam from '../../components/training/TrainingDetailExam';
import TrainingDetailSlideshow from '../../components/training/TrainingDetailSlideshow';
import TrainingDetailHandsOn from '../../components/training/TrainingDetailHandsOn';
import TrainingDetailFinish from '../../components/training/TrainingDetailFinish';

const TrainingDetailMainInfo = ({ training, trainingDetailStatus }) => {

  const [activeStep, setActiveStep] = useState('video');
  const [activeTabStats, setActiveTabStats] = useState({ video: false, slideshow: false});
  const [finish, setFinish] = useState(false);

  const { id: employeeTrainingId, completionLevel:getCompletionLevel } = trainingDetailStatus || {};

  const [completionLevel, setCompletionLevel] = useState();
  const [apiCompletionLevel, setApiCompletionLevel] = useState();

  const { title, video, exam, handsOn, slideshow } = training || {};

  const handleActiveView = (name, completionLevelVal ) => {
    setCompletionLevel(prevState => completionLevelVal);
    setActiveStep(name)
  }

  const handleApiCompletionLevel = ( val )  => {
    setApiCompletionLevel(prevState => prevState + val);
  }

  // get completion level in the APi in the first laod
  useEffect(() => {
    setCompletionLevel(prevState => getCompletionLevel);
    setApiCompletionLevel(prevState => getCompletionLevel);
  },[ getCompletionLevel, trainingDetailStatus, ]);

  useEffect(() => {
    if (completionLevel === 1) {
      setActiveTabStats({ video: true, slideshow: false });
    }
    if (completionLevel <= 4 && (completionLevel !== 1 || completionLevel !== 0)) {
      setActiveTabStats({ video: true, slideshow: true });
    }
  }, [completionLevel])

  useEffect(() => {

    if (completionLevel !== 0 && activeStep === 'video') {
        switch (completionLevel + 1) {
          case 1:
              setActiveStep('video');
            break;
          case 2:
            if (activeStep !== 'exam') {
              setActiveStep('slideshow')
            }
            break;
          case 3:
            setActiveStep('exam')
            break;
          case 4:
            setActiveStep('handsOn')
            break;
          case 5:
              setActiveStep('finish')
            break;
          default:
            break;
        }
    }

    if (completionLevel === 0) {
      setActiveStep('video');
    }
  }, [completionLevel, activeStep, setActiveStep])

  const handleCompletetionLevel = (level) => {
    setCompletionLevel(prevState => level);
  }


  return (
    <TrainingDetailDashboard
      title={title}
      dueDate="00/00/0000"
      activeStep={activeStep}
      onActiveView={handleActiveView}
      training={{ video, exam, handsOn, slideshow, finish }}
      activeTabStats={activeTabStats}
      completionLevel={completionLevel}
      getCompletionLevel={apiCompletionLevel}
      trainingDetailStatus={trainingDetailStatus}
    >
      {trainingDetailStatus.hasOwnProperty("id") && activeStep === 'video' ? <TrainingDetailVideo
        video={video}
        setActiveStep={setActiveStep}
        employeeTrainingId={employeeTrainingId}
        setActiveTabStats={setActiveTabStats}
        trainingDetailStatus={trainingDetailStatus}
        handleSetCompletionLevel={handleCompletetionLevel}
        getCompletionLevel={getCompletionLevel}
        handleApiCompletionLevel={handleApiCompletionLevel}
      /> : null}
      {trainingDetailStatus.hasOwnProperty("id") && activeStep === 'slideshow' ? <TrainingDetailSlideshow
        slideshow={slideshow}
        setActiveStep={setActiveStep}
        setActiveTabStats={setActiveTabStats}
        employeeTrainingId={employeeTrainingId}
        completionLevel={completionLevel}
        trainingDetailStatus={trainingDetailStatus}
        handleSetCompletionLevel={handleCompletetionLevel}
        getCompletionLevel={apiCompletionLevel}
        handleApiCompletionLevel={handleApiCompletionLevel}
      /> : null}
      {trainingDetailStatus.hasOwnProperty("id") && activeStep === 'exam' ? <TrainingDetailExam
        exam={exam}
        setActiveStep={setActiveStep}
        employeeTrainingId={employeeTrainingId}
        trainingDetailStatus={trainingDetailStatus}
        handleSetCompletionLevel={handleCompletetionLevel}
        getCompletionLevel={apiCompletionLevel}
        handleApiCompletionLevel={handleApiCompletionLevel}
      /> : null}
      {trainingDetailStatus.hasOwnProperty("id") && activeStep === 'handsOn' && handsOn ? <TrainingDetailHandsOn
        handsOn={handsOn}
        setActiveStep={setActiveStep}
        setFinish={setFinish}
        employeeTrainingId={employeeTrainingId}
        trainingDetailStatus={trainingDetailStatus}
        handleSetCompletionLevel={handleCompletetionLevel}
        getCompletionLevel={apiCompletionLevel}
        handleApiCompletionLevel={handleApiCompletionLevel}
      /> : null}
      {(activeStep === 'finish' && completionLevel === 4) ?
        <TrainingDetailFinish
          setActiveStep={setActiveStep}
          employeeTrainingId={employeeTrainingId}
        /> : null}
    </TrainingDetailDashboard>
  );

};

export default TrainingDetailMainInfo;
