import React from 'react';
import { Table } from '@ligph/ui';

const headers = [
  { value: 'name', label: 'Application Name', width: '50%' },
  { value: 'assignee', label: 'Assignee', },
  { value: 'actions', label: '', sortable: false, width: '50px'}
];

const formatItems = (items) => (items.map((item) => ({
  ...item,
  assignee: item.assignee.map(i => (<span darkmode className="mr-4 px-4 py-1 rounded-full bg-darkmode-500 text-white">{i}</span>)),
  actions: 'edit'
})));

const ApplicationTable = ({
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
          key="id"
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

export default ApplicationTable;
