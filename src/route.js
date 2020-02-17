import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({component: Component, signin, ...rest}) => {
  return (
    <Route
      {...rest}
      render = {props => (
        signin ?
          <Component {...props} />
          :
          <Redirect to="/sign" />
      )}
    />
  );
};

const PublicRoute = ({component: Component, restricted, signin, ...rest}) => {
  return (
    <Route
      {...rest}
      render = {props => (
        signin && restricted ?
          <Redirect to="/app/home" />
          :
          <Component {...props} />
      )}
    />
  );
};

export { PrivateRoute, PublicRoute }