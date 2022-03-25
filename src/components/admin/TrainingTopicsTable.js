import React from 'react';
import { Table, Button } from '@ligph/ui';

import TrainingTopicsStatus from './TrainingTopicsStatus'; 

const headers = [
  { value: 'jobTitle', label: 'Training Title', width: '100px' },
  { value: 'appliedAt', label: 'Category', width: '150px' },
  { value: 'actions', label: '', sortable: false, width: '5px'}
];

const formatItems = (items) => (items.map((item) => ({
  ...item,
  jobTitle: item.title !== '' || item.title !== null ? item.title : 'Not Set' ,
  appliedAt:
    item.categories.length > 0 ? (
      <>
      <div className="flex">
          {item.categories.map(({ name }) => (
            <Button variant="fill" color="gray" className="px-3 py-1 text-xs mr-3">{name}</Button>
        ))}
    </div>
    </>
    ) : null,
  status: <TrainingTopicsStatus status={item.status} />,
  actions: 'edit'
})));

const TrainingTopicsTable = ({
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

export default TrainingTopicsTable;
