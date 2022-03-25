import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { Loader, Text } from '@ligph/ui';
import { Marp } from '@marp-team/marp-react';

import useDebounce from '../../hooks/useDebounce';
import useTraining from '../../hooks/useTraining';
import LoadingMessage from '../common/LoadingMessage';

import './TrainingSlideshow.scss';

const TrainingSlideshow = ({ valid, title, updateStats }) => {

  const { training, updateTrainingSlideshow, processing, updating } = useTraining();

  const { slideshow, id: trainingId } = training || {};
  const { content, id } = slideshow || {}

  const [trainingSlideshow, setTrainingSlideshow] = useState({id, trainingId, content, dirty: false});
  const [process, setProcess] = useState(processing);

  const debouncedTrainingSlideshow= useDebounce(trainingSlideshow, 1000); 

  const [preview, setSlideShowPreview] = useState('');

  useEffect(() => {
    // const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    
    const check = new RegExp(/\+/g);
    const replaceContent = check.test(content) ? content.replace(/\+/g, '%20') : content;

    const getContent = async () => {
      try {
        const res = await axios.get(replaceContent);
        setSlideShowPreview(res.data);
      } catch (e) {
        console.log('err', e);
        setSlideShowPreview('');
      }
    }

    getContent();
  }, [content, id, trainingId]);


  const handleTrainingSlideshow = (value) => {
    setTrainingSlideshow({...trainingSlideshow, content: value, dirty:true});
  }

  useEffect(() => {
    if (trainingSlideshow.dirty && debouncedTrainingSlideshow.dirty) {
      let data = { ...trainingSlideshow };
      delete data.dirty;

      //mutation
      updateTrainingSlideshow(data)

      setTrainingSlideshow({
        ...trainingSlideshow,
        dirty: false
      })
    }
  }, [trainingSlideshow, debouncedTrainingSlideshow, updateTrainingSlideshow]);

  useEffect(() => {
    if(updating) {
      setProcess(false);
      updateStats(false);
    }
  }, [updating, updateStats])

  useEffect(() => {
    if (trainingSlideshow.content != null && trainingSlideshow.trainingId != null) {
      return valid(false);
    }
    else {
      return valid(true);
    }
  });

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
          <Loader darkmode/>
        </div> :
          updating ? <LoadingMessage text="Saving"/>
        : null
        }
      <div className="px-8">
        <h3 className="text-l font-normal mr-2 text-white">{title}</h3>
        <div className="pt-8 text-white">
          <div className="mb-6">
            <h4 className="text-xs">Content</h4>
            <div className="w-full p-2 mt-2 bg-darkmode-800 rounded-md">
              <Text className="w-full"
                type="text"
                placeholder={"Enter Training Slideshow Link"}
                value={trainingSlideshow.content}
                onChange={(e) => handleTrainingSlideshow(e.target.value)}
                darkmode />
            </div>
          </div>
          <div className="">
            <h4 className="text-xs">Preview</h4>
            <div className="h-sm w-full py-4 pl-4 pr-2 mt-2 bg-darkmode-800 rounded-md">
              <div className="h-full w-full pr-1 overflow-y-scroll custom-scrollbar">
                <Marp markdown={preview} render={customRenderer} options={{ html: true }} />
              </div>
            </div>
          </div>
        </div>
        <br/>
      </div>
    </>
  );
}

export default TrainingSlideshow;
