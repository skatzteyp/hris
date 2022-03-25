import React, {useState, useEffect} from 'react';
import { Text, Loader } from '@ligph/ui';

import useDebounce from '../../hooks/useDebounce';
import useTraining from '../../hooks/useTraining';
import dummyVideo from '../../assets/images/dummy.mp4';
import { ReactComponent as IconLink } from '../../assets/images/icon-link.svg';
import LoadingMessage from '../common/LoadingMessage';

const TrainingVideo = ({ valid, title, updateStats }) => {
  const { training, updateTrainingVideo, processing, updating } = useTraining();

  const { video, id: trainingId } = training || {}
  const { sourcePath, id } = video || {}

  const [trainingVideo, setTrainingVideo] = useState({id, trainingId, sourcePath, dirty: false});
  const [process, setProcess] = useState(processing);

  const debouncedTrainingVideo = useDebounce(trainingVideo, 1000);

  useEffect(() => {
    setTrainingVideo({ id, trainingId, sourcePath, dirty: false });
  }, [sourcePath, id, trainingId]);

  const handleTrainingVideo = (value) => {
    setTrainingVideo({...trainingVideo, sourcePath: value, dirty:true});
  }

  useEffect(() => {
    if (trainingVideo.dirty && debouncedTrainingVideo.dirty) {
      let data = { ...trainingVideo };
      delete data.dirty;

      //mutation
      updateTrainingVideo(data)

      setTrainingVideo({
        ...trainingVideo,
        dirty: false
      })
    }
  }, [trainingVideo, debouncedTrainingVideo, updateTrainingVideo]);

  useEffect(() => {
    if(updating) {
      setProcess(false);
      updateStats(false);
    }
  }, [updating, updateStats])

  useEffect(() => {
    if (trainingVideo.sourcePath != null && trainingVideo.trainingId != null) {
      return valid(false);
    }
    else {
      return valid(true);
    }
  });
  
  // const validVideo = trainingVideo.sourcePath !== null ? '' : 'Video Link is required';
  
  return(
    <>
      {processing && process ?
        <div className="relative min-h-sm">
          <Loader />
        </div> :
          updating ? <LoadingMessage text="Saving"/>
        : null
        }
      <div className="px-8">
        <h3 className="text-l font-normal mr-2 text-white">{title}</h3>
        <div className="p-14 mt-8">
          <h4 className="text-xs text-white">Preview video</h4>
          <video className="focus:outline-none mt-2" width="100%" controls>
            <source src={ trainingVideo.sourcePath || dummyVideo} type="video/mp4"/>
          </video>
          <h4 className="text-xs text-white mt-8">Video URL</h4>
          <div className="flex mt-2 pb-4">
            <div className="bg-darkmode-800 w-full rounded-md rounded-r-none px-4">
              <Text type="text"
                  placeholder={"Enter Training Video Link"}
                  value={trainingVideo.sourcePath}
                  onChange={(e) => handleTrainingVideo(e.target.value)}
                  // error={validVideo}
                  darkmode />
            </div>
            <div className="p-4 flex justify-center align-center h-full bg-darkmode-600 rounded-md rounded-l-none">
              <IconLink className="fill-current" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrainingVideo;
