import React from 'react';

import { ReactComponent as IconArrow } from '../../assets/images/icon-arrow.svg';


const EmployeeTraining = () => {
  return (
    <div>
      <h2 className="bg-orange-100 text-orange block  p-3 text-sm text-left font-semibold tracking-wide rounded">Undergone Training</h2>

      <table className="w-full border-collapse mt-5 ">
        <tr className="text-left">
          <th className="px-2 py-4 relative break-all w-2/5">
            <button className="cursor-pointer flex justify-between items-center font-medium text-xs text-orange2 uppercase focus:outline-none">
              <span className="flex-none">TRAINING NAME</span>
              <IconArrow className="text-orange stroke-current stroke-2 transform scale-75 ml-1" />
            </button>
          </th>
          <th className="px-2 py-4 relative break-all w-3/12">
            <button className="cursor-pointer flex justify-between items-center font-medium text-xs text-orange2 uppercase focus:outline-none">
              <span className="flex-none">DATE STARTED</span>
              <IconArrow className="text-orange stroke-current stroke-2 transform scale-75 ml-1" />
            </button>
          </th>
          <th className="px-2 py-4 relative break-all" style={{width: "28%"}}>
            <button className="cursor-pointer flex justify-between items-center font-medium text-xs text-orange2 uppercase focus:outline-none">
              <span className="flex-none">PROGRESS</span>
              <IconArrow className="text-orange stroke-current stroke-2 transform scale-75 ml-1" />
            </button>
          </th>
        </tr>

        <tr className="border-b border-orange-100">
          <td className="px-2 py-4 break-all text-sm font-light mt-1">Introduction to Flutter</td>
          <td className="px-2 py-4 break-all text-sm font-light mt-1">00 / 00 / 0000</td>
          <td className="px-2 py-4 break-all text-sm font-light mt-1">50%</td>
        </tr>
      </table>

    </div>
  )
}

export default EmployeeTraining;
