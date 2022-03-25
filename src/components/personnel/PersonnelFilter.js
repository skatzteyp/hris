import React from 'react';

import { ReactComponent as IconSearch } from '../../assets/images/icon-search.svg';
import { ReactComponent as IconAdvancedFilters } from '../../assets/images/icon-advanced-filters.svg';

const PersonnelFilter = () => {

  return (
    <div>
      <div className="flex justify-between">

        <div className="flex-auto mr-8">
          <div className="relative border-orange-300 ">
            <div className="relative overflow-hidden rounded border border-black-100">
              <div className="absolute z-20 left-0 flex items-center w-full h-10 pointer-events-none pl-4 text-black-200">
                <IconSearch className="fill-current mr-2"/>
              </div>
                <input className="text-xs italic relative z-10 font-light appearance-none w-full h-10 focus:outline-none px-10 bg-white text-black  " placeholder="Search Employee..." type="text" />
              </div>
          </div>
        </div>
        <button class="cursor-pointer text-xs font-medium flex items-center focus:outline-none px-5 h-10 text-orange border border-orange rounded-full transition-all duration-500 hover:border-orange-dark-200 hover:text-orange-dark-200 group-hover:border-orange-dark-200 group-hover:text-orange-dark-200 transition duration-75 ease-linear text-orange border-orange">
          <IconAdvancedFilters className="fill-current mr-2"/>
          Filter Search
        </button>
      </div>
    </div>
  );
};

export default PersonnelFilter;
