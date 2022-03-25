import React from 'react';

import {
  Dashboard,
} from '@ligph/ui';

import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';


const ReportsPage = () => {
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
        <h2 className="text-3xl text-white font-medium">Reports Page</h2>
      </div>
    </Dashboard>
  )
}

export default ReportsPage;
