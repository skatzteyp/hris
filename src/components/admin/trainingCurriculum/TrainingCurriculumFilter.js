import React from 'react';
import { Dropdown, Text, Button } from '@ligph/ui';

import { ReactComponent as IconSearch } from '../../../assets/images/icon-search.svg';
import { ReactComponent as IconAdvancedFilters } from '../../../assets/images/icon-advanced-filters.svg';

import useConstants from '../../../hooks/useConstants';

const TrainingCurriculumFilter = ({filters, onFilterChange, handleFilterSearch}) => {

  const constants = useConstants();

  const handleFilterChange = (name, values) => {
    onFilterChange({
      ...filters,
      [name]: [...values]
    });
  }

  const handleFilterTextChange = (name, value) => {
    onFilterChange({
      ...filters,
      [name]: value
    });
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex-auto mr-8">
          <Text placeholder="Search Curriculum..."
            icon={<IconSearch className=" fill-current" />}
            value= { filters.name }
            onChange={(e) => handleFilterTextChange('name', e.target.value)}
            darkmode
          />
        </div>
        <Button
          color="orange"
          variant="outline"
          onClick={handleFilterSearch}
        >
          <IconAdvancedFilters className="fill-current mr-2" />
          Filters Search
        </Button>
      </div>
      <div className={`items-center mt-5 relative z-10`}>
        <div className="flex">
        <Dropdown
            darkmode
            label="Position"
            items={constants.jobTitles}
            multiselect={true}
            value={filters.jobTitles || []}
            onChange={(e) => handleFilterChange('jobTitles', e)}
            className="mr-3 w-1/3"
          />
          <Dropdown
            darkmode
            label="Level"
            items={ constants.levels}
            multiselect={true}
            value={filters.levels || []}
            onChange={(e) => handleFilterChange('levels', e)}
            className="mr-3 w-1/4"
          />
        </div>
      </div>
    </div>
  );
};

export default TrainingCurriculumFilter;
