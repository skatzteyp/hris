import React from 'react';
import {  useHistory } from 'react-router-dom';
import { Dashboard, Button } from '@ligph/ui';

import useModules from '../../hooks/useModules';
import { routes } from '../../utils/routes';
import { dashboard } from '../../utils/dashboard';
import { ReactComponent as IconAdd } from '../../assets/images/icon-plus-fill.svg';
import { ReactComponent as IconBack } from '../../assets/images/icon-back.svg';

import CategoryForm from '../../components/admin/CategoryForm';

const InitialFormPage = () => {
  const history = useHistory();
  const [modules, setModule] = useModules()

  const handleCategoryAdd = () => {
    console.log('Add application')
  }

  return (
    <Dashboard
      color="gray"
      menuItems={dashboard.getMenu('admin', 'atsadmin', 'edit-forms')}
      modules={modules}
      onModuleChange={setModule}
      darkmode
      module="Admin"
    >
      <div className="px-12 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button
              color="white"
              onClick={() => history.push(routes.admin.forms)}
              className="mr-2"
            >
              <IconBack className="fill-current" />
            </Button>
            <h2 className="text-3xl text-white font-medium">Pre Final Interview</h2>
          </div>
          <Button
            color="white"
            className="items-center"
            onClick={() => handleCategoryAdd()}
          >
            <IconAdd className="fill-current mr-4" />
            Add Category
          </Button>
        </div>
        <div className="relative min-h-sm mt-8">
          <CategoryForm categoryNum="1" />
        </div>
      </div>
    </Dashboard>
  );
}

export default InitialFormPage;
