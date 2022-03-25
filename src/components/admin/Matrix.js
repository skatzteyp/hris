import React, { useState } from 'react';

import { Button } from '@ligph/ui';
import { ReactComponent as IconX } from '../../assets/images/icon-x.svg'

const Matrix = ({matrixNum}) => {
  const [value, setValue] = useState({ description: 'Lorem ipsum dolor' })

  return (
    <div className="bg-darkmode-900 p-8 rounded mt-4">
      <p className="text-sm text-white">Matrix {matrixNum}</p>
      <div className="mt-6">
        <h5 className="text-sm text-darkmode-600">Description</h5>
        <input 
          className="bg-darkmode-600 w-full outline-none text-sm text-white py-1 px-2 rounded mt-2" 
          type="text" 
          value={value.description} 
          onChange={e => setValue({...value, description: e.target.value})} 
        />
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-end">
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
  )
}

export default Matrix
