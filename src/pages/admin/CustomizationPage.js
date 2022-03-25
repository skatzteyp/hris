import React, { useState } from 'react';
import { Dashboard, Button } from '@ligph/ui';

import { useHistory } from 'react-router-dom';

import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';
import { routes } from '../../utils/routes';
import { ReactComponent as IconAdd } from '../../assets/images/icon-plus-fill.svg';

import Customization from '../../components/admin/Customization';


const CustomizationPage = () => {
  const history = useHistory();
  const [modules, setModule] = useModules();
  const [ customization ] = useState([
    { title: "Application Status", link: routes.admin.applicantStatus},
    { title: "Compensation Package", link: routes.admin.compensationPackage},
    { title: "Educational Attainment", link: routes.admin.educationalAttainment},
    { title: "Gender", link: routes.admin.gender},
    { title: "Job Title", link: routes.admin.jobTitle},
    { title: "Level", link: routes.admin.level},
    { title: "Marital Status", link: routes.admin.maritalStatus},
    { title: "Pre-Employment Requirement", link: routes.admin.preemploymentRequirement},
    { title: "Question Category", link: routes.admin.applicantStatus},
    { title: "Source", link: routes.admin.source},
    { title: "Validity", link: routes.admin.validity},
    { title: "Years Experience", link: routes.admin.yearsExperience},
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
      menuItems={dashboard.getMenu('admin', 'atsadmin', 'fields')}
      modules={modules}
      onModuleChange={setModule}
      darkmode
      module="Admin"
    >
      <div className="px-12 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl text-white font-medium">Customization</h2>
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
            return <Customization 
                    key={index} 
                    title={custom.title}
                    link={custom.link} 
                    onEdit={handleEdit}/>
          })}
        </div>
      </div>
    </Dashboard>
  );
}

export default CustomizationPage;