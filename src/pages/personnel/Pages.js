import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from '../../utils/routes';
import PrivateRoute from '../../components/common/PrivateRoute';

import DashboardPage from './DashboardPage';
import DocumentsPage from './DocumentsPage';
import EmployeeListPage from './EmployeeListPage';
import ReportsPage from './ReportsPage';
import EmployeeDetailPage from './EmployeeDetailPage';
import RequestDocumentPage from './RequestDocumentPage';

const PersonnelPages = () => (
  <Switch>
    <PrivateRoute exact={true} path={routes.personnel.dashboard}>
      <DashboardPage />
    </PrivateRoute>
    <Route path={routes.personnel.list}>
      <EmployeeListPage />
    </Route>
    <Route path={routes.personnel.documents}>
      <DocumentsPage />
    </Route>
    <PrivateRoute path={routes.personnel.reports}>
      <ReportsPage />
    </PrivateRoute>
    <PrivateRoute path={routes.personnel.employeeDetail}>
      <EmployeeDetailPage />
    </PrivateRoute>
    <PrivateRoute path={routes.personnel.requestDocument}>
      <RequestDocumentPage />
    </PrivateRoute>
  </Switch>
);

export default PersonnelPages;
