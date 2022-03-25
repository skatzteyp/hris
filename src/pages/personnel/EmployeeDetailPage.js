import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Dashboard,
  Well,
  Button,
  Tabs,
  Tab,
} from '@ligph/ui';

import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';
import { routes } from '../../utils/routes';

import { ReactComponent as IconBack } from '../../assets/images/icon-back.svg';
import { ReactComponent as IconEdit } from '../../assets/images/icon-edit.svg';

import EmployeeInfo from '../../components/personnel/EmployeeInfo';
import EmployeeEvaluation from '../../components/personnel/EmployeeEvaluation';
import EmployeeTraining from '../../components/personnel/EmployeeTraining';


const EmployeeDetailPage = () => {
  const history = useHistory();
  const [modules, setModule] = useModules();

  const [selectedTab, setSelectedTab] = useState('tab1');

  return (
    <Dashboard
      color="orange"
      menuItems={dashboard.getMenu('personnel', 'dashboard')}
      modules={modules}
      onModuleChange={setModule}
      module="Personnel Mgt"
    >

    <div className="px-12 py-4">
      <div className="flex">
        <Button
          color="white"
          onClick={() => history.push(routes.personnel.list)}
        >
          <IconBack className="fill-current" />
        </Button>
        <h2 className="text-white text-3xl font-medium">Employee Detail</h2>

      </div>
      <Well className="mt-8 p-8 text-black">
        <div className="flex">
          <p className="text-2xl font-semibold">Rodolfo Sigmund Castilloburgos </p>
          <div className="flex justify-center items-center">
            <IconEdit className="fill-current text-black-200 cursor-pointer ml-2" />
          </div>
        </div>
        <dl className="flex flex-wrap">
          <div className="w-1/5 mt-5">
            <dt className="text-xs font-medium">Position Applied</dt>
            <dd className="text-sm font-light mt-1">Ruby Developer</dd>
          </div>
          <div className="w-1/5 mt-5">
            <dt className="text-xs font-medium">Level</dt>
            <dd className="text-sm font-light mt-1">Senior Level</dd>
          </div>
          <div className="w-1/5 mt-5">
            <dt className="text-xs font-medium">Date Hired</dt>
            <dd className="text-sm font-light mt-1">Senior Level</dd>
          </div>
        </dl>
      </Well>

      <div className="mt-4">
        <Tabs selected={selectedTab} onChange={setSelectedTab} color="orange">
          <Tab label="Info" value="tab1">
            <Well className="p-8">
              <EmployeeInfo color="orange" />
            </Well>
          </Tab>
          <Tab label="Evaluation" value="tab2">
            <Well className="p-8">
              <EmployeeEvaluation />
            </Well>
          </Tab>
          <Tab label="Training" value="tab3">
            <Well className="p-8">
              <EmployeeTraining />
            </Well>
          </Tab>
          <Tab label="Career Growth" value="tab4">
            <Well className="p-8">
              CAREER GROWTH
            </Well>
          </Tab>
        </Tabs>
      </div>


    </div>

    </Dashboard>
  )
}

export default EmployeeDetailPage;
