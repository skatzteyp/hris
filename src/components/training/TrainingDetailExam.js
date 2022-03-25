import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@ligph/ui';
import moment from 'moment';
// import useEmployee from '../../hooks/useEmployee';

import { useSelector, useDispatch } from 'react-redux';
import { createEmployeeTrainingHistory, updateEmployeeTraining } from '../../redux/modules/employee/employeeActions';

import TrainingDetailExamChoices from '../../components/training/TrainingDetailExamChoices';

import 'highlight.js/styles/atelier-lakeside-dark.css';
import './TrainingExam.scss';

const TrainingDetailExam = ({
    exam,
    setActiveStep,
    employeeTrainingId,
    handleSetCompletionLevel,
    trainingDetailStatus,
    getCompletionLevel,
    handleApiCompletionLevel
  }) => {

  const dispatch = useDispatch();
  const {  training: { training: { handsOn }} } = useSelector(state => state);

  const { questions } = exam || [];

  const [submit, setSubmit] = useState(false);
  const [ shuffleQuestions, setShuffleQuestions ] = useState([]);
  const [ questionsWithAnswer, setQuestionsWithAnswer ] = useState([]);
  const [ questionCount, setQuestionCount ] = useState(0);
  const [ scoreCount, setScoreCount ] = useState(0);
  const [ attemptCount, setAttemptCount ] = useState(1);
  const [ average, setAverage ] = useState();

  const [ submitted, setSubmitted ] = useState(false);

  useEffect(() => {
    if(questions){
      setShuffleQuestions(shuffleArray(questions));
      setQuestionCount(questions.length);
    }
  }, [ questions ]);

  const shuffleArray = (array)  => {
    const shuffle = array.sort(() => Math.random() - 0.5);
    return shuffle;
  }

  const handleRetake = () => {
    setAttemptCount(attemptCount + 1);
    setQuestionsWithAnswer(prevState => []);

    setShuffleQuestions(prevState => []);
    setShuffleQuestions(prevState => shuffleArray(questions));

    setSubmit(false);
    setAverage(false);
    setScoreCount(0);
    setSubmitted(false);

    dispatch(updateEmployeeTraining({ id: employeeTrainingId, completionLevel: 0 }))

    setTimeout(() => {
      setActiveStep('video');
      handleSetCompletionLevel(0);
    }, 900);
  }

  useEffect(() => {
    const calculatedAverage = ( scoreCount / questionCount) * 100
    const checkPassingScore  = ( calculatedAverage  >=  70)
    setAverage(prevState => checkPassingScore);
  },[submit, scoreCount, questionCount ]);

 const createEmployeeTrainingHistoryData = useCallback(() => {
       const dateNow = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
       // first dispatch
       const data = {
         numAttempts: attemptCount,
         employeeTrainingId,
         score: scoreCount,
         totalScore: questionCount,
         isPassed: scoreCount === questionCount,
         dateTaken: dateNow,
         dateFinish: scoreCount === questionCount ? dateNow : ''
       }
       dispatch(createEmployeeTrainingHistory(data));
  }, [
     attemptCount, scoreCount, questionCount, employeeTrainingId, dispatch
  ])

  useEffect(() => {
    if (submit && !submitted) {
      const dateNow = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

      if(average !== undefined){
        if( average === true ) {
          dispatch(updateEmployeeTraining({id: employeeTrainingId, completionLevel: 3, completedAt: dateNow}));
          handleSetCompletionLevel(3);
          handleApiCompletionLevel(1);
          setSubmitted(true);
        }
      }
    }
  }, [
    submit, dispatch, submitted, employeeTrainingId, average,
    handleApiCompletionLevel, handleSetCompletionLevel, createEmployeeTrainingHistoryData
  ])


  const handleSubmit = () => {
    setSubmit(prevState => true);

    shuffleQuestions.forEach(function(questionItem) {
      if(questionItem.count){
        setScoreCount(prevState => prevState + 1);
      }
    })

    createEmployeeTrainingHistoryData();
  };

  const onChangeStoreAnswers = useCallback((value) => {
    const allQuestions = shuffleQuestions;
    const setAnswer = allQuestions[value.questionPosition]

    setAnswer.answerId =  value.answerId
    setAnswer.count = value.count
    setQuestionsWithAnswer([...questionsWithAnswer, {...setAnswer}]);

  },[ shuffleQuestions, questionsWithAnswer ]);

  return (
    <>
      <div className="p-12 text-black">
        <p className="text-xs mb-4">Attempt No. <strong> { attemptCount }</strong></p>
        <p className="text-sm mb-4">
          <strong className="block text-xs mb-1">Instruction:</strong>
           Please select the correct answer for the following multiple choice questions.
        </p>

          {/* shuffleQuestions && shuffleQuestions.map((finalItem, index) => (
              <div key={`${finalItem.id}-${finalItem.answerId}-${index}`}>
                  { finalItem.answerId } / { finalItem.count ? "true" : "false"}
                <br/>
              </div>
            ))*/}

        <ol className="text-sm list-decimal list-inside">
        { questions && shuffleQuestions.map((questionItem, index) => (
          <li key={`question-${questionItem.id}-${index}`} className="pb-6">
            <div className="font-semibold mb-5 leading-7 -mt-6 ml-6">
                <p className="font-semibold mb-5 leading-7 -mt-6 ml-6">
                    { questionItem.question }
                </p>

                <ul className="border-b border-purple-100 mt-5 pb-8 mb-4 pl-6 grid grid-cols-2 gap-4">
                    { questionItem.choices && questionItem.choices.map((choicesItem) => (
                      <li key={`${questionItem.id}-choices-${choicesItem.id}`}>
                          <TrainingDetailExamChoices choicesItem={choicesItem}
                            questionId={questionItem.id}
                            answerId={questionItem.answerId}
                            isCorrectIcon={ questionItem.count }
                            isSubmitted={ submit }
                            questionPosition={index}
                            onChangeStoreAnswers={onChangeStoreAnswers}
                          />
                       </li>
                     ))}
                </ul>

             </div>
           </li>
        ))}
        </ol>
     </div>

     <div className="mt-8 mr-8 mb-12 flex px-12 justify-between">
       {(() => {
         if( submit ){
           return(
             <div className="flex items-center">
               <div className="flex items-center bg-purple-100 py-3 px-4 rounded">
                 <span className="text-sm">Your Score </span>
                 <strong className="text-lg pl-3 leading-none"> { scoreCount }/{ questionCount }</strong>
               </div>
               <div className="flex items-center bg-purple-100 py-3 px-4 rounded ml-3">
                 <span className="text-sm">Your Rating</span>
                 <strong className={`px-2 ml-4 text-xs text-white inline-block bg-${ average ? 'green' : 'red'}-600 uppercase`}>
                     { average ? 'Passed' : 'Failed' }
                  </strong>
               </div>
             </div>
           );
         }else{
           return(
             <div></div>
           );
         }
       })()}

       {(() => {
         if( submit ){
           return(
             <Button
               variant="fill"
               color={scoreCount === questionCount ? 'purple' : 'red'}
               className="px-8 py-4 h-auto"
               onClick={scoreCount === questionCount ? () => {
                 if (handsOn) {
                   setActiveStep('handsOn')
                   handleSetCompletionLevel(3);
                 } else {
                   setActiveStep('video')
                   handleSetCompletionLevel(0);
                 }
               } : handleRetake}
             >
               {scoreCount === questionCount ? 'Done' : 'Retake'}
             </Button>
           );
         }else{
           return(
             <Button
               variant="fill"
               color="purple"
               className="px-8 py-4 h-auto"
               onClick={(e) => handleSubmit(e)}
             >
               Submit
             </Button>
           );
         }
       })()}
     </div>
    </>
  )
}

export default TrainingDetailExam;

