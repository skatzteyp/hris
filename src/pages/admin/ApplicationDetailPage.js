import React from 'react';
import {  useHistory } from 'react-router-dom';
import { Dashboard, Button } from '@ligph/ui';
import './custom-scrollbar.scss'

import useModules from '../../hooks/useModules';
import { routes } from '../../utils/routes';
import { dashboard } from '../../utils/dashboard';
import { ReactComponent as IconBack } from '../../assets/images/icon-back.svg';
import { ReactComponent as IconAdd } from '../../assets/images/icon-plus-fill.svg';
import { ReactComponent as IconX } from '../../assets/images/icon-x.svg'

const ApplicationDetailPage = () => {
  const history = useHistory();
  const [modules, setModule] = useModules();
  
  const handleApplicantionAdd = () => {
    console.log('Add application')
  }

  return (
    <Dashboard
      color="gray"
      menuItems={dashboard.getMenu('admin', 'applications')}
      modules={modules}
      onModuleChange={setModule}
      darkmode
      module="Admin"
    >
    <div className="flex justify-between items-center px-12 mt-4">
      <div className="flex">
        <Button
          color="white"
          onClick={() => history.push(routes.admin.applicationList)}
          className="mr-5"
        >
          <IconBack className="fill-current" />
        </Button>
        <h2 className="text-white text-3xl font-medium">Application Detail</h2>
      </div>
      <Button
        color="white"
        className="items-center"
        onClick={() => handleApplicantionAdd()}
      >
        <IconAdd className="fill-current mr-4" />
        Add Application
      </Button>
    </div>
    <div className="mt-4 px-12">
      <div className="h-full p-12 bg-darkmode-900 rounded-md text-white ">
        <div>
          <h4>Software Name</h4>
          <div className="w-3/4 p-4 mt-2 bg-darkmode-800 rounded-md">
            <p className="break-all">Slack</p>
          </div>
        </div>
        <div className="pt-8 flex justify-between">
          <div className="w-1/2 mr-6">
            <h4>Content</h4>
            <div className="h-64 w-full py-4 pl-4 pr-2 mt-2 bg-darkmode-800 rounded-md">
              <div className="h-full w-full overflow-y-scroll custom-scrollbar">
                <p className="break-all">SlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlack</p>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <h4>Preview</h4>
            <div className="h-64 w-full py-4 pl-4 pr-2 mt-2 bg-darkmode-800 rounded-md">
              <div className="h-full w-full overflow-y-scroll custom-scrollbar">
                <p className="break-all">SlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlackSlack</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-4 px-12">
      <div className="py-4 px-12 bg-darkmode-900 rounded-md text-white ">
        <Button
          color="red"
          variant="outline"
        >
          <IconX className="stroke-current stroke-2 mr-2 transform scale-75" />
          Delete
        </Button>
      </div>
    </div>
    </Dashboard>
  );
}

export default ApplicationDetailPage;