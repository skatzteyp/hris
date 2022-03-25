import React, { useState } from 'react';

import { ReactComponent as IconCheck }  from '../../assets/images/icon-check.svg';
import { ReactComponent as IconClose }  from '../../assets/images/icon-close.svg';
import './TrainingExam.scss';

const TrainingDetailExamChoices = ({
  choicesItem,
  questionId,
  answerId,
  isCorrectIcon,
  isSubmitted,
  questionPosition,
  onChangeStoreAnswers}) => {

  const { text, id, isCorrect } = choicesItem || {}
  const [ answer, setAnswer ] = useState(0);

  let checkCorrectId = choicesItem.id === answerId
  let bgColor = isSubmitted && checkCorrectId ? (isCorrectIcon ? 'bg-green-200' : 'bg-red-200') : '';

  const onChangeAnswer = (value) => {
    onChangeStoreAnswers({ questionId, answerId: id, questionPosition, count: value });
    setAnswer(id);
  }

  const checkAnswer = answer === id ? true : false

  return (
    <>
      <label htmlFor={id} className={`relative py-2 px-4 hover:bg-purple-100 rounded flex cursor-pointer ${bgColor}`}>
        {
          (() => {
            if (isSubmitted && checkCorrectId)
              if (isCorrectIcon)
                return(
                  <>
                  <div className="exam-icon absolute left-0 top-0 z-20 bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center">
                    <IconCheck className="fill-current"/>
                  </div>
                  </>
                );
              else
                return(
                  <>
                  <div className="exam-icon absolute left-0 top-0 z-20 bg-red text-white w-6 h-6 rounded-full flex items-center justify-center">
                    <IconClose className="fill-current"/>
                  </div>
                  </>)
          })()
        }
          <input
            type="radio"
            defaultChecked={ checkAnswer }
            className="exam-radio inline-block relative mt-2"
            label={ text }
            name={`result[${questionId}]`}
            value={id}
            onClick={ (e) => onChangeAnswer(isCorrect) }
            disabled={ isSubmitted }
            id={id}
          />

          <span className="training-choices-label ml-2">
              {text}
          </span>
      </label>
    </>
  )
}

export default TrainingDetailExamChoices;

