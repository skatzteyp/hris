import React, { useState } from 'react';
import { Textarea } from '@ligph/ui';

import { ReactComponent as IconX } from '../../assets/images/icon-x.svg'

const CategoryQuestion = ({questionNum}) => {
  const [question, setQuestion] = useState([{question: 'Can you tell me about yourself?'}])

  const handleChange = (key, value) => {
    setQuestion({
      ...question,
      [key]: value
    });
  }

  return (
    <div className="relative bg-darkmode-900 border border-darkmode-800 p-4 rounded mt-2">
      <button className="w-auto absolute right-0 mr-4 cursor-pointer z-10 focus:outline-none">
        <IconX className="stroke-current stroke-2 mr-2 transform scale-75 text-darkmode-600" />
      </button>
      <Textarea
        label={`Question ${questionNum}`}
        value={question.question}
        onChange={(e) => handleChange('question', e.target.value)}
        darkmode
      />
    </div>
  )
}

export default CategoryQuestion
