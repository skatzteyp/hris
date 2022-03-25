import React from 'react';
import './Personnel.scss'

import { useHistory } from 'react-router-dom';
import { routes } from '../../utils/routes';

import { ReactComponent as IconArrow } from '../../assets/images/icon-arrow.svg';
import { ReactComponent as IconBack } from '../../assets/images/icon-back.svg';

const PersonnelDocumentsTable = () => {

  const history = useHistory();

  return (
    <table className="w-full border-collapse ">
      <tr className="text-left">
        <th className="px-2 py-4 relative break-all w-2/5">
          <button className="cursor-pointer flex justify-between items-center font-medium text-xs text-orange2 uppercase focus:outline-none">
            <span className="flex-none">DOCUMENT NAME</span>
            <IconArrow className="text-orange stroke-current stroke-2 transform scale-75 ml-1" />
          </button>
        </th>
        <th className="px-2 py-4 relative break-all w-3/12">
          <button className="cursor-pointer flex justify-between items-center font-medium text-xs text-orange2 uppercase focus:outline-none">
            <span className="flex-none">DATE REQUESTED</span>
            <IconArrow className="text-orange stroke-current stroke-2 transform scale-75 ml-1" />
          </button>
        </th>
        <th className="px-2 py-4 relative break-all" style={{width: "28%"}}>
          <button className="cursor-pointer flex justify-between items-center font-medium text-xs text-orange2 uppercase focus:outline-none">
            <span className="flex-none">STATUS</span>
            <IconArrow className="text-orange stroke-current stroke-2 transform scale-75 ml-1" />
          </button>
        </th>
        <th className="px-2 py-4 relative break-all w-auto">
          <div className="items-center font-medium text-xs text-orange2 uppercase focus:outline-none">ACTIONS</div>
        </th>
      </tr>

      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">Certificate of Employment</td>
        <td className="px-2 py-4 break-all">00 / 00 / 0000</td>
        <td className="px-2 py-4 break-all">
          <span className="inline-block uppercase text-xxs font-medium border rounded px-2 py-1" style={{ color: '#3FB223', borderColor: '#3FB223' }}>COMPLETED</span>
        </td>
        <td className="px-2 py-4 break-all">
          <div className="flex justify-between flex-wrap">
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 -rotate-90 transform" />
            </button>
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.requestDocument)}>
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
            </button>
          </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">Certificate of Employment</td>
        <td className="px-2 py-4 break-all">00 / 00 / 0000</td>
        <td className="px-2 py-4 break-all">
          <span className="inline-block uppercase text-xxs font-medium border rounded px-2 py-1" style={{ color: '#3FB223', borderColor: '#3FB223' }}>COMPLETED</span>
        </td>
        <td className="px-2 py-4 break-all">
          <div className="flex justify-between flex-wrap">
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 -rotate-90 transform" />
            </button>
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.requestDocument)}>
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
            </button>
          </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">Certificate of Employment</td>
        <td className="px-2 py-4 break-all">00 / 00 / 0000</td>
        <td className="px-2 py-4 break-all">
          <span className="inline-block uppercase text-xxs font-medium border rounded px-2 py-1" style={{ color: '#FF215B', borderColor: '#FF215B' }}>PENDING</span>
        </td>
        <td className="px-2 py-4 break-all">
          <div className="flex justify-between flex-wrap">
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 -rotate-90 transform" />
            </button>
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.requestDocument)}>
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
            </button>
          </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">Certificate of Employment</td>
        <td className="px-2 py-4 break-all">00 / 00 / 0000</td>
        <td className="px-2 py-4 break-all">
          <span className="inline-block uppercase text-xxs font-medium border rounded px-2 py-1" style={{ color: '#3FB223', borderColor: '#3FB223' }}>COMPLETED</span>
        </td>
        <td className="px-2 py-4 break-all">
          <div className="flex justify-between flex-wrap">
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 -rotate-90 transform" />
            </button>
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.requestDocument)}>
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
            </button>
          </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">Certificate of Employment</td>
        <td className="px-2 py-4 break-all">00 / 00 / 0000</td>
        <td className="px-2 py-4 break-all">
          <span className="inline-block uppercase text-xxs font-medium border rounded px-2 py-1" style={{ color: '#3FB223', borderColor: '#3FB223' }}>COMPLETED</span>
        </td>
        <td className="px-2 py-4 break-all">
          <div className="flex justify-between flex-wrap">
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 -rotate-90 transform" />
            </button>
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.requestDocument)}>
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
            </button>
          </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">Certificate of Employment</td>
        <td className="px-2 py-4 break-all">00 / 00 / 0000</td>
        <td className="px-2 py-4 break-all">
          <span className="inline-block uppercase text-xxs font-medium border rounded px-2 py-1" style={{ color: '#FF215B', borderColor: '#FF215B' }}>PENDING</span>
        </td>
        <td className="px-2 py-4 break-all">
          <div className="flex justify-between flex-wrap">
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 -rotate-90 transform" />
            </button>
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.requestDocument)}>
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
            </button>
          </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">Certificate of Employment</td>
        <td className="px-2 py-4 break-all">00 / 00 / 0000</td>
        <td className="px-2 py-4 break-all">
          <span className="inline-block uppercase text-xxs font-medium border rounded px-2 py-1" style={{ color: '#3FB223', borderColor: '#3FB223' }}>COMPLETED</span>
        </td>
        <td className="px-2 py-4 break-all">
          <div className="flex justify-between flex-wrap">
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 -rotate-90 transform" />
            </button>
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.requestDocument)}>
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
            </button>
          </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">Certificate of Employment</td>
        <td className="px-2 py-4 break-all">00 / 00 / 0000</td>
        <td className="px-2 py-4 break-all">
          <span className="inline-block uppercase text-xxs font-medium border rounded px-2 py-1" style={{ color: '#3FB223', borderColor: '#3FB223' }}>COMPLETED</span>
        </td>
        <td className="px-2 py-4 break-all">
          <div className="flex justify-between flex-wrap">
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 -rotate-90 transform" />
            </button>
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.requestDocument)}>
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
            </button>
          </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">Certificate of Employment</td>
        <td className="px-2 py-4 break-all">00 / 00 / 0000</td>
        <td className="px-2 py-4 break-all">
          <span className="inline-block uppercase text-xxs font-medium border rounded px-2 py-1" style={{ color: '#FF215B', borderColor: '#FF215B' }}>PENDING</span>
        </td>
        <td className="px-2 py-4 break-all">
          <div className="flex justify-between flex-wrap">
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center">
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 -rotate-90 transform" />
            </button>
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.requestDocument)}>
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
            </button>
          </div>
        </td>
      </tr>
      <tr className="border-b border-orange-100">
        <td className="px-2 py-4 break-all">Certificate of Employment</td>
        <td className="px-2 py-4 break-all">00 / 00 / 0000</td>
        <td className="px-2 py-4 break-all">
          <span className="inline-block uppercase text-xxs font-medium border rounded px-2 py-1" style={{ color: '#3FB223', borderColor: '#3FB223' }}>COMPLETED</span>
        </td>
        <td className="px-2 py-4 break-all">
          <div className="flex justify-between flex-wrap">
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.requestDocument)}>
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 -rotate-90 transform" />
            </button>
            <button className="bg-white rounded-full focus:outline-none w-6 h-6 flex items-center justify-center" onClick={() => history.push(routes.personnel.requestDocument)}>
              <IconBack className="transition-all duration-500 cursor-pointer fill-current w-6 h-6 text-orange3 rotate-180 transform" />
            </button>
          </div>
        </td>
      </tr>
    </table>
  )
}

export default PersonnelDocumentsTable;
