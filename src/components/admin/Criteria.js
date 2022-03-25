import React, { useState } from 'react';

import { Button } from '@ligph/ui';
import { ReactComponent as IconX } from '../../assets/images/icon-x.svg'

const Criteria = ({criteriaNum}) => {
  const [value, setValue] = useState({ description: 'Lorem ipsum dolor', equivalent: '10%' })

  return (
    <div className="bg-darkmode-900 p-8 rounded mt-4">
      <p className="text-sm text-white">Criteria {criteriaNum}</p>
      <div className="mt-6">
        <h5 className="text-sm text-darkmode-600">Description</h5>
        <input 
          className="bg-darkmode-600 w-full outline-none text-sm text-white py-1 px-2 rounded" 
          type="text" 
          value={value.description} 
          onChange={e => setValue({...value, description: e.target.value})} 
        />
      </div>
      <div className="mt-6">
        <h5 className="text-sm text-white text-darkmode-600">% Equivalent</h5>
        <div className="flex items-center justify-between">
          <input 
            className="bg-darkmode-600 outline-none text-sm text-white py-1 px-2 rounded" 
            type="text" 
            value={value.equivalent} 
            onChange={e => setValue({...value, equivalent: e.target.value})} 
          />
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

export default Criteria
