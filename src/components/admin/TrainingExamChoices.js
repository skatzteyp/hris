import React, { useState, useEffect } from 'react';
import { Text, Radio, Loader } from '@ligph/ui';

import { useDispatch } from 'react-redux';

import { updateTrainingChoice as upsertTrainingChoice } from '../../redux/modules/training/trainingActions';
import { ReactComponent as IconX } from '../../assets/images/icon-x.svg'

import useDebounce from '../../hooks/useDebounce';
import useTraining from '../../hooks/useTraining';
import LoadingMessage from '../common/LoadingMessage';

const TrainingExamChoices = ({onChangeCorrectChoices, isCorrectChoicesId, questionId, choicesItem, count }) => {
  
  const dispatch = useDispatch();
  const {  deleteTrainingChoice,  updateTrainingChoice, processing, updating } = useTraining();
  const { text, id, isCorrect } = choicesItem || {}

  const [ trainingChoice, setTrainingChoice] = useState({ id, text, isCorrect, sortOrder: count, dirty: false });
  const [process, setProcess] = useState(processing);

  const debouncedTrainingChoice= useDebounce(trainingChoice, 1000);

  useEffect(() => {
    setTrainingChoice(choicesItem);
  }, [choicesItem]);
  
  //  tigger on update choices correct choices ( radio button )
   useEffect(() => {
     if (isCorrectChoicesId !== 0) {
       if (isCorrectChoicesId === id) {
        //  console.log('here', id);
         dispatch(upsertTrainingChoice({id: id, isCorrect: true}))
       } else {
        //  console.log('else', id);
        dispatch(upsertTrainingChoice({id: id, isCorrect: false}))
       }
     } 
  }, [id, isCorrectChoicesId, dispatch]);
  
  useEffect(() => {
    if (trainingChoice.dirty && debouncedTrainingChoice.dirty) {
      let data = { ...trainingChoice, question: { connect: questionId } };

      delete data.dirty;

      //mutation
      updateTrainingChoice(data)

      setTrainingChoice({
        ...trainingChoice,
        dirty: false
      })
    }
  }, [trainingChoice, debouncedTrainingChoice, questionId, updateTrainingChoice]);
  
  useEffect(() => {
    if(updating) {
      setProcess(false);
    }
  }, [updating])
  
  const handleTrainingChoice = (key,value) => {
    setTrainingChoice({
      ...trainingChoice,
      [key]: value,
      dirty:true});
  }


  const handleDeleteChoices = () => {
    let data = { ...trainingChoice, question: { connect: questionId } };
    deleteTrainingChoice(data);
  }

  return(
    <>
      {processing && process ?
       <div className="relative min-h-sm">
         <Loader />
       </div> :
         updating ? <LoadingMessage text="Saving"/>
       : null
       }

      <div className="mt-6">
        <div className="flex items-center">

          {/* choiceItem
          { choicesItem.id }

          <br/>
          trainingChoice
          { trainingChoice.id } */}

          <Radio
            name={`question-choices-${questionId}`}
            variant="fill"
            className="block mt-3"
            checked={isCorrectChoicesId !== 0 ? ( trainingChoice.id === isCorrectChoicesId) : isCorrect}
            onChange={(e) => onChangeCorrectChoices(id)}
            darkmode
          />
          <Text
            label={`Option ${count}`}
            name="text"
            className="w-full"
            value={trainingChoice.text}
            onChange={(e) => handleTrainingChoice('text', e.target.value)}
            darkmode
          />

          <button onClick={() =>handleDeleteChoices()} >
            <span className="text-white bg-red rounded-full flex flex-shrink-0 items-center justify-center w-6 h-6 transform scale-75 mt-6 ml-2 cursor-pointer"><IconX className="stroke-current block stroke-2 transform scale-75" /></span>
          </button>

        </div>
     </div>
    </>
  )
}

export default TrainingExamChoices;
