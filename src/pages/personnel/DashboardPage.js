import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import './Dashboard.scss';
import {
  Dashboard,
  Well
} from '@ligph/ui';

import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';

import { ReactComponent as IconPlus } from '../../assets/images/icon-plus.svg';
import { ReactComponent as IconArrow } from '../../assets/images/icon-arrow.svg'


const DashboardPage = () => {

  const [modules, setModule] = useModules();

  const announcements = [
    {
      title: '<div class="font-semibold">Company Summer Outing<span class="block text-sm font-light mt-2">Posted by Shandy Louise</span></div>',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      title: '<div class="font-semibold">Company Summer Outing<span class="block text-sm font-light mt-2">Posted by Shandy Louise</span></div>',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      title: '<div class="font-semibold">Company Summer Outing<span class="block text-sm font-light mt-2">Posted by Shandy Louise</span></div>',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      title: '<div class="font-semibold">Company Summer Outing<span class="block text-sm font-light mt-2">Posted by Shandy Louise</span></div>',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  ];

  const events = [
    {
      date: 'May 27',
      event: 'Company Summer Outing'
    },
    {
      date: 'May 27',
      event: 'Company Summer Outing'
    },
    {
      date: 'May 27',
      event: 'Company Summer Outing'
    }
  ];

  const celebrants = [
    {
      date: '27',
      name: 'Sigmung Burgosing'
    },
    {
      date: '30',
      name: 'Rodolfo Castillo, Jr. Anna Rose Paloma'
    }
  ]

  return (
    <Dashboard
      color="orange"
      menuItems={dashboard.getMenu('personnel', 'dashboard')}
      modules={modules}
      onModuleChange={setModule}
      module="Personnel Mgt"
    >
    <div className="px-12 py-4">
      <div className="flex justify-between">
        <h2 className="text-3xl text-white font-medium">Dashboard</h2>

      </div>
      <Well className="mt-8 p-8 text-black">
        <div className="flex justify-between">
          <div>
            <p className="text-2xl font-semibold">Welcome back, Maximus!</p>
            <p className="text-sm font-light mt-2">You have 3 new applicants as of March 20, 2020</p>
          </div>
          <div className="flex justify-center items-center">
            <button className="cursor-pointer text-xs font-medium flex items-center focus:outline-none px-5 h-10 text-orange border border-orange rounded-full transition-all duration-500 hover:border-orange-dark-200 hover:text-orange-dark-200 group-hover:border-orange-dark-200 group-hover:text-orange-dark-200 transition duration-75 ease-linear undefined">View Profile</button>
          </div>
        </div>
      </Well>

      <div className="text-black flex justify-between flex-wrap">

        <div className="bg-white border border-black-100 rounded mt-8 p-8 text-black" style={{ width: '66%'}}>
          <div className="flex justify-between flex-wrap items-center mb-10">
            <h2 className="font-semibold">ANNOUNCEMENTS</h2>
            <button className="cursor-pointer text-xs font-medium flex items-center focus:outline-none px-5 h-10 text-orange border border-orange rounded-full transition-all duration-500 hover:border-orange-dark-200 hover:text-orange-dark-200 group-hover:border-orange-dark-200 group-hover:text-orange-dark-200 transition duration-75 ease-linear undefined"><IconPlus className="mr-2 stroke-current" /> Create
            </button>
          </div>

          {announcements.map((item) => (
            <Accordion title={ReactHtmlParser(item.title)}>
              <div key={item.uuid}>
                <div className="py-4 block text-sm font-light mt-2">{item.content}</div>
              </div>
            </Accordion>
          ))}

        <div className="text-center mt-8 items-center flex justify-center">
          <button className="inline-block cursor-pointer text-xs font-medium flex items-center focus:outline-none px-5 h-10 text-orange border border-orange rounded-full transition-all duration-500 hover:border-orange-dark-200 hover:text-orange-dark-200 group-hover:border-orange-dark-200 group-hover:text-orange-dark-200 transition duration-75 ease-linear undefined">View All
          </button>
        </div>
        </div>

        <div style={{ width: '31%'}}>
          <div className="bg-white border border-black-100 rounded mt-8 p-8 text-black">
            <h2 className="font-semibold">UPCOMING EVENTS</h2>

            <div className="flex justify-between flex-wrap mt-8">
              <span className="rounded bg-gray-background py-2 px-2"><IconArrow className="cursor-pointer inline-block mx-2 transform rotate-90 text-orange stroke-current stroke-2" /> OCTOBER <IconArrow className="cursor-pointer inline-block mx-2 transform -rotate-90 text-orange stroke-current stroke-2" /></span>
              <span className="rounded bg-gray-background py-2 px-2"><IconArrow className="cursor-pointer inline-block mx-2 transform rotate-90 text-orange stroke-current stroke-2" /> 2020 <IconArrow className="cursor-pointer inline-block mx-2 transform -rotate-90 text-orange stroke-current stroke-2" /></span>
            </div>

            <ul className="mt-8">
              {events.map((item, index) => (
                <li key={index} className="border-b border-orange-100 py-2">
                  <time className="block text-sm font-light mt-2">{item.date}</time>
                  <h2 className="font-semibold">{item.event}</h2>
                </li>
              ))}
            </ul>

          </div>
          <div className="bg-white border border-black-100 rounded mt-8 p-8 text-black">
            <h2 className="font-semibold">BIRTHDAY CELEBRANTS</h2>

            <div className="flex justify-between flex-wrap mt-8">
              <span className="rounded bg-gray-background py-2 px-2"><IconArrow className="cursor-pointer inline-block mx-2 transform rotate-90 text-orange stroke-current stroke-2" /> OCTOBER <IconArrow className="cursor-pointer inline-block mx-2 transform -rotate-90 text-orange stroke-current stroke-2" /></span>
              <span className="rounded bg-gray-background py-2 px-2"><IconArrow className="cursor-pointer inline-block mx-2 transform rotate-90 text-orange stroke-current stroke-2" /> 2020 <IconArrow className="cursor-pointer inline-block mx-2 transform -rotate-90 text-orange stroke-current stroke-2" /></span>
            </div>

            <ul className="mt-8">
              {celebrants.map((item, index) => (
                <li key={index} className="border-b border-orange-100 py-2">
                  <time className="block text-sm font-light mt-2">{item.date}</time>
                  <h2 className="font-semibold">{item.name}</h2>
                </li>
              ))}
            </ul>

          </div>
        </div>

      </div>


    </div>
    </Dashboard>
  )
}

const Accordion = ({ title, children }) => {
  const [isOpen, setOpen] = React.useState(false);


  return (
    <div className="bg-white border border-orange-100 rounded mt-5 p-6 text-black">
      <div
        className={`flex justify-between pointer accordion-title ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
        >
        {title}
        <IconArrow className="iconarrow block mt-1 cursor-pointer text-orange stroke-current stroke-2" />
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};

export default DashboardPage;
