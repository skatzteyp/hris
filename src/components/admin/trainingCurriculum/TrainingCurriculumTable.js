import React from 'react';
import { Table } from '@ligph/ui';

import TrainingCurriculumStatus from './TrainingCurriculumStatus'; 

const headers = [
  { value: 'name', label: 'Title', width: '150px' },
  { value: 'jobTitle', label: 'Position', width: '100px' },
  { value: 'level', label: 'Level', width: '100px' },
  { value: 'actions', label: '', sortable: false, width: '5px'}
];

const formatItems = (items) => (items.map((item) => ({
  ...item,
  name: item.name,
  jobTitle: item.jobTitle ? item.jobTitle.name : item.jobTitleId,
  level: item.level ? item.level.name : "",
  status: <TrainingCurriculumStatus status={item.status} />,
  actions: 'edit'
})));

const TrainingCurriculumTable = ({
  items,
  sort,
  onSort,
  onSelect
}) => {
  const handleSort = (s) => {
    if (sort.includes(s)) {
      if (sort.includes('+')) {
        onSort('-' + s);
      }
      else {
        onSort('+' + s);
      }
    }
    else {
      onSort('+' + s);
    }
  };

  const handleSelect = (sort, order) => {
    if (onSelect) {
      onSelect(sort, order);
    }
  }

  return (
    <>
      {items.length ?
        <Table
          sort={sort}
          headers={headers}
          items={formatItems(items)}
          onSelect={handleSelect}
          onSort={handleSort}
          darkmode
        /> : null
      }
    </>
  );
};

export default TrainingCurriculumTable;
