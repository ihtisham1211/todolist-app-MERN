import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import styled from "styled-components";
import Alert from "./routering/Alert";
import { Redirect } from "react-router";
import login_img from "./assets/undraw_secure_login_pdn4.png";
import Button from "@material-ui/core/Button";
import { purple } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[400]),
    backgroundColor: purple[400],
    margin: "1vh 0 0.5vh 0",
    width: "70%",
    alignSelf: "center",
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 56vh;
  height: 77vh;
  background: #ffffff;
  margin: 9vh auto;
  border-radius: 1vh;
  padding: 2.5vh;
`;
const TextBox = styled.input`
  align-self: center;
  background-color: #ffffff;
  border: solid 1px #ac8eca;
  padding: 1.1vh 1.3vh;
  margin: 0.8vh 0;
  width: 45vh;
`;

const LoginImg = styled.img`
  align-self: center;
  height: 40vh;
`;
const Title = styled.h2`
  font-size: 3vh;
  margin: 1vh;
  text-align: center;
  line-height: 0.8;
  color: #322f3d;
`;
const Loading = styled.div`
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  &::after {
    content: " ";
    display: block;
    width: 20vh;
    height: 20vh;
    margin: 35vh auto;
    border-radius: 50%;
    border: 6px solid whitesmoke;
    border-color: whitesmoke transparent whitesmoke transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  display: flex;
  margin: auto;
`;
//**************************
//Styles
//**************************

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange(path) {
    this.props.history.push(path);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    const { email, password } = this.state;
    e.preventDefault();
    this.props.login(email, password);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={`/todolist`} />;
    } else
      return (
        <>
          {!this.props.loading ? (
            <LoginForm onSubmit={(e) => this.onSubmit(e)}>
              <Title>Login</Title>
              <LoginImg alt="loginimg.png" src={login_img} />
              <TextBox
                type="email"
                placeholder="Email Address"
                name="email"
                value={this.state.email}
                onChange={(e) => this.onChange(e)}
              />
              <TextBox
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                value={this.state.password}
                onChange={(e) => this.onChange(e)}
              />
              <ColorButton type="submit">Login</ColorButton>
              <ColorButton onClick={(e) => this.routeChange(`/register`)}>
                Register
              </ColorButton>
              <Alert />
            </LoginForm>
          ) : (
            <Loading />
          )}
        </>
      );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.user.loading,
});

export default connect(mapStateToProps, { login })(Login);
