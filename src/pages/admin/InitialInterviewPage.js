import React, { useState, useEffect }  from 'react';
import {  useHistory } from 'react-router-dom';
import { Dashboard, Button, Well, Text } from '@ligph/ui';
import { useSelector, useDispatch } from 'react-redux';
import { useThrottle } from '@react-hook/throttle';

import useModules from '../../hooks/useModules';
import { routes } from '../../utils/routes';
import { dashboard } from '../../utils/dashboard';
import { ReactComponent as IconAdd } from '../../assets/images/icon-plus-fill.svg';
import { ReactComponent as IconBack } from '../../assets/images/icon-back.svg';
import { ReactComponent as IconX } from '../../assets/images/icon-x.svg'

import {
  getInterviewCriterias,
  updateInterviewCriterias,
  addInterviewCriteria,
  deleteInterviewCriteria,
} from '../../redux/modules/interviewCriteria/interviewCriteriaActions';

const InitialInterviewPage = () => {
  const history = useHistory();
  const [modules, setModule] = useModules();

  const dispatch = useDispatch();
  const { interviewCriterias } = useSelector(state => state.interviewCriteria);
  const [ criterias, setCriterias ] = useState(interviewCriterias);
  const [ changes, setChanges] = useThrottle([], 1/3);

  useEffect(() => {
    dispatch(getInterviewCriterias());
  }, [dispatch]);

  useEffect(() => {
    if (interviewCriterias.length !== criterias.length) {
      setCriterias(interviewCriterias);
    }
  }, [ interviewCriterias, criterias ]);

  const handleChange = (criteria, type, value) => {
    criteria[type] = value;

    setCriterias([...criterias]);

    const change = changes.find(c => c.id === criteria.id);

    if (change) {
      change[type] = value;
    }
    else {
      changes.push(criteria);
    }

    setChanges([...changes]);
  }

  useEffect(() => {
    if (changes.length) {
      dispatch(updateInterviewCriterias(changes));
      setChanges([]);
    }
  }, [changes, setChanges, dispatch]);

  const handleCriteria = () => {
    const newCriteria = {
      sortOrder: criterias[criterias.length - 1].sortOrder + 1,
      name: `Criteria ${criterias.length}`,
      description: '',
      percentage: 0,
    };

    dispatch(addInterviewCriteria(newCriteria));
  }

  const handleRemove = (id) => {
    dispatch(deleteInterviewCriteria({ id }));
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
          <div className="flex">
            <Button
              color="white"
              onClick={() => history.push(routes.admin.forms)}
              className="mr-5"
            >
              <IconBack className="fill-current" />
            </Button>
            <h2 className="text-3xl text-white font-medium">Initial Interview Form</h2>
          </div>
          <Button
            color="white"
            className="items-center"
            onClick={() => handleCriteria()}
          >
            <IconAdd className="fill-current mr-4" />
            Add Criteria
          </Button>
        </div>
        <div className="relative min-h-sm mt-8">
          <Well className="bg-darkmode-900 py-6 px-8 rounded border-none flex items-center">
            <h5 className="text-sm text-white">Set minimum passing score to</h5>
            <Text
              darkmode
              className="ml-4"
              onChange={(e) => {}}
            />
          </Well>
          {criterias.map((criteria,index) => (
            <Well className="mt-4 px-8 py-6 bg-darkmode-900 border-none" key={criteria.id}>
              <p className="font-semibold text-sm mb-5 text-white">{`Criteria ${index+1}`}</p>
              <div className="mb-5">
                <Text
                  label="Name"
                  darkmode
                  onChange={(e) => handleChange(criteria, 'name', e.target.value)}
                  value={criteria.name}
                />
              </div>
              <div className="mb-5">
                <Text
                  label="Description"
                  darkmode
                  onChange={(e) => handleChange(criteria, 'description', e.target.value)}
                  value={criteria.description}
                />
              </div>
              <div className="flex items-center justify-between">
                <Text
                  label="% Equivalent"
                  darkmode
                  onChange={(e) => handleChange(criteria, 'percentage', e.target.value)}
                  value={criteria.percentage}
                />
                <Button
                  color="red"
                  variant="outline"
                  onClick={() => handleRemove(criteria.id)}
                >
                  <IconX className="stroke-current stroke-2 mr-2 transform scale-75" />
                  Delete
                </Button>
              </div>
            </Well>
          ))}
        </div>
      </div>
    </Dashboard>
  );
}

export default InitialInterviewPage;
