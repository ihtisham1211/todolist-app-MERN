import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { addList } from "../actions/task";
import TextField from "@material-ui/core/TextField";
import "./editmaterialui.css";
import Header from "./header";
import Add_task from "./assets/undraw_to_do_xvvc.svg";

const TextFieldEdit = withStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    "& label.Mui-focused": {
      color: "grey",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "grey",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "grey",
      },
      "&:hover fieldset": {
        borderColor: "grey",
      },
      "&.Mui-focused fieldset": {
        borderColor: "grey",
      },
    },
  },
}))(TextField);

const Body = styled.div`
  @media (max-width: 400px) {
    width: auto;
    margin: 2vh 1vh 0 1vh;
  }
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 50vh;
  height: 77vh;
  background: #111;
  margin: 5vh auto;
  border-radius: 1vh;
  padding: 1.5vh;
`;

const FormBody = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1.5vh;
`;
const TitleBar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1vh;
`;
const CancelBtn = styled.button`
  &:hover {
    opacity: 0.8;
  }
  cursor: pointer;

  margin: 0 auto 0 0;
  border: none;
  background-color: transparent;
  color: #2d62f3;
  font-size: 1.8vh;
`;
const TitleRem = styled.h3`
  margin: 0 auto 0 auto;
  color: white;
  opacity: 0.8;
  font-size: 2vh;
`;
const AddBtn = styled.button`
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    color: grey;
  }
  cursor: pointer;

  margin: 0 0 0 auto;
  border: none;
  background-color: transparent;
  color: #2d62f3;
  font-size: 1.8vh;
`;
const AddTaskImg = styled.img`
  align-self: center;
  margin: 3vh 0 2vh 0;
  height: 17vh;
  opacity: 0.85;
`;

export class Addlistmodel extends Component {
  constructor(props) {
    super(props);
    this.state = { listName: "" };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    const { listName } = this.state;
    e.preventDefault();
    this.props.addList(this.props.token, listName);
    this.routeChange(`/todolist`);
  }
  render() {
    return (
      <div>
        <Header />
        <Body>
          <TitleBar>
            <CancelBtn onClick={() => this.routeChange(`/todolist`)}>
              Cancel
            </CancelBtn>
            <TitleRem>New List</TitleRem>
            <AddBtn
              onClick={(e) => this.onSubmit(e)}
              disabled={!this.state.listName}
            >
              Done
            </AddBtn>
          </TitleBar>
          <AddTaskImg alt="add_task_img" src={Add_task} />
          <FormBody>
            <TextFieldEdit
              name="listName"
              label="List Name"
              placeholder="Enter List Name"
              value={this.state.listName}
              onChange={(e) => this.onChange(e)}
              required
            />
          </FormBody>
        </Body>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

export default connect(mapStateToProps, { addList })(Addlistmodel);
