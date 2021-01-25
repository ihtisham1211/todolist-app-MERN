import React, { Component } from "react";
import styled from "styled-components";
import CheckBox from "./CheckBox";
import { connect } from "react-redux";
import { statusChange } from "../actions/task";
const ContainText = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 1.5vh 1vh;
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
  render() {
    return (
      <div>
        {" "}
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
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    token: state.auth.token,
    listId: state.task.clickedListId,
  };
}

export default connect(mapStateToProps, { statusChange })(SearchItem);
