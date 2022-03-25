import React, { useState } from 'react';
import { Dashboard, Button } from '@ligph/ui';

import { useHistory } from 'react-router-dom';

import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';
import { routes } from '../../utils/routes';
import { ReactComponent as IconAdd } from '../../assets/images/icon-plus-fill.svg';

import Customization from '../../components/admin/Customization';

const EditFormsPage = () => {
  const history = useHistory();
  const [modules, setModule] = useModules();
  const [ customization ] = useState([
    { title: "Initial Interview Form", link: routes.admin.initialInterview },
    { title: "Exam Results Form", link: routes.admin.examResults },
    { title: "Pre-Final Interview Form", link: routes.admin.prefinalInterview },
    { title: "Background Check Form", link: routes.admin.initialInterview },
  ])


  const handleCustomizationAdd = () => {
    console.log('Add application')
  }

  const handleEdit = (link) => {
    history.push(link)
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
          <h2 className="text-3xl text-white font-medium">Edit Forms</h2>
          <Button
            color="white"
            className="items-center"
            onClick={() => handleCustomizationAdd()}
          >
            <IconAdd className="fill-current mr-4" />
            Add Customization
          </Button>
        </div>
        <div className="relative min-h-sm mt-8">
          { customization.map( (custom, index) => {
            return <Customization key={index} title={custom.title} link={custom.link} onEdit={handleEdit}/>
          })}
        </div>
      </div>
    </Dashboard>
  );
}

export default EditFormsPage;