import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const canAccess = (token && Object.keys(token).length > 0) || false;

  return (
    <Route
      { ...rest }
      render={({ location }) =>
        canAccess ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute;
