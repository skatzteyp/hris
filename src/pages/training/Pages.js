import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from '../../utils/routes';
import PrivateRoute from '../../components/common/PrivateRoute';

import DashboardPage from './DashboardPage';
import OnboardingListPage from './OnboardingListPage';
import OnboardingDetailPage from './OnboardingDetailPage';
import TrainingListPage from './TrainingListPage';
import TrainingDetailPage from './TrainingDetailPage';
import MyResults from './MyResults';
import HelpfulArticles from './HelpfulArticles';

const TrainingPages = () =>(
  <Switch>
    <Route exact path={routes.training.dashboard}>
      <DashboardPage />
    </Route>
    <PrivateRoute exact path={routes.training.onboardingList}>
      <OnboardingListPage />
    </PrivateRoute>
    <PrivateRoute path={routes.training.onboardingDetail}>
      <OnboardingDetailPage />
    </PrivateRoute>
    <PrivateRoute exact path={routes.training.trainingList}>
      <TrainingListPage />
    </PrivateRoute>
    <PrivateRoute path={routes.training.trainingDetail}>
      <TrainingDetailPage />
    </PrivateRoute>
    <PrivateRoute exact path={routes.training.results}>
      <MyResults />
    </PrivateRoute>
    <PrivateRoute exact path={routes.training.articles}>
      <HelpfulArticles />
    </PrivateRoute>
  </Switch>
);

export default TrainingPages;
