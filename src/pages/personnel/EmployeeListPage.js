import React from 'react';
import { Dashboard, Well, Button, Pagination } from '@ligph/ui';

import PersonnelEmployeeTable from '../../components/personnel/PersonnelEmployeeTable';
import PersonnelFilter from '../../components/personnel/PersonnelFilter';

import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';

import { ReactComponent as IconAdd } from '../../assets/images/icon-plus-fill.svg';

const EmployeeListPage = () => {

  const [modules, setModule] = useModules();

  return (
    <Dashboard
      color="orange"
      menuItems={dashboard.getMenu('personnel', 'dashboard')}
      modules={modules}
      onModuleChange={setModule}
      module="Personnel Mgt"
    >
    <div className="px-12 py-4">

      <div className="flex justify-between items-center">
        <h2 className="text-3xl text-white font-medium">Employee List</h2>
        <Button
          color="white"
          className="items-center">
          <IconAdd className="fill-current mr-4" />
          Add New Applicant
        </Button>
      </div>

      <Well className="mt-8 p-8">
        <PersonnelFilter />
      </Well>

      <div className="relative min-h-sm">
        <div className="mt-6 test">
          <PersonnelEmployeeTable />
          <div className="flex justify-between mt-8 items-center pb-8 pointer-events-auto">
            <p className="text-xs font-light italic">Showing 1 to 10 of 345 results</p>
            <Pagination bgColor="orange" />
          </div>
        </div>
      </div>

    </div>
    </Dashboard>
  )
}

export default EmployeeListPage;
