import React from 'react';
import {  useHistory } from 'react-router-dom';
import { Dashboard, Button, Well, Text } from '@ligph/ui';

import useModules from '../../hooks/useModules';
import { routes } from '../../utils/routes';
import { dashboard } from '../../utils/dashboard';
import { ReactComponent as IconAdd } from '../../assets/images/icon-plus-fill.svg';
import { ReactComponent as IconBack } from '../../assets/images/icon-back.svg';
import { ReactComponent as IconX } from '../../assets/images/icon-x.svg'

const InitialFormPage = () => {
  const history = useHistory();
  const [modules, setModule] = useModules()

  const matrixs = [
    {
      id: '1',
      description: 'Lorem ipsum dolor'
    },
    {
      id: '2',
      description: 'Lorem dolor ipsum'
    },
    {
      id: '3',
      description: 'ipsum dolor Lorem'
    },
    {
      id: '4',
      description: 'ipsum dolor Lorem'
    },
  ]


  const handleMatrixAdd = () => {
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
            <h2 className="text-3xl text-white font-medium">Exam Results Form</h2>
          </div>
          <Button
            color="white"
            className="items-center"
            onClick={() => handleMatrixAdd()}
          >
            <IconAdd className="fill-current mr-4" />
            Add Matrix
          </Button>
        </div>
        <div className="relative min-h-sm mt-8">
          <>
            {matrixs.map((matrix, item) => (
              <Well className="mt-4 px-8 py-6 bg-darkmode-900 border-none" key={item}>
                <p className="font-semibold text-sm mb-5 text-white">{`Matrix ${item+1}`}</p>
                <div className="mb-5">
                  <Text 
                    label="Description"
                    darkmode
                    onChange={() => {}}
                    value={matrix.description}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    color="red"
                    variant="outline"
                  >
                    <IconX className="stroke-current stroke-2 mr-2 transform scale-75" />
                    Delete
                  </Button>
                </div>
              </Well>
            ))
            }
          </>
        </div>
      </div>
    </Dashboard>
  );
}

export default InitialFormPage;