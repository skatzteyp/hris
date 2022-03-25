import React from 'react'

import { ReactComponent as IconEdit } from '../../assets/images/icon-edit.svg';

const Customization = ({title, onEdit, link}) => {

  return (
    <div className="bg-darkmode-900 w-1/2 flex justify-between items-center py-3 px-4 rounded mt-2">
      <p className="text-sm text-white">{title}</p>
      <button
        className="p-2 bg-orange rounded-full focus:outline-none"
        onClick={() => onEdit(link)}
      >
        <IconEdit className="cursor-pointer text-white fill-current" />
      </button>
    </div>
  )
}

export default Customization
