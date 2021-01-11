import React, {Component} from "react";
import {connect} from "react-redux";
import {login} from "../actions/auth";
import styled from "styled-components";
import Alert from "./routering/Alert";
import {Redirect} from "react-router";

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 500px;
  min-height: 600px;
  margin: 300px auto;
`;
const TextBox = styled.input`
  margin: 10px;
  height: 20px;
  border: solid 1px #ac8eca;
`;
const BtnBox = styled.button`
  margin: 10px;
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
        const {email, password} = this.state;
        e.preventDefault();
        this.props.login(email, password);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to={`/todolist`}/>;
        } else
            return (
                <LoginForm onSubmit={(e) => this.onSubmit(e)}>
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
                    <BtnBox type="submit">Login</BtnBox>
                    <BtnBox onClick={(e) => this.routeChange(`/register`)}>
                        Register
                    </BtnBox>
                    <Alert/>
                </LoginForm>
            );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {login})(Login);
