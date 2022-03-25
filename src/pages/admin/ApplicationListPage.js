import React, { useState } from 'react';
import { Dashboard, Button, Well, Pagination } from '@ligph/ui';

import ApplicationFilter from '../../components/admin/ApplicationFilter';
import ApplicationTable from '../../components/admin/ApplicationTable';

import useModules from '../../hooks/useModules';
import useConstants from '../../hooks/useConstants';
import { dashboard } from '../../utils/dashboard';
import { ReactComponent as IconAdd } from '../../assets/images/icon-plus-fill.svg';

const ApplicationListPage = () => {
  const [modules, setModule] = useModules();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('-appliedAt');
  const [page, setPage] = useState(1);
  const constants = useConstants();
  const [filters, setFilters] = useState({
    frontEnd: [],
    backEnd: [],
    design: [],
    qa: [],
    accounting: [],
    admin: [],
    management: []
  });


  const handleApplicantionAdd = () => {
    console.log('Add application')
  }

  const handleSelect = (item) => {
    console.log(item)
  }

  const apps = [
    {
      id: 1,
      name: 'Slack',
      assignee: ['FE', 'BE', 'DE']
    },
    {
      id: 2,
      name: 'Xcode',
      assignee: ['FE', 'BE']
    },
    {
      id: 3,
      name: 'Adobe CC',
      assignee: ['FE', 'DE']
    }
  ]

  return (
    <Dashboard
      color="gray"
      menuItems={dashboard.getMenu('admin', 'lmsadmin', 'applications')}
      modules={modules}
      onModuleChange={setModule}
      darkmode
      module="Admin"
    >
      <div className="px-12 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl text-white font-medium">Application List</h2>
          <Button
            color="white"
            className="items-center"
            onClick={() => handleApplicantionAdd()}
          >
            <IconAdd className="fill-current mr-4" />
            Add Application
          </Button>
        </div>
        <Well className="mt-8 p-8 border-none bg-darkmode-900">
          <ApplicationFilter
            darkmode
            search={search}
            onSearchChange={setSearch}
            filters={filters}
            onFilterChange={setFilters}
            constants={constants}
          />
        </Well>
        <div className="relative min-h-sm">
          <div className="mt-6 test">
            <ApplicationTable
              sort={sort}
              items={apps}
              onSelect={handleSelect}
              onSort={setSort}
            />
            <div className="flex justify-between mt-8 items-center pb-8">
              <p className="text-xs font-light italic text-white">Showing {(1) * 1} to {3} of {3} results</p>
              <Pagination
                current={page}
                onChange={setPage}
                total={1}
                perPage={1}
                size={2}
                darkmode
              />
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default ApplicationListPage;