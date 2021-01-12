import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  loading,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.user.loading,
});
export default connect(mapStateToProps)(PrivateRoute);
