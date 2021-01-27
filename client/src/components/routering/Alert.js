import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";
import { v4 as uuid } from "uuid";
import "./alert.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const AlertM = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <ThemeProvider key={uuid()} theme={theme}>
      <Alert key={uuid()} severity={alert.alertType}>
        {alert.msg}
      </Alert>
    </ThemeProvider>
  ));

AlertM.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(AlertM);
