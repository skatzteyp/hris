import React, { useState, useEffect }  from 'react';
// import dummyVideo from '../../assets/images/dummy.mp4';
import { Button } from '@ligph/ui';
import useEmployee from '../../hooks/useEmployee';

const TrainingDetailVideo = ({
    video,
    setActiveStep,
    setActiveTabStats,
    employeeTrainingId,
    handleSetCompletionLevel,
    trainingDetailStatus,
    getCompletionLevel,
    handleApiCompletionLevel
  }) => {

  const { sourcePath } = video || {};

  const { updateEmployeeTraining } = useEmployee();
  const { completionLevel } = trainingDetailStatus || {}
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    if((video)){
      if( video.sourcePath === null){
        handleApiCompletionLevel(1);
        handleSetCompletionLevel(1);
        setActiveStep('slideshow');
      }
    }
  },[ video, handleApiCompletionLevel, handleSetCompletionLevel, setActiveStep ]);

  const handleOnEndedVideo = () => {
    setVideoEnded(true);

    if (trainingDetailStatus.hasOwnProperty("id") && completionLevel <= 0) {
      if (employeeTrainingId !== null || employeeTrainingId !== undefined) {
        // trigger completetion level if slideshow blank +1 = 2 = exam
        handleApiCompletionLevel(1);
        updateEmployeeTraining({ id: employeeTrainingId, completionLevel: 1 })
      }
    }
  }

  useEffect(() => {
    if( getCompletionLevel >= 1){
      setVideoEnded(true);
    }
  },[ getCompletionLevel ]);

  return (
    <>
      <div className="p-12 bg-black-900">
        <video className="focus:outline-none" autoPlay muted width="100%" controls onEnded={handleOnEndedVideo}>
        {/* <video className="focus:outline-none" autoPlay muted width="100%" controls > */}
          {sourcePath !== undefined && (
            <source src={sourcePath} type="video/mp4"/>
          )}
        </video>
      </div>
      <div className="my-8 mr-8 flex justify-end">
        <Button
          variant="fill"
          color="purple"
          className="px-8 py-4 h-auto"
          disabled={videoEnded === false}
          onClick={() => {
            // if (videoEnded) {
              setActiveStep('slideshow');
              handleSetCompletionLevel(1);
              setActiveTabStats({video: true, slideshow: false})
            // }
          }}
        >
            {getCompletionLevel >= 1 ? 'Next' : 'Done'}
        </Button>
      </div>
    </>
  )
}

export default TrainingDetailVideo;
