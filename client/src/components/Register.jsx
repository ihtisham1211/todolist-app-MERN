import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { createUser } from "../actions/user";
import Alert from "./routering/Alert";
import { Redirect } from "react-router";
import Reg_img from "./assets/undraw_super_thank_you_obwk.png";
import { BiArrowBack } from "react-icons/bi";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

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

const RegisterForm = styled.form`
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
const RegImg = styled.img`
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
const BackBtn = styled.button`
  &:hover {
    color: #cc4c43;
  }
  display: flex;
  background-color: transparent;
  align-self: center;
  margin: 0 auto 0 0;
  border: none;
  color: #322f3d;
  font-size: 3vh;
`;
const Title = styled.h2`
  position: absolute;
  margin-top: 1vh;
  font-size: 3vh;
  line-height: 0.8;
  color: #322f3d;
`;

const RegDiv = styled.div`
  display: flex;
  justify-content: center;
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
          <RegDiv>
            {" "}
            <BackBtn
              onClick={(e) => {
                this.routeChange(`/`);
              }}
            >
              <BiArrowBack />
            </BackBtn>{" "}
            <Title>Register</Title>{" "}
          </RegDiv>

          <RegImg alt="regimg.png" src={Reg_img} />
          <TextBox
            type="name"
            placeholder="Full name"
            name="username"
            value={this.state.username}
            onChange={(e) => this.onChange(e)}
            required
          />
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
            minLength="6"
            value={this.state.password}
            onChange={(e) => this.onChange(e)}
            required
          />
          <ColorButton type="submit">Register</ColorButton>
          <Alert />
        </RegisterForm>
      );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { createUser })(Register);
