import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from '../../utils/routes';
import PrivateRoute from '../../components/common/PrivateRoute';

import DashboardPage from './DashboardPage';
import ApplicantListPage from './ApplicantListPage';
import ApplicantDetailPage from './ApplicantDetailPage';
import ApplicantInfoPage from './ApplicantInfoPage';
import ApplicantPrefinalPage from './ApplicantPrefinalPage';
import ReportsPage from './ReportsPage';

const RecruitmentPages = () => (
  <Switch>
    <PrivateRoute exact={true} path={routes.recruitment.dashboard}>
      <DashboardPage />
    </PrivateRoute>
    <Route exact path={routes.recruitment.applicantList}>
      <ApplicantListPage />
    </Route>
    <Route path={routes.recruitment.applicantInfo}>
      <ApplicantInfoPage />
    </Route>
    <PrivateRoute path={routes.recruitment.applicantPrefinal}>
      <ApplicantPrefinalPage />
    </PrivateRoute>
    <PrivateRoute path={routes.recruitment.applicantDetail}>
      <ApplicantDetailPage />
    </PrivateRoute>
    <PrivateRoute exact path={routes.recruitment.reports}>
      <ReportsPage />
    </PrivateRoute>
  </Switch>
);

export default RecruitmentPages;
