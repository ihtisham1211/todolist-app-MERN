import React, {Component} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {createUser} from "../actions/user";
import Alert from "./routering/Alert";
import {Redirect} from "react-router";

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 500px;
  min-height: 600px;
  margin: 300px auto;
`;
const TextBox = styled.input`
  margin: 10px;
`;
const BtnBox = styled.button`
  margin: 10px;
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
        const {username, email, password} = this.state;
        e.preventDefault();
        this.props.createUser(username, email, password);
    }

    render() {
        if (this.props.isAuthenticated) {
            console.log("register");
            return <Redirect to={`/todolist`}/>;
        } else
            return (
                <RegisterForm onSubmit={(e) => this.onSubmit(e)}>
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
                    <Alert/>
                </RegisterForm>
            );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {createUser})(Register);
