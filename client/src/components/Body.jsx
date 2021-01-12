import React, { Component } from "react";
import Date from "./Date";
import List from "./List";
import styled from "styled-components";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { themeChange } from "../actions/user";
import { getAllTasks, storeUserId } from "../actions/task";
import { AiOutlineLogout } from "react-icons/ai";
import { FaExchangeAlt } from "react-icons/fa";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { getCurrentDate } from "../utils/dateFunction";
import "date-fns";
import { BiCalendar } from "react-icons/bi";

const BodyStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 500px;
  height: 680px;
  background: ${(props) => (props.mode ? "#faf8f8" : "#322f3d")};
  margin: 50px auto;
  border-radius: 10px;
  padding: 25px;
`;
const InspiredText = styled.a`
  position: absolute;
  margin: 650px auto auto 180px;
  color: #ac8eca;
`;
const ReactText = styled.span`
  color: #cc4c43;
`;
const BtnDiv = styled.div`
  display: flex;
  align-self: center;
`;
const LogoutBtn = styled.button`
  &:hover {
    color: #cc4c43;
  }

  border: none;
  color: #ac8eca;
  background-color: ${(props) => (props.mode ? "#faf8f8" : "#322f3d")};
  font-size: 20px;
`;
const ThemeBtn = styled.button`
  &:hover {
    color: #cc4c43;
  }

  border: none;
  color: #ac8eca;
  background-color: ${(props) => (props.mode ? "#faf8f8" : "#322f3d")};
  font-size: 20px;
`;
const CalBtn = styled.button`
  &:hover {
    color: #cc4c43;
  }

  border: none;
  color: #ac8eca;
  background-color: ${(props) => (props.mode ? "#faf8f8" : "#322f3d")};
  font-size: 20px;
`;

const UserBadge = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 10px 0 auto;
  background-color: ${(props) => (props.mode ? "#faf8f8" : "#322f3d")};
  border-radius: 30px;
  width: 180px;
`;

const UserImage = styled.img`
  display: block;
  height: 60px;
  width: 60px;
  margin: 0 0 0 10px;
  border-radius: 30px;
`;
const UserTag = styled.button`
  &:hover {
    color: #cc4c43;
  }

  border: none;
  background-color: ${(props) => (props.mode ? "#faf8f8" : "#322f3d")};
  text-transform: uppercase;
  margin-left: auto;
  font-weight: bolder;
  color: #ac8eca;
  border-radius: 30vh;
`;
//**************************
//Styles
//**************************

export class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: getCurrentDate(),
      isOpen: false,
    };
  }

  handleDateChange(date) {
    this.props.getAllTasks(
      this.props.userId,
      this.state.selectedDate.getDate(),
      this.state.selectedDate.getMonth() + 1,
      this.state.selectedDate.getFullYear()
    );
    this.setState({
      selectedDate: date,
    });
  }

  routeChange(path) {
    this.props.history.push(path);
  }

  setIsOpen(cond) {
    this.setState({
      isOpen: cond,
    });
  }

  move(e) {
    e.preventDefault();
    this.routeChange(`/userprofile`);
  }

  componentDidMount() {
    this.props.storeUserId(
      this.props.token,
      this.state.selectedDate.getDate(),
      this.state.selectedDate.getMonth() + 1,
      this.state.selectedDate.getFullYear()
    ); // + getAllTasks
  }

  render() {
    return (
      <div>
        <UserBadge mode={this.props.theme ? 1 : 0}>
          <UserTag
            mode={this.props.theme ? 1 : 0}
            onClick={(e) => this.move(e)}
          >
            {this.props.username}
          </UserTag>
          {this.props.img.length === 0 || this.props.img === null ? (
            <UserImage
              alt=" "
              src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
            />
          ) : (
            <UserImage alt=" " src={this.props.img} />
          )}
        </UserBadge>
        <BodyStyle mode={this.props.theme ? 1 : 0}>
          <BtnDiv>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                open={this.state.isOpen}
                onOpen={() => this.setIsOpen(true)}
                onClose={() => this.setIsOpen(false)}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                InputProps={{ disableUnderline: true }}
                TextFieldComponent={() => null}
                value={this.state.selectedDate}
                onChange={(date) => this.handleDateChange(date)}
              />
            </MuiPickersUtilsProvider>
            <CalBtn
              mode={this.props.theme ? 1 : 0}
              onClick={() => this.setIsOpen(true)}
            >
              <BiCalendar />
            </CalBtn>
            <ThemeBtn
              mode={this.props.theme ? 1 : 0}
              onClick={() => this.props.themeChange(this.props.theme)}
            >
              <FaExchangeAlt />
            </ThemeBtn>
            <LogoutBtn
              mode={this.props.theme ? 1 : 0}
              onClick={() => this.props.logout()}
            >
              <AiOutlineLogout />
            </LogoutBtn>
          </BtnDiv>

          <Date
            day={this.state.selectedDate.getDay()}
            date={this.state.selectedDate.getDate()}
            month={this.state.selectedDate.getMonth()}
          />

          <List
            years={this.state.selectedDate.getFullYear()}
            day={this.state.selectedDate.getDate()}
            month={this.state.selectedDate.getMonth()}
          />
          <InspiredText>
            Inspired by <ReactText>React</ReactText>
          </InspiredText>
        </BodyStyle>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  userId: state.task.userId,
  theme: state.user.theme,
  username: state.user.name,
  img: state.user.image,
});

export default connect(mapStateToProps, {
  logout,
  storeUserId,
  themeChange,
  getAllTasks,
})(Body);
