import React from 'react';
import { Table } from '@ligph/ui';

import OnboardingStatus from './OnboardingStatus'; 

const headers = [
  { value: 'jobTitle', label: 'Position', width: '100px' },
  { value: 'appliedAt', label: 'Level', width: '150px' },
  { value: 'actions', label: '', sortable: false, width: '5px'}
];

const formatItems = (items) => (items.map((item) => ({
  ...item,
  jobTitle: item.jobTitle ? item.jobTitle.name : 'Not Set',
  appliedAt: 'Junior',
  status: <OnboardingStatus status={item.status} />,
  actions: 'edit'
})));

const OnboardingTable = ({
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

export default OnboardingTable;
