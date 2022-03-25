import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { routes } from '../utils/routes';

// common pages
import LoginPage from './LoginPage';
import ResetPasswordPage from './ResetPasswordPage';
import Four0FourPage from './404';

import { Loader } from '@ligph/ui';

// lazy load modules
// TODO: Add loading components for Suspense fallback
const Recruitment = lazy(() => import('./recruitment/Pages'));
const Training = lazy(() => import('./training/Pages'));
const Admin = lazy(() => import('./admin/Pages'));
const Personnel = lazy(() => import('./personnel/Pages'));

const Pages = () => (
  <div className="pages">
    <Switch>
      <Route exact path={routes.login}>
        <LoginPage />
      </Route>
      <Route exact path={routes.resetPassword}>
        <ResetPasswordPage />
      </Route>
      <Suspense fallback={<Loader fullscreen/>}>
        <Route path={routes.recruitment.dashboard}>
          <Recruitment />
        </Route>
        <Route path={routes.training.dashboard}>
          <Training />
        </Route>
        <Route path={routes.admin.dashboard}>
          <Admin />
        </Route>
        <Route path={routes.personnel.dashboard}>
          <Personnel />
        </Route>
        <Route exact path={'/'}>
          <Redirect to={routes.recruitment.dashboard} />
        </Route>
      </Suspense>
      <Route>
        <Four0FourPage />
      </Route>
    </Switch>
  </div>
);

export default Pages;
