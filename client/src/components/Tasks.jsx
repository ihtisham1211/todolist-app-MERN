import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CheckBox from "./CheckBox";
import { IoCloseSharp } from "react-icons/io5";
import { deleteTask } from "../actions/task";
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
const Cross = styled.button`
  &:hover {
    color: white;
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
  }
  handleCheckboxChange = (event) => {
    this.setState({ checked: event.target.checked });
  };
  crossClicked() {
    this.props.deleteTask(this.props.token, this.props.listId, this.props.id);
    this.props.loadTasks();
    this.forceUpdate();
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

        <TitleAndDescContain>
          <Title>{this.props.title}</Title>
          <Description>{this.props.description}</Description>
        </TitleAndDescContain>
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
    listId: state.user.clicked,
  };
}

export default connect(mapStateToProps, { deleteTask })(Tasks);
