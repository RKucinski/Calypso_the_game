import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import API from '../helpers/API';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // const path = props.location.pathname;
      if (API.isAuth() === false) {
        return <Redirect to="/" />;
      }
      return <Component {...props} />;
    }}
  />
);
export default PrivateRoute;
