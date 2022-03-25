import React, { useState, useEffect, useCallback } from 'react';
import { Textarea, Button, Loader } from '@ligph/ui';
import { ReactComponent as IconAdd } from '../../assets/images/icon-plus.svg';
import { ReactComponent as IconX } from '../../assets/images/icon-x.svg'

import useDebounce from '../../hooks/useDebounce';
import useTraining from '../../hooks/useTraining';
import LoadingMessage from '../common/LoadingMessage';

// import {
//   getTrainingQuestion,
// } from '../../redux/modules/training/trainingActions';

// import { useSelector, useDispatch } from 'react-redux';

import TrainingExamChoices from '../../components/admin/TrainingExamChoices';

const TrainingExamQuestion = ({ questionItem, examId, count, updateStats }) => {

  // const { training: { training } } = useSelector(state => state);

  const {deleteTrainingQuestion, updateTrainingChoice, updateTrainingQuestion, processing, updating } = useTraining();

  const { question, choices, id } = questionItem || {}

  const [trainingQuestion, setTrainingQuestion] = useState({id, examId, question, sortOrder: 1, dirty: false});
  const [correctChoicesId, setCorrectChoicesId] = useState(0);
  const [countChoices, setCountChoices] = useState(0);
  const [choicesList, setChoicesList] = useState(choices);

  const [process, setProcess] = useState(processing);
  const debouncedTrainingQuestion= useDebounce(trainingQuestion, 1000);

  //setcount by choices.length
  useEffect(() => {
    if(choicesList && choicesList.length){
      setCountChoices(choicesList.length);
    }
  }, [choicesList]);

  //first load set questionItem on create
  useEffect(() => {
    if(id !== 0) {
      setTrainingQuestion(questionItem);
    }
  }, [id, questionItem ]);

  useEffect(() => {
    if (trainingQuestion.dirty && debouncedTrainingQuestion.dirty) {
      let data = { ...trainingQuestion };
      delete data.dirty;

      //mutation
      updateTrainingQuestion(data)

      setTrainingQuestion({
        ...trainingQuestion,
        dirty: false
      })
    }
  }, [trainingQuestion, debouncedTrainingQuestion, updateTrainingQuestion]);

  const handleDeleteQuestion = () => {
    console.log( trainingQuestion );
    let data = { ...trainingQuestion };
    deleteTrainingQuestion(data);
  }

  const handleTrainingQuestion = (value) => {
    setTrainingQuestion({...trainingQuestion, question: value, dirty:true});
  }

  //use callback for update all choices when selecting answer
  const onChangeCorrectChoices = useCallback(value => {
    setCorrectChoicesId(value);
  }, []);

  useEffect(() => {
    if (choices) {
      setChoicesList([...choices]);
    }
  }, [questionItem, choices])

  useEffect(() => {
    if(updating) {
      setProcess(false);
      updateStats(false);
    }
  }, [updating, updateStats])

  const handleClick = () => {
    setCountChoices(countChoices + 1);

    //add 1 choices request
    let data = { text: 'New Choices', question: { connect: id }, isCorrect: false }
    updateTrainingChoice(data);

    setChoicesList([
      ...choicesList || [],
      { id: 0,
        isCorrect: false,
        dirty: false}
    ]);
  }

  // console.log(`${id} - choicesList`, choicesList);

  return(
    <>
      {processing && process ?
       <div className="relative min-h-sm">
         <Loader darkmode/>
       </div> :
         updating ? <LoadingMessage text="Saving"/>
       : null
       }
      <div key={ id } className="mt-8 p-4 border border-darkmode-800 rounded relative">
        <button onClick={() =>handleDeleteQuestion()} >
          <span className="absolute top-0 right-0 text-white bg-red rounded-full flex items-center justify-center w-6 h-6 transform scale-75 -mt-2 -mr-2 cursor-pointer"><IconX className="stroke-current block stroke-2 transform scale-75"/></span>
        </button>
        <div className="mb-2">

            {/* herer 
            questionItem {questionItem.id} /
            State {trainingQuestion.id} */}

          <Textarea
            label={`Question ${count}`}
            defaultValue={trainingQuestion.question}
            onChange={(e) => handleTrainingQuestion(e.target.value)}
            darkmode
          />

            {choicesList && choicesList.map((choicesItem, index) => (
              <div key={`${id}-exam-choices-${index}`} >
                <TrainingExamChoices
                  onChangeCorrectChoices={onChangeCorrectChoices}
                  choicesItem={choicesItem}
                  count={index + 1}
                  isCorrectChoicesId={ correctChoicesId }
                  questionId={id}
                />
              </div>
            ))}

            <div className="mt-8">
              <Button
                className="text-blue"
                onClick={() => handleClick()}
                color="orange"
              >
                <IconAdd className="stroke-2 stroke-current w-3 h-3 mr-2" />
                  Add Option
              </Button>
            </div>
          </div>
      </div>
    </>
  )
}

export default TrainingExamQuestion;
