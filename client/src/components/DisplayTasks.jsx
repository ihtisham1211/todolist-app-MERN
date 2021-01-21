import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { IoMdAddCircle } from "react-icons/io";
import { FaLessThan } from "react-icons/fa";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { v4 as uuid } from "uuid";
import Tasks from "./Tasks";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { editClickDot } from "../actions/user";
import Header from "./header";

const ButtonDot = withStyles((theme) => ({
  root: {
    minWidth: "0",
    padding: "0",
    marginRight: "0.5vh",
    lineHeight: "0",
  },
}))(Button);

const StyledMenuDot = withStyles({
  paper: {
    backgroundColor: "#1f1f1f",
    borderRadius: "1vh",
    marginLeft: "3vh",
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
      horizontal: "right",
    }}
    {...props}
  />
));

const StyledMenuItemDot = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: "#3c3c3c",
    },
    "& .MuiSvgIcon-fontSizeSmall": {
      color: "#eee",
      margin: "0.2vh 0 0.2vh auto ",
      fontSize: "1.8vh",
    },
    "& .MuiListItemText-primary": {
      color: "#eee",
      margin: "0.2vh 0 0.2vh 0 ",
      fontSize: "1.6vh",
    },
    "&:last-child": {
      borderBottom: "none",
    },
    padding: "0.2vh 1.2vh 0.2vh 1.2vh",
    borderBottom: "0.5px solid grey",
    margin: "0",
    minHeight: "0",
    letterSpacing: "0",
  },
}))(MenuItem);

const BodyStyle = styled.div`
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
const MenuBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ContainBtn = styled.div`
  display: flex;
  margin-top: auto;
  width: 100%;
  margin-bottom: 1vh;
`;
const AddRem = styled.div`
  border: none;
  background-color: transparent;
  color: #2d62f3;
  font-size: 1.5vh;
  margin-left: 0.5vh;
`;
const RemIcon = styled.div`
  display: flex;
  align-self: center;
  font-size: 2vh;
  border-radius: 4vh;
  margin: 0;
  color: #2d62f3;
`;

const AddandREM = styled.div`
  &:hover {
    opacity: 0.7;
  }
  cursor: pointer;
  display: flex;
  align-self: flex-start;
  align-items: center;
`;
const BackTitleContain = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5vh;
  width: 100%;
`;
const ContainBackList = styled.div`
  display: flex;
  cursor: pointer;
  margin: auto auto 0 0.5vh;
  align-items: center;
`;
const BackBTN = styled.div`
  color: #4271f1;
  margin-top: 0.4vh;
  font-size: 2vh;
`;
const ListTitle = styled.h3`
  color: #2d62f3;
  font-size: 2.2vh;
`;
const ListName = styled.h1`
  margin: 0 0 0 2vh;
  color: #2d62f3;
  font-size: 4.5vh;
`;
const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2vh 0 0 1vh;
  padding: 0.3vh;
  overflow: scroll;
  scrollbar-width: none;
`;

const Dropbtn = styled.div`
  color: #2d62f3;
  font-size: 2.8vh;
  font-weight: normal;
`;

//**************************
//Styles
//**************************

export class DisplayTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      displayTask: [],
      anchor: null,
    };
  }

  routeChange(path) {
    this.props.history.push(path);
  }
  editClicked() {
    this.props.editClickDot(this.props.edit);
  }
  loadTasks() {
    const totalTask = this.props.ListData.map((list) => {
      if (list._id === this.props.userClicked) {
        this.setState({
          label: list.listName,
          displayTask: list.taskList,
        });
      }
    });
  }
  componentDidMount() {
    this.loadTasks();
  }

  render() {
    return (
      <div>
        <Header />
        <BodyStyle>
          <BackTitleContain>
            <ContainBackList
              onClick={() => {
                this.routeChange(`/todolist`);
              }}
            >
              <BackBTN>
                <FaLessThan />
              </BackBTN>
              <ListTitle>Lists</ListTitle>
            </ContainBackList>

            <MenuBox>
              <ButtonDot
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={(e) => this.setState({ anchor: e.currentTarget })}
              >
                <Dropbtn>
                  <HiOutlineDotsCircleHorizontal />
                </Dropbtn>
              </ButtonDot>
              <StyledMenuDot
                id="customized-menu"
                anchorEl={this.state.anchor}
                keepMounted
                open={Boolean(this.state.anchor)}
                onClose={() => this.setState({ anchor: null })}
              >
                <StyledMenuItemDot
                  onClick={() => {
                    this.editClicked();
                    this.setState({ anchor: null });
                  }}
                >
                  <ListItemText primary="Edit " />
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                </StyledMenuItemDot>
                <StyledMenuItemDot>
                  <ListItemText primary="Delete List " />
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                </StyledMenuItemDot>
              </StyledMenuDot>
            </MenuBox>
          </BackTitleContain>
          <ListName>{this.state.label}</ListName>
          <TaskList>
            {this.state.displayTask.map((task) => {
              return (
                <Tasks
                  key={uuid()}
                  id={task._id}
                  date={task.date}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  loadTasks={this.loadTasks.bind(this)}
                />
              );
            })}
          </TaskList>

          <ContainBtn>
            <AddandREM>
              <RemIcon>
                <IoMdAddCircle />
              </RemIcon>
              <AddRem onClick={() => this.routeChange(`/addrem`)}>
                New Reminder
              </AddRem>
            </AddandREM>
          </ContainBtn>
        </BodyStyle>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    img: state.auth.user.image,
    ListData: state.task.taskList,
    userClicked: state.user.clicked,
    edit: state.user.editTask,
  };
}

export default connect(mapStateToProps, { editClickDot })(DisplayTasks);
