import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { addList } from "../actions/task";
import AlertM from "./routering/Alert";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;
const FormBody = styled.form`
  @media (max-width: 400px) {
    width: auto;
    margin: 40vh 1vh 0 1vh;
  }
  display: flex;
  flex-direction: column;
  width: 50vh;
  background: #111;
  margin: 40vh auto;
  border-radius: 1vh;
  padding: 1.5vh;
`;
const TextBox = styled.input`
  align-self: center;
  background-color: #ffffff;
  border-radius: 1vh;
  border: none;
  padding: 1.1vh 1.3vh;
  margin: 0.8vh 0;
  width: 80%;
  height: 1.5vh;
  font-size: 2vh;
`;
const ColorButton = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#2d62f3",
    margin: "1vh",
    width: "23vh",
    height: "4.5vh",
    alignSelf: "center",
    fontSize: "2vh",
    "&:hover": {
      backgroundColor: "#7292ec",
    },
  },
}))(Button);

export class Addlistmodel extends Component {
  constructor(props) {
    super(props);
    this.state = { modalRef: createRef(), listName: "" };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  closeModal(e) {
    if (this.state.modalRef.current === e.target) {
      this.props.onClose();
    }
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
  }
  render() {
    if (!this.props.open) return null;
    return (
      <Overlay ref={this.state.modalRef} onClick={(e) => this.closeModal(e)}>
        <FormBody onSubmit={(e) => this.onSubmit(e)}>
          <TextBox
            placeholder={"Enter List Name"}
            type="text"
            name="listName"
            value={this.state.listName}
            onChange={(e) => this.onChange(e)}
            required
          />
          <ColorButton type="submit">Add to List</ColorButton>
          <AlertM />
        </FormBody>
      </Overlay>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

export default connect(mapStateToProps, { addList })(Addlistmodel);
