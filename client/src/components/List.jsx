import React, {Component} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import Boxes from "./Boxes";
import {v4 as uuid} from "uuid";
import {addTask} from "../actions/task";

const ListBody = styled.div`
  height: 450px;
  overflow-x: hidden;
  scrollbar-width: none;
`;

const ButtonBox = styled.div`
  display: flex;
  border-bottom: 0.5px solid lightgray;
  margin: 5px 0px 8px 0px;
`;
const TextBox = styled.input`
  &:focus {
    color: ${(props) => (props.mode ? "#ac8eca" : "#ac8eca")};
  }

,
&:: placeholder {
  color: ${(props) => (props.mode ? "#ac8eca" : "#ac8eca")};
} width: 100%;
  border: transparent;
  background-color: ${(props) => (props.mode ? "#faf8f8" : "#322f3d")};
  margin-left: 10px;
`;
const AddButton = styled.button`
  font-size: 40px;
  border: transparent;
  color: #ac8eca;
  background-color: ${(props) => (props.mode ? "#faf8f8" : "#322f3d")};
`;
//**************************
//Styles
//**************************

export class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
        };
        this.onChange = this.onChange.bind(this);
        this.addClick = this.addClick.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    addClick() {
        this.props.addTask(
            this.props.userId,
            this.state.input,
            "null",
            this.props.token,
            this.props.day,
            this.props.month + 1,
            this.props.years,
        );
    }

    render() {
        return (
            <ListBody>
                <ButtonBox>
                    <AddButton
                        mode={this.props.theme ? 1 : 0}
                        onClick={(e) => this.addClick(e)}
                    >
                        +
                    </AddButton>
                    <TextBox
                        mode={this.props.theme ? 1 : 0}
                        placeholder="Type Your Task"
                        name="input"
                        value={this.state.input}
                        onChange={(e) => this.onChange(e)}
                    />
                </ButtonBox>
                {this.props.taskList === null ? (
                    <span> </span>
                ) : (
                    this.props.taskList.map((task) => {
                        if (task.user === this.props.userId)
                            return (
                                <Boxes
                                    key={uuid()}
                                    id={task._id}
                                    user={task.user}
                                    title={task.title}
                                    description={task.description}
                                    date={task.date}
                                    status={task.status}
                                    day={this.props.day}
                                    month={this.props.month}
                                    years={this.props.years}
                                />
                            );
                    })
                )}
            </ListBody>
        );
    }
}

const mapStateToProps = (state) => ({
    taskList: state.task.taskList,
    userId: state.task.userId,
    token: state.auth.token,
    theme: state.user.theme,
});

export default connect(mapStateToProps, {addTask})(List);
