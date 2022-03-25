import React, { useState, useEffect } from 'react';
import { Button } from '@ligph/ui';
import { ReactComponent as IconAdd } from '../../assets/images/icon-plus.svg';
// import useTraining from '../../hooks/useTraining';

import {
  updateTrainingExam,
  updateTrainingQuestion,
} from '../../redux/modules/training/trainingActions';

import { useSelector, useDispatch } from 'react-redux';

import TrainingExamQuestion from '../../components/admin/TrainingExamQuestion';
// import useTraining from '../../hooks/useTraining';

const TrainingQuizList = ({ title, training: { trainingId }, updateStats}) => {
  // const { updateTrainingQuestion } = useTraining();
  const dispatch = useDispatch();

  const { training: { training } } = useSelector(state => state);
  
  const { id, exam } = training || {};
  const [ examList ] = useState(exam);

  const { questions } = examList || [];
  const [ questionList, setQuestionList ] = useState(questions);
  const [ count, setCount ] = useState(0);

  useEffect(() => {
    if(questionList){
      setCount(questionList.length);
    }
  },[ questionList ]);

  useEffect(() => {
    if (exam === null) {
      dispatch(updateTrainingExam({ title: 'Exam', training: { connect: id } }));
    } 
  }, [dispatch, id, exam ]);

  useEffect(() => {
    if (training && training.questionaire) {
      setQuestionList(questionList);
    }
  }, [training, questionList])

  useEffect(() => {
    if (training && training.exam && training.exam.questions && training.exam.questions.length > 0) {
      setQuestionList(training.exam.questions);
    }
  }, [training])

  const handleClick = () => {
    setCount(count + 1);
    let data = { question: 'New Question', examId: exam.id };

    dispatch(updateTrainingQuestion(data));
    
     setQuestionList([
      ...questionList || [],
      {id: 0,
      count}
    ]);
  }

  return(
    <div className="px-8 pb-8">
      <h3 className="text-l font-normal mr-2 text-white">{title}</h3>

      {exam && questionList && questionList.map(( question, index) => (
        <div key={index}>
          <TrainingExamQuestion questionItem={question} count={index + 1} examId={exam.id} updateStats={updateStats}/>
        </div>
      ))}

      <div className="mt-8">
        <Button
          variant="outline"
          onClick={() => handleClick()}
          color="orange"
          >
          <IconAdd className="stroke-2 stroke-current w-3 h-3 mr-2" />
          Add Quiz
        </Button>
      </div>

    </div>
  );
}

export default TrainingQuizList;
