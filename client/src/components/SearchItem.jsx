import React, { Component } from "react";
import styled from "styled-components";
import CheckBox from "./CheckBox";
import { connect } from "react-redux";
import { statusChange } from "../actions/task";
import { BsInfoCircle } from "react-icons/bs";
import { v4 as uuid } from "uuid";
import { clickedTask } from "../actions/task";

const Full = styled.div`
  display: flex;
`;
const ContainText = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 1.5vh 1vh;
  flex-grow: 1;
`;
const Info = styled.button`
  &:hover {
    color: #e5e5e5;
  }

  border: none;
  background-color: transparent;
  align-self: flex-start;
  color: #2d62f3;
  font-size: 2vh;
  margin-top: 0.4vh;
`;
const ListNameText = styled.h1`
  color: #2d62f3;
  font-size: 2.2vh;
  margin: 0 0 0.5vh 1vh;
`;

const TaskNameText = styled.h2`
  color: grey;
  font-size: 1.5vh;
  margin: 0 0 0 3.7vh;
  font-weight: bold;
`;
const CandLn = styled.div`
  display: flex;
`;

class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.status === "true" ? true : false,
    };
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
  routeChange(path) {
    this.props.history.push(`/edittask`);
  }
  infoClicked() {
    const infoTask = {
      taskId: this.props.taskId,
      listId: this.props.list,
      title: this.props.taskName,
      description: this.props.description,
      date: this.props.date,
      status: this.props.status,
    };
    this.props.clickedTask(infoTask);
    this.routeChange();
  }

  render() {
    return (
      <Full key={uuid()}>
        {!this.state.checked ? (
          <ContainText>
            <CandLn>
              <label>
                <CheckBox
                  checked={this.state.checked}
                  onChange={this.handleCheckboxChange}
                />
              </label>
              <ListNameText>{this.props.listName}</ListNameText>
            </CandLn>

            <TaskNameText>{this.props.taskName}</TaskNameText>
          </ContainText>
        ) : (
          <ContainText>
            <CandLn>
              <label>
                <CheckBox
                  checked={this.state.checked}
                  onChange={this.handleCheckboxChange}
                />
              </label>
              <ListNameText>
                <del>{this.props.listName}</del>
              </ListNameText>
            </CandLn>

            <TaskNameText>
              <del>{this.props.taskName}</del>
            </TaskNameText>
          </ContainText>
        )}
        <Info onClick={() => this.infoClicked()}>
          <BsInfoCircle />
        </Info>
      </Full>
    );
  }
}
function mapStateToProps(state) {
  return {
    token: state.auth.token,
    listId: state.task.clickedListId,
  };
}

export default connect(mapStateToProps, { statusChange, clickedTask })(
  SearchItem
);
