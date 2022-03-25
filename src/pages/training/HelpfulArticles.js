import React, { useState } from 'react';
import { Dashboard, Well, Link } from '@ligph/ui';

import useModules from '../../hooks/useModules';
import useConstants from '../../hooks/useConstants';

import { dashboard } from '../../utils/dashboard';

import TrainingFilter from '../../components/training/TrainingFilter';

import topicDummy from '../../assets/images/topic-dummy.jpg';

const HelpfulArticles = () => {
  const [modules, setModule] = useModules();
  const [search, setSearch] = useState('');
  const constants = useConstants();
  const [filters, setFilters] = useState({
    frontEnd: [],
    backEnd: [],
    design: [],
    qa: [],
    accounting: [],
    admin: [],
    management: []
  });

  return (
    <Dashboard
      color="purple"
      menuItems={dashboard.getMenu('training', 'articles')}
      module="Training"
      modules={modules}
      onModuleChange={setModule}
    >
      <div className="px-12 py-4">
        <h2 className="text-3xl text-white font-medium">Helpful Articles</h2>
        <Well className="mt-8 p-8">
          <TrainingFilter
            search={search}
            onSearchChange={setSearch}
            filters={filters}
            onFilterChange={setFilters}
            constants={constants}
          />
        </Well>
        <div className="mt-8">
          <h3 className="text-base font-semibold text-black mb-4">Your training topics</h3>
          <ul class="grid grid-cols-4 gap-4 list-none">
            <li className="bg-white rounded border border-black-100 p-4">
              <Link to="" className="block">
                <div className="mb-4">
                  <img src={topicDummy} alt=""/>
                </div>
                <div className="flex mb-4">
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs font-normal">FE</span>
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs ml-2 font-normal">BE</span>
                </div>
                <h3 className="text-base font-bold text-black mb-4">
                  Introduction to Flutter <br/>
                  Developement Using Dart
                </h3>
                <p className="text-xxs text-yellow-300 font-normal">Due Until 00/00/00</p>
              </Link>
            </li>
            <li className="bg-white rounded border border-black-100 p-4">
              <Link to="" className="block">
                <div className="mb-4">
                  <img src={topicDummy} alt=""/>
                </div>
                <div className="flex mb-4">
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs font-normal">FE</span>
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs ml-2 font-normal">BE</span>
                </div>
                <h3 className="text-base font-bold text-black mb-4">
                  Introduction to Flutter <br/>
                  Developement Using Dart
                </h3>
                <p className="text-xxs text-yellow-300 font-normal">Due Until 00/00/00</p>
              </Link>
            </li>
            <li className="bg-white rounded border border-black-100 p-4">
              <Link to="" className="block">
                <div className="mb-4">
                  <img src={topicDummy} alt=""/>
                </div>
                <div className="flex mb-4">
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs font-normal">FE</span>
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs ml-2 font-normal">BE</span>
                </div>
                <h3 className="text-base font-bold text-black mb-4">
                  Introduction to Flutter <br/>
                  Developement Using Dart
                </h3>
                <p className="text-xxs text-yellow-300 font-normal">Due Until 00/00/00</p>
              </Link>
            </li>
            <li className="bg-white rounded border border-black-100 p-4">
              <Link to="" className="block">
                <div className="mb-4">
                  <img src={topicDummy} alt=""/>
                </div>
                <div className="flex mb-4">
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs font-normal">FE</span>
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs ml-2 font-normal">BE</span>
                </div>
                <h3 className="text-base font-bold text-black mb-4">
                  Introduction to Flutter <br/>
                  Developement Using Dart
                </h3>
                <p className="text-xxs text-yellow-300 font-normal">Due Until 00/00/00</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <h3 className="text-base font-semibold text-black mb-4">Browse more topics</h3>
          <ul class="grid grid-cols-4 gap-4 list-none">
            <li className="bg-white rounded border border-black-100 p-4">
              <Link to="" className="block">
                <div className="mb-4">
                  <img src={topicDummy} alt=""/>
                </div>
                <div className="flex mb-4">
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs font-normal">FE</span>
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs ml-2 font-normal">BE</span>
                </div>
                <h3 className="text-base font-bold text-black mb-4">
                  Introduction to Flutter <br/>
                  Developement Using Dart
                </h3>
                <p className="text-xxs text-yellow-300 font-normal">Due Until 00/00/00</p>
              </Link>
            </li>
            <li className="bg-white rounded border border-black-100 p-4">
              <Link to="" className="block">
                <div className="mb-4">
                  <img src={topicDummy} alt=""/>
                </div>
                <div className="flex mb-4">
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs font-normal">FE</span>
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs ml-2 font-normal">BE</span>
                </div>
                <h3 className="text-base font-bold text-black mb-4">
                  Introduction to Flutter <br/>
                  Developement Using Dart
                </h3>
                <p className="text-xxs text-yellow-300 font-normal">Due Until 00/00/00</p>
              </Link>
            </li>
            <li className="bg-white rounded border border-black-100 p-4">
              <Link to="" className="block">
                <div className="mb-4">
                  <img src={topicDummy} alt=""/>
                </div>
                <div className="flex mb-4">
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs font-normal">FE</span>
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs ml-2 font-normal">BE</span>
                </div>
                <h3 className="text-base font-bold text-black mb-4">
                  Introduction to Flutter <br/>
                  Developement Using Dart
                </h3>
                <p className="text-xxs text-yellow-300 font-normal">Due Until 00/00/00</p>
              </Link>
            </li>
            <li className="bg-white rounded border border-black-100 p-4">
              <Link to="" className="block">
                <div className="mb-4">
                  <img src={topicDummy} alt=""/>
                </div>
                <div className="flex mb-4">
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs font-normal">FE</span>
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs ml-2 font-normal">BE</span>
                </div>
                <h3 className="text-base font-bold text-black mb-4">
                  Introduction to Flutter <br/>
                  Developement Using Dart
                </h3>
                <p className="text-xxs text-yellow-300 font-normal">Due Until 00/00/00</p>
              </Link>
            </li>
            <li className="bg-white rounded border border-black-100 p-4">
              <Link to="" className="block">
                <div className="mb-4">
                  <img src={topicDummy} alt=""/>
                </div>
                <div className="flex mb-4">
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs font-normal">FE</span>
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs ml-2 font-normal">BE</span>
                </div>
                <h3 className="text-base font-bold text-black mb-4">
                  Introduction to Flutter <br/>
                  Developement Using Dart
                </h3>
                <p className="text-xxs text-yellow-300 font-normal">Due Until 00/00/00</p>
              </Link>
            </li>
            <li className="bg-white rounded border border-black-100 p-4">
              <Link to="" className="block">
                <div className="mb-4">
                  <img src={topicDummy} alt=""/>
                </div>
                <div className="flex mb-4">
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs font-normal">FE</span>
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs ml-2 font-normal">BE</span>
                </div>
                <h3 className="text-base font-bold text-black mb-4">
                  Introduction to Flutter <br/>
                  Developement Using Dart
                </h3>
                <p className="text-xxs text-yellow-300 font-normal">Due Until 00/00/00</p>
              </Link>
            </li>
            <li className="bg-white rounded border border-black-100 p-4">
              <Link to="" className="block">
                <div className="mb-4">
                  <img src={topicDummy} alt=""/>
                </div>
                <div className="flex mb-4">
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs font-normal">FE</span>
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs ml-2 font-normal">BE</span>
                </div>
                <h3 className="text-base font-bold text-black mb-4">
                  Introduction to Flutter <br/>
                  Developement Using Dart
                </h3>
                <p className="text-xxs text-yellow-300 font-normal">Due Until 00/00/00</p>
              </Link>
            </li>
            <li className="bg-white rounded border border-black-100 p-4">
              <Link to="" className="block">
                <div className="mb-4">
                  <img src={topicDummy} alt=""/>
                </div>
                <div className="flex mb-4">
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs font-normal">FE</span>
                  <span className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs ml-2 font-normal">BE</span>
                </div>
                <h3 className="text-base font-bold text-black mb-4">
                  Introduction to Flutter <br/>
                  Developement Using Dart
                </h3>
                <p className="text-xxs text-yellow-300 font-normal">Due Until 00/00/00</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Dashboard>
  );
}

export default HelpfulArticles;
