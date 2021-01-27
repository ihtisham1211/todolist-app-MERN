import React, { Component } from "react";
import { connect } from "react-redux";
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { ThemeProvider } from "@material-ui/styles";
import Header from "./header";
import Add_task from "./assets/undraw_text_field_htlv.svg";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { v4 as uuid } from "uuid";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getData, unClickedTask, updateTask } from "../actions/task";

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
  &::-webkit-scrollbar {
    display: none;
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
class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDateNTime: "",
      title: "",
      description: "",
      list: this.props.taskData.listInput,
      listId: "",
      listName: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange(path) {
    if (path) this.props.history.push(path);
    else this.props.history.goBack();
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

  componentDidMount() {
    if (this.props.taskData.length !== 0) {
      const listData = this.props.taskList.filter(
        (l) => this.props.taskData.listId === l._id
      );
      this.setState({
        selectedDateNTime: this.props.taskData.date,
        title: this.props.taskData.title,
        description: this.props.taskData.description,
        list: `${listData[0]._id}|${listData[0].listName}`,
        listId: listData[0]._id,
        listName: listData[0].listName,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.updateTask(
      this.props.token,
      this.state.listId,
      this.props.taskData.taskId,
      this.state.selectedDateNTime,
      this.state.title,
      this.state.description,
      this.props.taskData.status
    );
    this.routeChange(`/todolist`);
    this.props.unClickedTask();
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Header />
        <Body>
          <TitleBar>
            <CancelBtn
              onClick={() => {
                this.props.unClickedTask();
                this.routeChange();
              }}
            >
              Cancel
            </CancelBtn>
            <TitleRem>Edit Task</TitleRem>
            <AddBtn
              onClick={(e) => this.onSubmit(e)}
              disabled={!this.state.title}
            >
              Update
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
                value={this.state.list ? this.state.list : " "}
                onChange={(e) => this.onChangeSelect(e)}
              >
                {this.props.taskList.map((list) => {
                  var setVal = list._id + "|" + list.listName;
                  return (
                    <MenuItem key={uuid()} value={setVal}>
                      {list.listName}
                    </MenuItem>
                  );
                })}
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
    taskData: state.task.clickedTask,
  };
}

export default connect(mapStateToProps, { unClickedTask, getData, updateTask })(
  EditTask
);
