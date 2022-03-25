import React from 'react';
import { Table } from '@ligph/ui';

import ApplicantStatus from './ApplicantStatus';

const headers = [
  { value: 'id', label: 'ID', width: '5rem' },
  { value: 'firstName', label: 'First Name', width: '11rem' },
  { value: 'lastName', label: 'Last Name', width: '11rem' },
  { value: 'jobTitle', label: 'Position', width: '20rem' },
  { value: 'source', label: 'Source', width: '10rem' },
  { value: 'appliedAt', label: 'Date Applied', width: '10rem' },
  { value: 'status', label: 'Status', width: '10rem' },
  { value: 'actions', label: '', sortable: false, width: '3rem'}
];

const formatItems = (items) => (items.map((item) => ({
  ...item,
  id: item.id,
  jobTitle: item.jobTitle ? item.jobTitle.name : 'Not Set',
  source: item.source ? item.source.name : 'Not Set',
  status: <ApplicantStatus status={item.status} />,
  actions: 'view'
})));

const ApplicantsTable = ({
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
        /> : null
      }
    </>
  );
};

export default ApplicantsTable;
