import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CheckBox from "./CheckBox";
import { IoCloseSharp } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import { deleteTask, statusChange, clickedTask } from "../actions/task";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const TaskBody = styled.div`
  margin: 0;
  display: flex;
  opacity: 0.9;
`;
const TitleAndDescContain = styled.div`
  margin: 0 0 1vh 1.5vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 0.5px solid #5f5f5f;
  opacity: 0.85;
`;
const Title = styled.h5`
  margin: 0 0 0.5vh 0;
  color: #e5e5e5;
  font-size: 1.8vh;
  font-weight: normal;
`;
const Description = styled.h5`
  margin: 0 0 0.5vh 0;
  color: grey;
  font-size: 1.5vh;
  font-weight: lighter;
`;
const Info = styled.button`
  &:hover {
    color: #e5e5e5;
  }
  border: none;
  border-bottom: 0.5px solid #5f5f5f;
  background-color: transparent;
  padding: 0 0.5 0 0;
  margin: 0 0 1vh 0;
  color: #2d62f3;
  font-size: 2.4vh;
`;
const Cross = styled.button`
  &:hover {
    color: #e5e5e5;
  }
  border: none;
  border-bottom: 0.5px solid #5f5f5f;
  background-color: transparent;
  padding: 0;
  margin-bottom: 1vh;
  color: #ff2a2a;
  font-size: 2.4vh;
`;

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.status === "true" ? true : false,
    };
    this.routeChange = this.routeChange.bind(this);
  }
  routeChange(path) {
    this.props.history.push(`/edittask`);
  }
  handleCheckboxChange = (event) => {
    this.setState({ checked: event.target.checked });

    if (this.props.listId.length === 0)
      this.props.statusChange(this.props.token, this.props.list, this.props.id);
    else
      this.props.statusChange(
        this.props.token,
        this.props.listId,
        this.props.id
      );
  };
  crossClicked() {
    this.props.deleteTask(this.props.token, this.props.listId, this.props.id);
  }
  infoClicked() {
    const listData = this.props.taskList.filter(
      (l) => this.props.listId === l._id
    );

    const infoTask = {
      taskId: this.props.id,
      listId: this.props.listId,
      title: this.props.title,
      description: this.props.description,
      date: this.props.date,
      status: this.props.status,
      listInput: `${listData[0]._id}|${listData[0].listName}`,
    };
    this.props.clickedTask(infoTask);
    this.routeChange();
  }
  render() {
    return (
      <TaskBody>
        <label>
          <CheckBox
            checked={this.state.checked}
            onChange={this.handleCheckboxChange}
          />
        </label>

        {!this.state.checked ? (
          <TitleAndDescContain>
            <Title>{this.props.title}</Title>
            <Description>{this.props.description}</Description>
          </TitleAndDescContain>
        ) : (
          <TitleAndDescContain>
            <Title>
              <del>{this.props.title}</del>
            </Title>
            <Description>
              <del>{this.props.description}</del>
            </Description>
          </TitleAndDescContain>
        )}

        {this.props.listId !== "" ? (
          <Info onClick={() => this.infoClicked()}>
            <BsInfoCircle />
          </Info>
        ) : (
          <div />
        )}

        {this.props.edit ? (
          <Cross onClick={() => this.crossClicked()}>
            <IoCloseSharp />
          </Cross>
        ) : (
          <div />
        )}
      </TaskBody>
    );
  }
}

function mapStateToProps(state) {
  return {
    edit: state.user.editTask,
    token: state.auth.token,
    listId: state.task.clickedListId,
    taskList: state.task.taskList,
  };
}

export default connect(mapStateToProps, {
  deleteTask,
  statusChange,
  clickedTask,
})(Tasks);
