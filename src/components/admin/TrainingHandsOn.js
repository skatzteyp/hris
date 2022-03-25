import React, {useState, useEffect} from 'react';
import { Marp } from '@marp-team/marp-react';
import { Textarea, Text, Loader } from '@ligph/ui';

import useDebounce from '../../hooks/useDebounce';
import useTraining from '../../hooks/useTraining';
import LoadingMessage from '../common/LoadingMessage';

import './TrainingSlideshow.scss';

// import axios from 'axios';

const TrainingHandsOn = ({ title: handsOnTitle, valid, updateStats }) => {
  const { training, updateTrainingHandsOn, processing, updating } = useTraining();
  
  const { id:trainingId, handsOn } = training || {};
  console.log(handsOn);
  const { content, id, title, description, password } = handsOn || {};
  
  const [trainingHandsOn, setTrainingHandsOn] = useState({ id, trainingId, description, dirty: false });
  const [process, setProcess] = useState(processing);
  // const [contentPreview, setContentPreview] = useState('');

  const debouncedTrainingHandsOn = useDebounce(trainingHandsOn, 1000);

  // useEffect(() => {
  //   axios.get( content )
  //     .then((res) => {
  //       setContentPreview(res.data);
  //     })
  //     .catch((error) => {
  //       setContentPreview('');
  //     });
  //   ;
  // }, [content, id, trainingId]);
  

  useEffect(() => {
    setTrainingHandsOn({ id, trainingId, content, title, password, description, dirty: false });
  }, [id, trainingId, content, title, password, description]);
  

  const handleTrainingHandsOn = (key, value) => (
    setTrainingHandsOn({
      ...trainingHandsOn,
      dirty: true,
      [key]: value,
    })
  )

  
  useEffect(() => {
    if (trainingHandsOn.dirty && debouncedTrainingHandsOn.dirty) {
      let data = { ...trainingHandsOn };
      delete data.dirty;
      
      //mutation
      updateTrainingHandsOn(data)

      setTrainingHandsOn({
        ...trainingHandsOn,
        dirty: false
      })
    }
  }, [trainingHandsOn, debouncedTrainingHandsOn, updateTrainingHandsOn]);
  

  useEffect(() => {
    if (trainingHandsOn.content !== null && trainingHandsOn.password !== null) {
      return valid(false);
    } else {
      return valid(true);
    }
  })

  useEffect(() => {
    if(updating) {
      setProcess(false);
      updateStats(false);
    }
  }, [updating, updateStats])

  const customRenderer = slides => (
    <div className="training-details-marp">
      {slides.map(({ slide }, i) => (
        <div className="slide" key={i}>
          {slide}
        </div>
      ))}
    </div>
  )

  return(
    <>
      {processing && process ?
        <div className="relative min-h-sm">
          <Loader />
        </div> :
          updating ? <LoadingMessage text="Saving"/>
        : null
      }
      <div className="px-8 pb-8">
        <h3 className="text-l font-normal mr-2 text-white">{handsOnTitle}</h3>
        <div className="flex mt-8">
          <div className="w-1/2 mr-4">
            <Textarea
              label="Content"
              value={trainingHandsOn.content}
              onChange={(e) => handleTrainingHandsOn('content', e.target.value)}
              customStyle="h-64"
              darkmode
            />
          </div>
          <div className="w-1/2">
            <label className="text-xs text-white font-semibold mb-2 inline-block">Preview</label>
            <div className="h-64 overflow-auto rounded">
            {/* <Marp markdown={contentPreview} render={customRenderer} options={{ html: true }} /> */}
            <Marp markdown={trainingHandsOn.content} render={customRenderer} options={{ html: true }} />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Text
            label="Set Password"
            type="password"
            value={trainingHandsOn.password}
            className="w-full"
            onChange={(e) => handleTrainingHandsOn('password', e.target.value)}
            darkmode
          />
        </div>
      </div>
    </>
  );
}

export default TrainingHandsOn;
