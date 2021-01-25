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
      list: "",
      listId: "",
      listName: "",
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
  onChangeSelect(e) {
    const listData = e.target.value.split("|");
    this.setState({
      list: e.target.value,
      listId: listData[0],
      listName: listData[1],
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.routeChange();
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Header />
        <Body>
          <TitleBar>
            <CancelBtn onClick={() => this.routeChange()}>Cancel</CancelBtn>
            <TitleRem>Edit Task</TitleRem>
            <AddBtn
              onClick={(e) => this.onSubmit(e)}
              disabled={!this.state.title}
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
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
                List
              </InputLabel>
              <Select
                displayEmpty
                value={this.state.list}
                onChange={(e) => this.onChangeSelect(e)}
              >
                {this.props.taskList.map((list, index) => {
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
  };
}

export default connect(mapStateToProps)(EditTask);
