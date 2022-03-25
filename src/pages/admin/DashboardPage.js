import React from 'react';

import {
  Dashboard,
} from '@ligph/ui';

import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';

const DashboardPage = () => {

const [modules, setModule] = useModules();

  return(
    <Dashboard
      color="gray"
      menuItems={dashboard.getMenu('admin', 'dashboard')}
      modules={modules}
      onModuleChange={setModule}
      module="Admin"
      darkmode
    >
      Dashboard Page
    </Dashboard>
  )
}

export default DashboardPage;
