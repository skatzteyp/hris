import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Autosuggest } from '@ligph/ui';

import { getEmployees } from '../../redux/modules/employee/employeeActions';

const EmployeeSearch = ({ value = '', className = '', overflow = false, onChange, disabled = false, label, error }) => {
  const { employee } = useSelector(store => store);
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!employee.cached) {
      dispatch(getEmployees());
    }
  }, [employee, dispatch]);

  const handleChange = (value) => {
    onChange(value);
  }

  const handleSearchChange = (search) => {
    if (typeof search === 'number') {
      let e = employee.employees.find(e => e.id === search);
      search = `${e.firstName || ''} ${e.lastName || ''}`
    }

    let filters = search.split(' ');

    let employees = employee.employees.filter((e) => {
      let match = false;

      if (e.firstName) {
        match = match || filters.filter((f) => {
          return e.firstName.toLowerCase().includes(f.toLowerCase());
        }).length;
      }

      if (e.lastName) {
        match = match || filters.filter((f) => {
          return e.lastName.toLowerCase().includes(f.toLowerCase());
        }).length;
      }

      return match;
    });

    setItems(employees.map((e) => ({ key: e.id, value: `${e.firstName || ''} ${e.lastName || ''}` })));
  }

  return (
    <Autosuggest
      items={items}
      value={value}
      className={className}
      label={label}
      onChange={handleChange}
      onSearchChange={handleSearchChange}
      overflow={overflow}
      disabled={disabled}
      error={error}
    />
  );
}

export default EmployeeSearch;
