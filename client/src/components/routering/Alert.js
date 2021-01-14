import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";
import { v4 as uuid } from "uuid";

const AlertM = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
      <Alert key={uuid()} variant="outlined" severity={alert.alertType}>{alert.msg}</Alert>
  ));

AlertM.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(AlertM);
