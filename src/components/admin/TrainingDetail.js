import React, {useState, useEffect} from 'react';
import { Text, Button, Textarea, Loader } from '@ligph/ui';

import useDebounce from '../../hooks/useDebounce';
import useTraining from '../../hooks/useTraining';
import Category from './Category'
import LoadingMessage from '../common/LoadingMessage';
import { Marp } from '@marp-team/marp-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateTrainingCategory,
  getListOfTrainingCategories,
  // updateCategoryByTraining,
} from '../../redux/modules/training/trainingActions';

// import { ReactComponent as IconX } from '../../assets/images/icon-x.svg'

const TrainingDetail = ({ valid, updateStats }) => {
  const dispatch = useDispatch();

  const { categories: allCategories } = useSelector(state => state.training);
  
  const { training, updateTraining, processing, updating } = useTraining();
  const { id, title, description } = training || {};

  const [trainingDetailInfo, setTrainingDetailInfo] = useState({ id, title, description, dirty: false });
  const [categoryValue, setCategoryValue] = useState({name: '', dirty: false});
  const [process, setProcess] = useState(processing);

  const debouncedTrainingDetailInfo = useDebounce(trainingDetailInfo, 1000);
  const debouncedCat = useDebounce(categoryValue, 1000);

  useEffect(() => {
    dispatch(getListOfTrainingCategories());
  }, [dispatch])
  
  useEffect(() => {
    setTrainingDetailInfo({ id, title, description, dirty: false });
  }, [id, title, description]);


  const handleTrainingDetailInfo = (key, value) => (
    setTrainingDetailInfo({
      ...trainingDetailInfo,
      dirty: true,
      [key]: value,
    })
  )

  const addCategory = (category) => {
    setCategoryValue({ name: category, dirty: true });
  }

  const handleAddCategory = () => {
    if (categoryValue.dirty && debouncedCat.dirty) {
      let data = { name: categoryValue.name };

      dispatch(updateTrainingCategory(data));
      
      setCategoryValue({
        name: '',
        dirty: false,
      });
    }
  }

  useEffect(() => {
    if (trainingDetailInfo.dirty && debouncedTrainingDetailInfo.dirty) {
      let data = { ...trainingDetailInfo };
      delete data.dirty;

      //mutation
      updateTraining(data)

      setTrainingDetailInfo({
        ...trainingDetailInfo,
        dirty: false
      })
    }
  }, [trainingDetailInfo, debouncedTrainingDetailInfo, updateTraining]);


  useEffect(() => {
    if (trainingDetailInfo.title !== null && trainingDetailInfo.description !== null) {
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

  const validTitle = trainingDetailInfo.title !== null ? '' : 'Training Topic Title is required';
  const validDescription = trainingDetailInfo.description !== null ? '' : 'Please add a description for the topic provided';

  return (
    <>
      {processing && process ? <div className="relative min-h-sm"><Loader /></div> : 
      updating ? <LoadingMessage text="Saving"/>
      : null
    }
    <div>
      <div className="px-8 bg-darkmode-900 text-white rounded pb-8">
        <h3 className="text-l font-normal mr-2 text-white">Training Detail</h3>
        <div className="mt-8">
          <h4 className="text-xs font-semibold">Training Title</h4>
          <div className="bg-darkmode-800 p-2 rounded mt-2">
            <Text className="w-2/5"
              type="text"
              placeholder={"Enter Training Title"}
              value={trainingDetailInfo.title}
              onChange={(e) => handleTrainingDetailInfo('title', e.target.value)}
              error={validTitle}
              darkmode />
          </div>
        </div>
        <div className="mt-8">
          <h4 className="text-xs font-semibold">Category</h4>
          <div className="relative flex flex-wrap -mx-2">
            { allCategories && allCategories.map( (cat) => {
              return <div className="px-2 w-1/3"><Category width="w-full" key={cat.id} id={cat.id} trainingId={id} title={cat.name} /></div>
            } )}
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-xs font-semibold">Add Category</h4>
          <div className="flex mt-2">
            <Text className="w-1/2"
              type="text"
              onChange={(e) => addCategory(e.target.value)}
              value={categoryValue.name}
              darkmode />
            <Button className="px-8 ml-4" color="orange" variant="fill" onClick={handleAddCategory} darkmode >Add</Button> 
          </div>
        </div>

        <div className="pt-8 flex justify-between">
          <div className="w-1/2 mr-6">
            <h4>Content</h4>
            <div className="h-64 w-full py-4 pl-4 pr-2 mt-2 bg-darkmode-800 rounded-md">
              <div className="h-full w-full overflow-y-scroll custom-scrollbar">
              <Textarea
                  cols="20"
                  rows="10"
                  value={trainingDetailInfo.description || ''}
                  onChange={(e) => handleTrainingDetailInfo('description', e.target.value)}
                  error={validDescription}
                  darkmode
                />
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <h4>Preview</h4>
            <div className="h-64 w-full py-4 pl-4 pr-2 mt-2 bg-darkmode-800 rounded-md">
              <div className="h-full w-full overflow-y-scroll custom-scrollbar">
                <Marp markdown={trainingDetailInfo.description} render={customRenderer} options={{ html: true }} />
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </>
  );
}

export default TrainingDetail;
