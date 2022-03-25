import React, { useState } from 'react';
import moment from 'moment';
import { Dropdown, Text, Calendar, Button } from '@ligph/ui';

import { ReactComponent as IconSearch } from '../../assets/images/icon-search.svg';
import { ReactComponent as IconAdvancedFilters } from '../../assets/images/icon-advanced-filters.svg';

const ApplicantsFilter = ({
  search,
  onSearchChange,
  filters,
  onFilterChange,
  constants
}) => {
  const [show, setShow] = useState(false);

  const handleAdvanceFilter = () => {
    setShow(!show)
  }

  const handleFilterChange = (name, values) => {
    onFilterChange({
      ...filters,
      [name]: [...values]
    });
  }

  const handleDateChange = (name, type, value) => {
    onFilterChange({
      ...filters,
      [name]: {
        ...filters[name],
        [type]: value ? moment(value).format('YYYY-MM-DD') : ''
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex-auto mr-8">
          <Text placeholder="Search Applicant..."
            icon={<IconSearch className=" fill-current" />}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button
          onClick={handleAdvanceFilter}
          variant={show ? 'fill' : 'outline'}
        >
          <IconAdvancedFilters className="fill-current mr-2" />
          Advanced Filters
        </Button>
      </div>
      <div className={`items-center mt-5 relative z-10 ${show ? 'block' : 'hidden'}`}>
        <div className="flex">
          <Dropdown
            label="Position"
            items={constants.jobTitles}
            multiselect={true}
            value={filters.jobTitles}
            onChange={(e) => handleFilterChange('jobTitles', e)}
            className="mr-3 w-1/4"
          />
          <Dropdown
            label="Source"
            items={constants.sources}
            multiselect={true}
            value={filters.sources}
            onChange={(e) => handleFilterChange('sources', e)}
            className="mr-3 w-1/4"
          />
          <Dropdown
            label="Status"
            items={constants.statuses}
            multiselect={true}
            value={filters.statuses}
            onChange={(e) => handleFilterChange('statuses', e)}
            className="w-1/4"
          />
        </div>
        <div className="flex mt-3">
          <div className="mr-3 w-80">
            <Calendar
              compact={true}
              label="Applied Start"
              name="appliedAtStart"
              timeFormat={false}
              value={filters.appliedAt.start}
              onChange={(e) => handleDateChange('appliedAt', 'start', e)}
            />
          </div>
          <div className="w-80">
            <Calendar
              compact={true}
              label="Applied End"
              name="appliedAtEnd"
              timeFormat={false}
              value={filters.appliedAt.end}
              onChange={(e) => handleDateChange('appliedAt', 'end', e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsFilter;
