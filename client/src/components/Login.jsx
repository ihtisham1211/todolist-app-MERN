import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import styled from "styled-components";
import Alert from "./routering/Alert";
import { Redirect } from "react-router";
import login_img from "./assets/undraw_secure_login_pdn4.png";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

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

const LoginForm = styled.form`
  @media (max-width: 450px) {
    width: auto;
    margin: 9vh 1vh 0 1vh;
  }
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

const LoginImg = styled.img`
  @media (max-width: 450px) {
    height: 30vh;
  }
  @media (max-width: 250px) {
    height: 15vh;
  }
  align-self: center;
  margin: 0.5vh;
  height: 40vh;
`;
const TextBox = styled.input`
  align-self: center;
  background-color: #ffffff;
  border-radius: 0.5vh;
  border: solid 1px #322f3d;
  padding: 1.1vh 1.3vh;
  margin: 0.8vh 0;
  width: 80%;
  height: 1.5vh;
  font-size: 2vh;
`;
const ColorButton = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#322f3d",
    margin: "1vh",
    width: "23vh",
    height: "4.5vh",
    alignSelf: "center",
    fontSize: "1.7vh",
    "&:hover": {
      backgroundColor: "#6f6b7c",
    },
  },
}))(Button);

const Title = styled.h2`
  font-size: 3vh;
  margin: 2vh 1vh;
  text-align: center;
  line-height: 0.8;
  color: #322f3d;
`;

const BtnContainer = styled.div`
  @media (max-width: 450px) {
    flex-direction: column;
    margin: 1vh;
  }
  display: flex;
  justify-content: center;
  margin-top: 1vh;
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
                required
              />
              <TextBox
                type="password"
                placeholder="Password"
                name="password"
                minLength="4"
                value={this.state.password}
                onChange={(e) => this.onChange(e)}
                required
              />
              <BtnContainer>
                <ColorButton type="submit">Login</ColorButton>
                <ColorButton onClick={(e) => this.routeChange(`/register`)}>
                  Register
                </ColorButton>
              </BtnContainer>

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
