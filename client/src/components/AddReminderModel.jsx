import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { getCurrentDate } from "../utils/dateFunction";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { addTask } from "../actions/task";
import TextField from "@material-ui/core/TextField";
import "./editmaterialui.css";
import Header from "./header";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { v4 as uuid } from "uuid";
import Add_task from "./assets/undraw_Add_files_re_v09g.svg";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const TextFieldEdit = withStyles((theme) => ({
  root: {
    margin: "1vh 0 1vh 0",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      fontSize: "2vh",
      font: "2vh",
    },
  },
}))(TextField);

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
  @media (max-height: 600px) {
    overflow: scroll;
    scrollbar-width: none;
  }

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
  cursor: pointer;
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
  cursor: pointer;
  margin: 0 0 0 auto;
  border: none;
  background-color: transparent;
  color: #2d62f3;
  font-size: 1.8vh;
`;
const AddTaskImg = styled.img`
  align-self: center;
  margin: 3vh 0 0 0;
  height: 17vh;
  opacity: 0.85;
`;

class AddReminderModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDateNTime: getCurrentDate(),
      title: "",
      description: "",
      list:
        this.props.taskList.length === 0
          ? ""
          : `${this.props.taskList[0]._id}|${this.props.taskList[0].listName}`,
      listId:
        this.props.taskList.length === 0 ? "" : this.props.taskList[0]._id,
      listName:
        this.props.taskList.length === 0 ? "" : this.props.taskList[0].listName,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }

  componentDidMount() {
    if (this.props.checkedId === "" && this.props.taskList.length !== 0) {
      this.setState({
        list: `${this.props.taskList[0]._id}|${this.props.taskList[0].listName}`,
        listId: this.props.taskList[0]._id,
        listName: this.props.taskList[0].listName,
      });
    } else {
      if (this.props.taskList.length !== 0) {
        const index = this.props.taskList.findIndex(
          (list) => list._id === this.props.checkedId
        );

        this.setState({
          list: `${this.props.taskList[index]._id}|${this.props.taskList[index].listName}`,
          listId: this.props.taskList[index]._id,
          listName: this.props.taskList[index].listName,
        });
      }
    }
  }
  routeChange() {
    this.props.history.goBack();
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onChangeSelect(e) {
    const listData = e.target.value.split("|");
    this.setState({
      list: e.target.value,
      listId: listData[0],
      listName: listData[1],
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
      description,
      this.props.checkedId,
      this.props.taskList
    );
    this.routeChange();
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Header />
        <Body>
          <TitleBar>
            <CancelBtn onClick={() => this.routeChange()}>Cancel</CancelBtn>
            <TitleRem>New Reminder</TitleRem>
            <AddBtn
              onClick={(e) => this.onSubmit(e)}
              disabled={!this.state.title || this.state.list === ""}
            >
              Add
            </AddBtn>
          </TitleBar>
          <AddTaskImg alt="add_task_img" src={Add_task} />
          <FormBody>
            <TextFieldEdit
              name="title"
              label="Title"
              value={this.state.title}
              placeholder={"Enter Title"}
              onChange={(e) => this.onChange(e)}
              margin="normal"
              required
            />
            <TextFieldEdit
              name="description"
              label="Description"
              value={this.state.description}
              placeholder={"Enter Description"}
              onChange={(e) => this.onChange(e)}
            />

            <FormControl>
              <InputLabel shrink>List</InputLabel>
              <Select
                displayEmpty
                value={this.state.list}
                onChange={(e) => this.onChangeSelect(e)}
              >
                {this.props.taskList.length !== 0 ? (
                  this.props.taskList.map((list, index) => {
                    var setVal = list._id + "|" + list.listName;
                    return (
                      <MenuItem key={uuid()} value={setVal}>
                        {list.listName}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem key={uuid()} value={""}>
                    ⚠️ ⚠️ ⚠️  - No list found, kindly add a list
                  </MenuItem>
                )}
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
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
              <KeyboardTimePicker
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
      </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    taskList: state.task.taskList,
    token: state.auth.token,
    checkedId: state.task.clickedListId,
  };
}

export default connect(mapStateToProps, { addTask })(AddReminderModel);
