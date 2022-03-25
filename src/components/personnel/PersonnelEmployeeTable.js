import React from 'react';
import './Personnel.scss'

import { useHistory } from 'react-router-dom';
import { routes } from '../../utils/routes';


import { ReactComponent as IconView } from '../../assets/images/icon-view-i.svg';
import { ReactComponent as IconArrow } from '../../assets/images/icon-arrow.svg';
import { ReactComponent as IconBack } from '../../assets/images/icon-back.svg';


const PersonnelEmployeeTable = () => {

  const history = useHistory();

  return (
    <table className="w-full border-collapse ">
      <tr className="text-left">
        <th className="px-2 py-4 relative break-all">
          <button className="cursor-pointer flex justify-between items-center font-medium text-xs text-orange2 uppercase focus:outline-none">
            <span className="flex-none">EMPLOYEE ID</span>
            <IconArrow className="text-orange stroke-current stroke-2 transform scale-75 ml-1" />
          </button>
        </th>
        <th className="px-2 py-4 relative break-all">
          <button className="cursor-pointer flex justify-between items-center font-medium text-xs text-orange2 uppercase focus:outline-none">
            <span className="flex-none">LAST NAME</span>
            <IconArrow className="text-orange stroke-current stroke-2 transform scale-75 ml-1" />
          </button>
        </th>
        <th className="px-2 py-4 relative break-all">
          <button className="cursor-pointer flex justify-between items-center font-medium text-xs text-orange2 uppercase focus:outline-none">
            <span className="flex-none">FIRST NAME</span>
            <IconArrow className="text-orange stroke-current stroke-2 transform scale-75 ml-1" />
          </button>
        </th>
        <th className="px-2 py-4 relative break-all">
          <button className="cursor-pointer flex justify-between items-center font-medium text-xs text-orange2 uppercase focus:outline-none">
            <span className="flex-none">POSITION</span>
            <IconArrow className="text-orange stroke-current stroke-2 transform scale-75 ml-1" />
          </button>
        </th>
        <th className="px-2 py-4 relative break-all">
          <button className="cursor-pointer flex justify-between items-center font-medium text-xs text-orange2 uppercase focus:outline-none">
            <span className="flex-none">EMPLOYMENT STATUS</span>
            <IconArrow className="text-orange stroke-current stroke-2 transform scale-75 ml-1" />
          </button>
        </th>
        <th className="px-2 py-4 relative break-all w-20">
          <div className="items-center font-medium text-xs text-orange2 uppercase focus:outline-none">ACTIONS</div>
        </th>
      </tr>

      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">00000000</td>
        <td className="px-2 py-4 break-all">Castilloburgos</td>
        <td className="px-2 py-4 break-all">Rodolfo Sigmund</td>
        <td className="px-2 py-4 break-all">Front-End Developer</td>
        <td className="px-2 py-4 break-all">Regular</td>
        <td className="px-2 py-4 break-all">
        <div className="flex justify-between flex-wrap">
          <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
            <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
          </button>
          <button className="bg-orange-200 rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.employeeDetail)}>
            <IconView className="transition-all duration-500 cursor-pointer text-white fill-current w-3 h-3" />
          </button>
        </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">00000000</td>
        <td className="px-2 py-4 break-all">Castilloburgos</td>
        <td className="px-2 py-4 break-all">Rodolfo Sigmund</td>
        <td className="px-2 py-4 break-all">Front-End Developer</td>
        <td className="px-2 py-4 break-all">Regular</td>
        <td className="px-2 py-4 break-all">
        <div className="flex justify-between flex-wrap">
          <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
            <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
          </button>
          <button className="bg-orange-200 rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.employeeDetail)}>
            <IconView className="transition-all duration-500 cursor-pointer text-white fill-current w-3 h-3" />
          </button>
        </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">00000000</td>
        <td className="px-2 py-4 break-all">Castilloburgos</td>
        <td className="px-2 py-4 break-all">Rodolfo Sigmund</td>
        <td className="px-2 py-4 break-all">Front-End Developer</td>
        <td className="px-2 py-4 break-all">Regular</td>
        <td className="px-2 py-4 break-all">
        <div className="flex justify-between flex-wrap">
          <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
            <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
          </button>
          <button className="bg-orange-200 rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.employeeDetail)}>
            <IconView className="transition-all duration-500 cursor-pointer text-white fill-current w-3 h-3" />
          </button>
        </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">00000000</td>
        <td className="px-2 py-4 break-all">Castilloburgos</td>
        <td className="px-2 py-4 break-all">Rodolfo Sigmund</td>
        <td className="px-2 py-4 break-all">Front-End Developer</td>
        <td className="px-2 py-4 break-all">Regular</td>
        <td className="px-2 py-4 break-all">
        <div className="flex justify-between flex-wrap">
          <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
            <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
          </button>
          <button className="bg-orange-200 rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.employeeDetail)}>
            <IconView className="transition-all duration-500 cursor-pointer text-white fill-current w-3 h-3" />
          </button>
        </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">00000000</td>
        <td className="px-2 py-4 break-all">Castilloburgos</td>
        <td className="px-2 py-4 break-all">Rodolfo Sigmund</td>
        <td className="px-2 py-4 break-all">Front-End Developer</td>
        <td className="px-2 py-4 break-all">Regular</td>
        <td className="px-2 py-4 break-all">
        <div className="flex justify-between flex-wrap">
          <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
            <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
          </button>
          <button className="bg-orange-200 rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.employeeDetail)}>
            <IconView className="transition-all duration-500 cursor-pointer text-white fill-current w-3 h-3" />
          </button>
        </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">00000000</td>
        <td className="px-2 py-4 break-all">Castilloburgos</td>
        <td className="px-2 py-4 break-all">Rodolfo Sigmund</td>
        <td className="px-2 py-4 break-all">Front-End Developer</td>
        <td className="px-2 py-4 break-all">Regular</td>
        <td className="px-2 py-4 break-all">
        <div className="flex justify-between flex-wrap">
          <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
            <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
          </button>
          <button className="bg-orange-200 rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.employeeDetail)}>
            <IconView className="transition-all duration-500 cursor-pointer text-white fill-current w-3 h-3" />
          </button>
        </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">00000000</td>
        <td className="px-2 py-4 break-all">Castilloburgos</td>
        <td className="px-2 py-4 break-all">Rodolfo Sigmund</td>
        <td className="px-2 py-4 break-all">Front-End Developer</td>
        <td className="px-2 py-4 break-all">Regular</td>
        <td className="px-2 py-4 break-all">
        <div className="flex justify-between flex-wrap">
          <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
            <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
          </button>
          <button className="bg-orange-200 rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.employeeDetail)}>
            <IconView className="transition-all duration-500 cursor-pointer text-white fill-current w-3 h-3" />
          </button>
        </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">00000000</td>
        <td className="px-2 py-4 break-all">Castilloburgos</td>
        <td className="px-2 py-4 break-all">Rodolfo Sigmund</td>
        <td className="px-2 py-4 break-all">Front-End Developer</td>
        <td className="px-2 py-4 break-all">Regular</td>
        <td className="px-2 py-4 break-all">
        <div className="flex justify-between flex-wrap">
          <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
            <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
          </button>
          <button className="bg-orange-200 rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.employeeDetail)}>
            <IconView className="transition-all duration-500 cursor-pointer text-white fill-current w-3 h-3" />
          </button>
        </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">00000000</td>
        <td className="px-2 py-4 break-all">Castilloburgos</td>
        <td className="px-2 py-4 break-all">Rodolfo Sigmund</td>
        <td className="px-2 py-4 break-all">Front-End Developer</td>
        <td className="px-2 py-4 break-all">Regular</td>
        <td className="px-2 py-4 break-all">
        <div className="flex justify-between flex-wrap">
          <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
            <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
          </button>
          <button className="bg-orange-200 rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.employeeDetail)}>
            <IconView className="transition-all duration-500 cursor-pointer text-white fill-current w-3 h-3" />
          </button>
        </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">00000000</td>
        <td className="px-2 py-4 break-all">Castilloburgos</td>
        <td className="px-2 py-4 break-all">Rodolfo Sigmund</td>
        <td className="px-2 py-4 break-all">Front-End Developer</td>
        <td className="px-2 py-4 break-all">Regular</td>
        <td className="px-2 py-4 break-all">
        <div className="flex justify-between flex-wrap">
          <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
            <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
          </button>
          <button className="bg-orange-200 rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.employeeDetail)}>
            <IconView className="transition-all duration-500 cursor-pointer text-white fill-current w-3 h-3" />
          </button>
        </div>
        </td>
      </tr>
    </table>
  )
}

export default PersonnelEmployeeTable;
