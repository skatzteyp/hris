import { useHistory } from 'react-router-dom';

import { routes } from '../utils/routes';

export default () => {
  const history = useHistory();
  const modules = [ 'Recruitment', 'Training', 'Payroll', 'Attendance', 'Admin', 'Personnel' ];

  const setModule = (module) => {
    history.push(routes[module.toLowerCase()].dashboard);
  }

  return [
    modules,
    setModule
  ]
}
