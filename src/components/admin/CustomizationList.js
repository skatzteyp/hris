import React, { useState } from 'react';
import { Button } from '@ligph/ui';

import { ReactComponent as IconX } from '../../assets/images/icon-x.svg';
import { ReactComponent as IconEdit } from '../../assets/images/icon-edit.svg';

import ColorPicker from '../../components/admin/ColorPicker';

function CustomizationList(props) {
  const array = props.items;

  const [active, setActive] = useState('');
  
  const handleClick = (key) => setActive(key);
  const handleCancel = () => setActive('');

  const box = 
  <div className="bg-darkmode-800 bg-opacity-50 p-6 mt-2 mb-3 rounded">
    <span className="text-xs text-white mb-4 block font-light">Assign Color</span>
    <ColorPicker />
    <div className="flex mt-6">
      <Button
        color="orange"
        variant="fill"
        className="px-10 py-3 mr-2 text-xs font-medium"
      >
        Save
      </Button>
      <Button
        color="gray"
        className="px-6 py-3 text-gray-100"
        onClick={() => handleCancel()}
      >
        Cancel
      </Button>
    </div>
  </div>;

  const list = array.map((item) => (
    <li key={item} className="mb-2">
      <div className="flex bg-darkmode-800 px-3 py-1 items-center justify-between rounded">
        <h4 className="font-light	text-white text-sm">{item}</h4>
        <div className="flex">
          <Button className="pl-0 pr-4" onClick={() => handleClick(item)}><IconEdit className="fill-current	text-gray"/></Button>
          <Button className="pl-0 pr-1"><IconX className="stroke-current stroke-2 text-gray transform scale-75" /></Button>
        </div>
      </div>
      <div className={`hidden${item === active ? 'block' : ''}`}>
        {box}
      </div>
    </li>
  ))

  return (
    <div>
      {list}
    </div>
  )
}

export default CustomizationList;