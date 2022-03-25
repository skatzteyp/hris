import React from 'react';
import moment from 'moment';
import { Calendar, Dropdown, Button } from '@ligph/ui';

const ReportsFilter = ({
  filters,
  onFilterChange,
  constants
}) => {

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
        [type]: moment(value).format('YYYY-MM-DD')
      }
    });
  };

  return (
    <div>
      <span className="flex text-xs font-normal">Filter Reports</span>
      <div className="relative z-20 mt-5 flex">
        <div className="mx-1 w-1/3">
          <Calendar
            compact={true}
            value={'00/00/0000'}
            name="startDate"
            label="Start Date:"
            onChange={(e) => handleDateChange('startDate', 'start', e)}
          />
        </div>
        <div className="mx-1 w-1/3">
          <Calendar
            compact={true}
            value={'00/00/0000'}
            name="endDate"
            label="End Date:"
            onChange={(e) => handleDateChange('endDate', 'end', e)}
            // placeholder="Due Date Start"
          />
        </div>
        <div className="mx-1 w-1/3">
          <Dropdown
            label="Position"
            items={constants.jobTitles}
            multiselect={true}
            value={filters.jobTitles}
            onChange={(e) => handleFilterChange('jobTitles', e)}
          />
        </div>
      </div>

      <div className="relative mt-5 flex">
        <div className="mx-1 w-1/3">
          <Dropdown
            label="Position"
            items={constants.jobTitles}
            multiselect={true}
            value={filters.jobTitles}
            onChange={(e) => handleFilterChange('jobTitles', e)}
          />
        </div>
        <div className="mx-1 w-1/3">
          <Dropdown
            label="Source"
            items={constants.sources}
            multiselect={true}
            value={filters.sources}
            onChange={(e) => handleFilterChange('sources', e)}
          />
        </div>
        <div className="mx-1 w-1/3"></div>
      </div>
      <div className="relative mt-5 flex">
        <Button
          variant="outline"
          className="mr-2"
        >This Week</Button>
        <Button
          variant="outline"
          className="mr-2"
        >Last Week</Button>
        <Button
          variant="outline"
          className="mr-2"
        >This Month</Button>
        <Button
          variant="outline"
          className="mr-2"
        >Last Month</Button>
        <Button
          variant="outline"
          className="mr-2"
        >This Quarter</Button>
        <Button
          variant="outline"
          className="mr-2"
        >Last Quarter</Button>
        <Button
          variant="outline"
          className="mr-2"
        >This Year</Button>
        <Button
          variant="outline"
          className="mr-2"
        >Last Year</Button>
      </div>
    </div>
  )
}

export default ReportsFilter;
