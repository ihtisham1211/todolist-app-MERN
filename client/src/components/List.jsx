import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { BsListUl } from "react-icons/bs";
import { FaGreaterThan } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { deleteList } from "../actions/task";

const ListIcon = styled.div`
  display: flex;
  align-self: center;
  background-color: #2d62f3;
  font-size: 3vh;
  border-radius: 4vh;
  padding: 1vh;
  margin: 1vh;
  color: #e5e5e5;
`;
const ListBody = styled.div`
  &:hover {
    opacity: 0.7;
  }

  display: flex;
  height: 5vh;
  padding: 1vh;
`;

const ContainTNA = styled.div`
  display: flex;
  margin-top: 1vh;
  border-bottom: 0.5px solid #5f5f5f;
  width: 100%;
`;
const Text = styled.div`
  cursor: pointer;
  margin-left: 1vh;
  color: #e5e5e5;
  font-size: 2vh;
  width: 100%;
`;
const Number = styled.div`
  color: lightgray;
  font-size: 2vh;
  margin-left: auto;
`;
const Arrow = styled.div`
  margin: 0.5vh 0.5vh 0.5vh 1vh;
  color: gray;
  font-size: 1.5vh;
  cursor: pointer;
`;
const Cross = styled.div`
  &:hover {
    color: white;
  }
  cursor: pointer;
  padding: 0;
  margin-bottom: 1.2vh;
  color: #ff2a2a;
  font-size: 2.4vh;
`;
class List extends Component {
  crossClicked() {
    this.props.deleteList(this.props.token, this.props.id);
  }
  render() {
    return (
      <ListBody>
        <ListIcon>
          <BsListUl />
        </ListIcon>
        <ContainTNA>
          <Text onClick={(e) => this.props.displayPage(this.props.id)}>
            {this.props.name}
          </Text>
          <Number>{this.props.task}</Number>
          <Arrow>
            <FaGreaterThan />
          </Arrow>
          {this.props.edit ? (
            <Cross onClick={() => this.crossClicked()}>
              <IoCloseSharp />
            </Cross>
          ) : (
            <div />
          )}
        </ContainTNA>
      </ListBody>
    );
  }
}

function mapStateToProps(state) {
  return {
    edit: state.user.editList,
    token: state.auth.token,
  };
}

export default connect(mapStateToProps, { deleteList })(List);
