import React, {Component} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {clearList} from "../actions/task";

const DateStyle = styled.div`
  display: flex;
  margin: 0px;
  border-bottom: 0.5px solid lightgray;
  padding-bottom: 15px;
`;
const DayStyle = styled.div`
  color: #a664e7;
  font-size: 25px;
  margin-right: 250px;
`;
const TaskStyle = styled.div`
  position: center;
  color: #ac8eca;
`;
const ButtonStyle = styled.button`
  background-color: #ec4d5b;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: bold;
  border-radius: 3px;
  border: transparent;
  color: ${(props) => (props.mode ? "#faf8f8" : "#322f3d")};
  padding-top: 7px;
  padding-bottom: 7px;
  margin-top: 15px;
`;
const MonthStyle = styled.div`
  font-size: 20px;
  color: #ac8eca;
  margin-top: 10px;
`;
var m = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
var d = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//**************************
//Styles
//**************************

export class Date extends Component {
    render() {
        return (
            <DateStyle>
                <div>
                    <DayStyle>
                        <b>{d[this.props.day]},</b>{this.props.date}th
                        <MonthStyle>{m[this.props.month]}</MonthStyle>
                    </DayStyle>
                </div>
                <TaskStyle>
                    <b>{this.props.taskList === null ? 0 : this.props.taskList.length}</b>{" "}
                    Tasks
                    <ButtonStyle
                        mode={this.props.theme ? 1 : 0}
                        onClick={(e) =>
                            this.props.clearList(this.props.taskList, this.props.token, this.props.day, this.props.month + 1, this.props.years)
                        }
                    >
                        clear list
                    </ButtonStyle>
                </TaskStyle>
            </DateStyle>
        );
    }
}

const mapStateToProps = (state) => ({
    taskList: state.task.taskList,
    token: state.auth.token,
    theme: state.user.theme,
});

export default connect(mapStateToProps, {clearList})(Date);
