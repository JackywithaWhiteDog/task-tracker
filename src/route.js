import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isSignin } from './base.js';

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render = {props => (
        isSignin() ?
          <Component {...props} />
          :
          <Redirect to="/sign" />
      )}
    />
  );
};

const PublicRoute = ({component: Component, restricted, ...rest}) => {
  return (
    <Route
      {...rest}
      render = {props => (
        isSignin() && restricted ?
          <Redirect to="/app/home" />
          :
          <Component {...props} />
      )}
    />
  );
};

export { PrivateRoute, PublicRoute }