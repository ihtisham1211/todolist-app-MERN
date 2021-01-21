import React, { Component } from "react";
import styled from "styled-components";
const ContainText = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 1vh 3vh;
`;
const ListNameText = styled.h1`
  color: #2d62f3;
  font-size: 2.2vh;
  margin: 1vh 0 0.5vh 0;
`;

const TaskNameText = styled.h2`
  color: grey;
  font-size: 1.5vh;
  margin: 0 0 0 1vh;
  font-weight: bold;
`;
class SearchItem extends Component {
  render() {
    return (
      <ContainText>
        <ListNameText>{this.props.listName}</ListNameText>
        <TaskNameText>{this.props.taskName}</TaskNameText>
      </ContainText>
    );
  }
}

export default SearchItem;
