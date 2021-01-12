import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { createUser } from "../actions/user";
import Alert from "./routering/Alert";
import { Redirect } from "react-router";
import Reg_img from "./assets/undraw_super_thank_you_obwk.png";
import {BiArrowBack} from "react-icons/bi";

const RegisterForm = styled.form`
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
const BtnBox = styled.button`
  &:hover {
    background-color: #9b48bf;
    color: black;
  }
  align-self: center;
  border: solid 1px #ac8eca;
  padding: 1vh 1.3vh;
  margin: 0.8vh 0;
  font-weight: bold;
  width: 28vh;
  font-size: 1.7vh;
  background-color: #ac8eca;
  transition: 0.3s;
`;
const RegImg = styled.img`
  align-self: center;
  height: 40vh;
`;
const BackBtn = styled.button`
  &:hover {
    color: #cc4c43;
  }
  background-color: #ffffff;
  align-self: flex-start;
  margin: 0;
  border: none;
  color: #ac8eca;
  font-size: 3vh;

`;
//**************************
//Styles
//**************************

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
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
    const { username, email, password } = this.state;
    e.preventDefault();
    this.props.createUser(username, email, password);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={`/todolist`} />;
    } else
      return (
        <RegisterForm onSubmit={(e) => this.onSubmit(e)}>
            <BackBtn
          onClick={(e) => {
            this.routeChange(`/`);
          }}
        >
          <BiArrowBack />
        </BackBtn>
          <RegImg alt="regimg.png" src={Reg_img} />
          <TextBox
            type="name"
            placeholder="Full name"
            name="username"
            value={this.state.username}
            onChange={(e) => this.onChange(e)}
          />
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
          <BtnBox type="submit">Register</BtnBox>
          <Alert />
        </RegisterForm>
      );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { createUser })(Register);
