import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AlertM from "./routering/Alert";
import { getCurrentDate } from "../utils/dateFunction";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import { v4 as uuid } from "uuid";
import { addTask } from "../actions/task";
import TextField from "@material-ui/core/TextField";
import "./editmaterialui.css";
import Header from "./header";

const TextFieldEdit = withStyles((theme) => ({
  root: {
    margin: "1vh",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    "& label.Mui-focused": {
      color: "grey",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "grey",
      },
      "&:hover fieldset": {
        borderColor: "grey",
      },
      "&.Mui-focused fieldset": {
        borderColor: "grey",
      },
    },
  },
}))(TextField);

const Date = withStyles((theme) => ({
  root: {
    margin: "1vh",
  },
}))(KeyboardDatePicker);

const Time = withStyles((theme) => ({
  root: {
    margin: "1vh",
  },
}))(KeyboardTimePicker);

const StyledMenu = withStyles({
  paper: {
    backgroundColor: "#111",
    borderRadius: "1vh",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: "#3b3b3b",
    },
    "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
      color: "#e5e5e5",
    },
  },
}))(MenuItem);

const Body = styled.div`
  @media (max-width: 400px) {
    width: auto;
    margin: 2vh 1vh 0 1vh;
  }
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 50vh;
  height: 77vh;
  background: #111;
  margin: 5vh auto;
  border-radius: 1vh;
  padding: 1.5vh;
`;
const FormBody = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1.5vh;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1vh;
`;
const CancelBtn = styled.button`
  &:hover {
    opacity: 0.8;
  }

  margin: 0 auto 0 0;
  border: none;
  background-color: transparent;
  color: #2d62f3;
  font-size: 1.8vh;
`;
const TitleRem = styled.h3`
  margin: 0 auto 0 auto;
  color: white;
  opacity: 0.8;
  font-size: 2vh;
`;
const AddBtn = styled.button`
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    color: grey;
  }
  margin: 0 0 0 auto;
  border: none;
  background-color: transparent;
  color: #2d62f3;
  font-size: 1.8vh;
`;

class AddReminderModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      selectedDateNTime: getCurrentDate(),
      title: "",
      description: "",
      list: "",
      listId: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }
  routeChange() {
    this.props.history.goBack();
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    const { selectedDateNTime, title, description, listId } = this.state;
    e.preventDefault();
    this.props.addTask(
      this.props.token,
      listId,
      selectedDateNTime,
      title,
      description
    );
    this.routeChange();
  }

  render() {
    return (
      <div>
        <Header />
        <Body>
          <TitleBar>
            <CancelBtn onClick={() => this.routeChange()}>Cancel</CancelBtn>
            <TitleRem>New Reminder</TitleRem>
            <AddBtn
              onClick={(e) => this.onSubmit(e)}
              disabled={!this.state.title}
            >
              Add
            </AddBtn>
          </TitleBar>

          <FormBody>
            <TextFieldEdit
              name="title"
              label="Title"
              value={this.state.title}
              placeholder={"Enter Title"}
              onChange={(e) => this.onChange(e)}
              required
            />
            <TextFieldEdit
              name="description"
              label="Description"
              value={this.state.description}
              placeholder={"Enter Description"}
              onChange={(e) => this.onChange(e)}
            />

            <TextFieldEdit
              name="listName"
              label="List"
              value={this.state.list}
              placeholder={"Select List"}
              onChange={(e) => this.onChange(e)}
              aria-controls="customized-menu"
              aria-haspopup="true"
              onClick={(e) => this.setState({ anchorEl: e.currentTarget })}
              required
            />
            <StyledMenu
              id="customized-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={() => this.setState({ anchorEl: null })}
            >
              {this.props.taskList.map((list) => {
                return (
                  <StyledMenuItem
                    key={uuid()}
                    onClick={() =>
                      this.setState({
                        list: list.listName,
                        listId: list._id,
                        anchorEl: null,
                      })
                    }
                  >
                    <ListItemText primary={list.listName} />
                  </StyledMenuItem>
                );
              })}
            </StyledMenu>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Date
                disableToolbar
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-filled"
                label="Date"
                value={this.state.selectedDateNTime}
                onChange={(date) => this.setState({ selectedDateNTime: date })}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                required
              />
              <Time
                margin="normal"
                id="time-picker"
                label="Time"
                value={this.state.selectedDateNTime}
                onChange={(time) => this.setState({ selectedDateNTime: time })}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
                required
              />
            </MuiPickersUtilsProvider>
          </FormBody>
        </Body>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    taskList: state.task.taskList,
    token: state.auth.token,
  };
}

export default connect(mapStateToProps, { addTask })(AddReminderModel);
