import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";


const AlertM = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
      <Alert severity={alert.alertType}>{alert.msg}</Alert>
  ));

AlertM.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(AlertM);
