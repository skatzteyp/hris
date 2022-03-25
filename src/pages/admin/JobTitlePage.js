import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dashboard, Button, Well, Text } from '@ligph/ui';

import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';

import { ReactComponent as IconBack } from '../../assets/images/icon-back.svg';

import CustomizationList from '../../components/admin/CustomizationList';

import { routes } from '../../utils/routes';

const JobTitlePage = () => {
  const history = useHistory();
  const [modules, setModule] = useModules();
  const items1 = ["Accounting Manager", "Accounting Staff", "Administrative Staff", "Android Mobile Developer", "Back-End .Net Developer", "Back-End Node.JS Developer", "Back-End PHP Developer", "Back-End Ruby on Rails Developer", "Bridge Director", "Bridge Intern", "Bridge SE Engineer", "Flutter Mobile Developer", "Front-End Developer", "HR Manager", "HR Officer", "iOS Mobile Developer", "Operations Manager", "Project Manager"];
  const items2 = ["Quality Analyst Engineer", "UI/UX Designer", "Web Developer - Team Leader", "Quality Assurance", "ERP Engineer", "Back-End Developer", "Senior Team Leader", "Mobile-Web Designer", "Accounting & Finance", "Accounting Manager/Staff/Specialist", "Full-Stack Developer", "Front-End Developer", "PHP Developer", "Android Developer", "iOS Developer", "Word Press Developer", "Ruby on Rails Developer", "Assistant Team Leader"];

  return (
    <Dashboard
      color="gray"
      menuItems={dashboard.getMenu('admin', 'atsadmin', 'fields')}
      modules={modules}
      onModuleChange={setModule}
      module="Admin"
      darkmode
    >
      <div className="px-12 py-4">
        <div className="flex items-center">
          <Button
            color="white"
            className="pl-0"
            onClick={() => history.push(routes.admin.customization)}
          >
            <IconBack className="fill-current" />
          </Button>
          <h2 className="text-3xl text-white font-medium">Job Title</h2>
        </div>

        <Well className="mt-8 px-8 py-8 border-none bg-darkmode-900">
          <h3 className="text-base text-white mb-5">Job List</h3>
          <ul className="flex">
            <div className="w-2/5 mr-10">
              <CustomizationList 
                items={items1}
              />
            </div>
            <div className="w-2/5">
              <CustomizationList 
                items={items2}
              />
            </div>
          </ul>
        </Well>

        <Well className="mt-8 p-8 border-none bg-darkmode-900">
          <span className="text-xs text-white font-light">Add Job Title</span>
          <div className="flex relative mt-2">
            <div className="mr-6 w-1/2">
              <Text
                placeholder="Type Job Title"
                className="text-white not-italic"
                darkmode
              />
            </div>
            <div className="w-1/2">
              <Button
                color="orange"
                variant="fill"
                className="px-10 py-3"
              >Add
              </Button>
            </div>
          </div>
        </Well>

      </div>
    </Dashboard>
  );
}

export default JobTitlePage;