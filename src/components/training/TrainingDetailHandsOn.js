import React, { useEffect, useState } from 'react';
import { Marp } from '@marp-team/marp-react';
import { Button, Text } from '@ligph/ui';
import 'highlight.js/styles/atelier-lakeside-dark.css';
import hljs from 'highlight.js';

import './TrainingHandsOn.scss';
import { updateEmployeeTraining } from '../../redux/modules/employee/employeeActions';
import { useDispatch } from 'react-redux';

const TrainingDetailHandsOn = ({
    handsOn,
    employeeTrainingId,
    setActiveStep,
    handleSetCompletionLevel,
    trainingDetailStatus,
    getCompletionLevel
  }) => {

  const dispatch = useDispatch();

  const [trainingHandsOn, setTrainingHandsOn] = useState({ link: '', password: '' });
  const [endScroll, setEndScroll] = useState(false);

  const { content, password } = handsOn || {}

  const customRenderer = slides => (
    <div className="training-details-marp">
      {slides.map(({ slide }, i) => (
        <div className="slide" key={i} onScroll={handleScroll}>
          {slide}
        </div>
      ))}
    </div>
  )


  const handleTrainingHandsOn = (key, value) => (
    setTrainingHandsOn({
      ...trainingHandsOn,
      dirty: true,
      [key]: value,
    })
  )

  useEffect(() => {
    if (password === trainingHandsOn.password) {
      //dispatch
      console.log('pass');
    } 
  }, [trainingHandsOn, password])

  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  });

  const handleScroll = (e) => {
    const target = e.target;

    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setEndScroll(true);
    }
  }

  useEffect(() => {
    if (trainingDetailStatus.length > 0) {
      const { completionLevel } = trainingDetailStatus;
      if ((employeeTrainingId !== null || employeeTrainingId !== undefined ) && completionLevel === 3) {
        dispatch(updateEmployeeTraining({id: employeeTrainingId, completionLevel: 4}))
      }
    }
  }, [dispatch, trainingDetailStatus, employeeTrainingId]);

  const handleHandsOnSubmit = () => {
    handleSetCompletionLevel(4);
    setActiveStep('finish');

    if (employeeTrainingId !== null || employeeTrainingId !== undefined) {
      dispatch(updateEmployeeTraining({
        id: employeeTrainingId,
        completionLevel: 4
      }))
    }
  }
  
  return (
    <>
      <Marp markdown={content} render={customRenderer} options={{ html: true }}/>
      <div className="mx-12 border-gray-border border-t-2 pt-10">
        <p className="block font-semibold text-sm mb-5">Upload Hands On Output</p>
        <div className="w-full">
            <Text
              type="text"
              label="Link"
              // icon={<IconLink/>}
              value={trainingHandsOn.link}
              onChange={(e) => handleTrainingHandsOn('link', e.target.value)}
            />
        </div>
      </div>
      <div className="mt-8 mr-8 mb-12 px-12">
        <p className="text-xs">
          Once your hands on output is done and checked, your reviewer will give you a password to input in the field.
        </p>
        <div className="flex justify-between items-center">
          <div className="w-64 mt-4">
            <Text
              type="password"
              placeholder="Enter password"
              value={trainingHandsOn.password}
              onChange={(e) => handleTrainingHandsOn('password', e.target.value)}
            />
          </div>
          <Button
            variant="fill"
            color="purple"
            className="px-8 py-2 h-12"
            disabled={endScroll === false && password !== trainingHandsOn.password}
            onClick={handleHandsOnSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  )
}

export default TrainingDetailHandsOn;
