import React, { useState } from 'react';

import { Button } from '@ligph/ui';
import { ReactComponent as IconX } from '../../assets/images/icon-x.svg'
import { ReactComponent as IconAdd } from '../../assets/images/icon-plus.svg';

import CategoryQuestion from './CategoryQuestion'

const CategoryForm = () => {
  const [value, setValue] = useState({ name: 'Lorem ipsum dolor' })
  const [questionList, setQuestionList] = useState([1,2,3])
  const [count, setCount] = useState(4);

  const handleAddQuestion = () => {
    setCount(count + 1);
    setQuestionList([
      ...questionList,
      count
    ]);
  }

  return (
    <div>
      <div className="bg-darkmode-900 p-8 rounded mt-4">
        <div>
          <h5 className="text-sm text-white">Category Name</h5>
          <input 
            className="bg-darkmode-800 w-1/2 outline-none text-sm text-white py-2 px-3 mt-2 rounded" 
            type="text" 
            value={value.name} 
            onChange={e => setValue({...value, name: e.target.value})} 
          />
        </div>
        <div className="mt-6">
          {questionList.map((e) => (
            <CategoryQuestion key={e} questionNum={e} />
          ))}
          <div className="flex items-center mt-8">
            <Button
              variant="outline"
              onClick={() => handleAddQuestion()}
              color="orange"
              className="mr-8"
              >
              <IconAdd className="stroke-2 stroke-current w-3 h-3 mr-2" />
              Add Question
            </Button>
            <Button
              color="red"
              variant="outline"
            >
              <IconX className="stroke-current stroke-2 mr-2 transform scale-75" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-darkmode-900 p-8 rounded mt-4">
        <div>
          <h5 className="text-sm text-white">Category Name</h5>
          <input 
            className="bg-darkmode-800 w-1/2 outline-none text-sm text-white py-2 px-3 mt-2 rounded" 
            type="text" 
            value={value.name} 
            onChange={e => setValue({...value, name: e.target.value})} 
          />
        </div>
        <div className="mt-6">
          <div className="flex items-center mt-8">
            <Button
              variant="outline"
              onClick={() => handleAddQuestion()}
              color="orange"
              className="mr-8"
              >
              <IconAdd className="stroke-2 stroke-current w-3 h-3 mr-2" />
              Add Question
            </Button>
            <Button
              color="red"
              variant="outline"
            >
              <IconX className="stroke-current stroke-2 mr-2 transform scale-75" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryForm
