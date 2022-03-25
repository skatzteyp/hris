import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Dashboard,
  Well,
  Button,
  Dropdown,
  Textarea,
} from '@ligph/ui';

import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';
import { routes } from '../../utils/routes';

import { ReactComponent as IconBack } from '../../assets/images/icon-back.svg';


const RequestDocumentsPage = () => {
  const history = useHistory();
  const [modules, setModule] = useModules();

  return (
    <Dashboard
      color="orange"
      menuItems={dashboard.getMenu('personnel', 'documents')}
      modules={modules}
      onModuleChange={setModule}
      module="Personnel"
    >
      <div className="px-12 py-4">
        <div className="flex">
          <Button
            color="white"
            onClick={() => history.push(routes.personnel.documents)}
          >
            <IconBack className="fill-current" />
          </Button>
          <h2 className="text-white text-3xl font-medium">Request Documents</h2>
        </div>

        <Well className="mt-8 p-8 text-black">
          <div className="mb-10">
            <label className="font-semibold mb-4 block">Document Title</label>
            <Dropdown
              className="w-full"
              placeholder="Select a position"
              value="Ruby Developer"
            />
          </div>
          <div className="mb-10">
            <label className="font-semibold mb-4 block">Reason of Request</label>
            <Textarea
              className="w-full"
              style={{ height: '160px' }}
              placeholder="Enter Reason of Request"
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            />
          </div>
          <div className="mb-10">
            <label className="font-semibold mb-2 block">Note:</label>
            <p>Document request may take up to 3 to 5 working days.</p>
          </div>
        </Well>

        <Well className="mt-8 p-8 text-black">
          <div className="flex justify-end">
            <Button
            color="orange"
              variant="fill"
              className="bg-orange"
            >
              Submit
            </Button>
          </div>
        </Well>
      </div>
    </Dashboard>
  )
}

export default RequestDocumentsPage;
