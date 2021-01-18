//libs
import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import "date-fns";
import { v4 as uuid } from "uuid";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
//components
import List from "./List";
import Addlistmodel from "./Addlistmodel";
//functions
import { logout } from "../actions/auth";
import { themeChange } from "../actions/user";
import { getData } from "../actions/task";
//icons
import { BiSearchAlt2 } from "react-icons/bi";
import { MdToday } from "react-icons/md";
import { BsCalendar } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import AddReminderModel from "./AddReminderModel";

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
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
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

const Loading = styled.div`
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  &::after {
    content: " ";
    display: block;
    width: 20vh;
    height: 20vh;
    margin: 35vh auto;
    border-radius: 50%;
    border: 6px solid whitesmoke;
    border-color: whitesmoke transparent whitesmoke transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  display: flex;
  margin: auto;
`;
const BodyStyle = styled.div`
  @media (max-width: 400px) {
    width: auto;
    margin: 5vh 1vh 0 1vh;
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
const UserImage = styled.img`
  border-radius: 5vh;
  height: 6vh;
  width: 6vh;
`;
//***********************************
// Search
//***********************************
const SearchBar = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: #3b3b3b;
  opacity: 0.7;
  border-radius: 1vh;
  width: 100%;
  height: 4vh;
`;
const Searchfield = styled.input`
  border: none;
  width: auto;
  background-color: #3b3b3b;
  color: lightgray;
  font-size: 2vh;
`;
const Seachicon = styled.div`
  font-size: 2.5vh;
  margin: 0.8vh 1vh 0 0.5vh;
  color: lightgray;
`;
//***********************************
// 2 boxes
//***********************************
const BoxStyle = styled.div`
  @media (max-width: 400px) {
    margin-top: 1vh;
  }
  &:hover {
    opacity: 0.7;
  }
  margin-left: auto;
  margin-right: auto;
  background-color: #3b3b3b;
  border-radius: 2vh;
  height: 12vh;
  width: 22vh;
  padding: 1vh;
`;
const IconCountBlock = styled.div`
  display: flex;
`;
const TodayIcon = styled.div`
  display: flex;
  align-self: center;
  background-color: #2d62f3;
  font-size: 3vh;
  border-radius: 4vh;
  padding: 1vh;
  margin: 1vh auto 1vh 1vh;
  color: #e5e5e5;
`;
const ScheduledIcon = styled.div`
  display: flex;
  align-self: center;
  background-color: #ff2323;
  font-size: 3vh;
  border-radius: 4vh;
  padding: 1vh;
  margin: 1vh auto 1vh 1vh;
  color: #e5e5e5;
`;
const Count = styled.div`
  color: #e5e5e5;
  font-size: 3vh;
  font-weight: bold;
  margin: 1.5vh 1vh 1vh auto;
`;
const Text = styled.div`
  color: lightgray;
  font-size: 2.5vh;
  font-weight: bold;
  margin: 1vh;
`;
const ContainBox = styled.div`
  @media (max-width: 400px) {
    flex-direction: column;
  }
  display: flex;
  justify-content: center;
  margin-top: 3vh;
`;

const MyList = styled.h2`
  color: lightgray;
  margin-left: 4vh;
  font-size: 2.5vh;
`;

//***********************************
// List Dropdown
//***********************************
const ListConatiner = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1vh 0 1vh;
  background-color: #3b3b3b;
  border-radius: 2vh;
  padding: 0.5vh;
  overflow: scroll;
  scrollbar-width: none;
`;
//***********************************
// Bottom buttons
//***********************************
const ContainBtn = styled.div`
  display: flex;
  margin-top: auto;
  width: 100%;
  margin-bottom: 0;
`;
const AddRem = styled.button`
  border: none;
  background-color: transparent;
  color: #2d62f3;
  font-size: 1.5vh;
`;
const RemIcon = styled.div`
  display: flex;
  align-self: center;
  font-size: 3vh;
  border-radius: 4vh;
  margin: 1vh auto 1vh 1vh;
  color: #2d62f3;
`;
const AddList = styled.button`
  &:hover {
    opacity: 0.7;
  }
  border: none;
  background-color: transparent;
  color: #2d62f3;
  font-size: 1.5vh;
  margin-left: auto;
  justify-items: flex-end;
`;
const AddandREM = styled.div`
  &:hover {
    opacity: 0.7;
  }
  display: flex;
  align-self: flex-start;
`;
const MenuBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
//**************************
//Styles
//**************************

export class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      isOpen: false,
      isOpen_rem: false,
    };
  }
  routeChange(path) {
    this.props.history.push(path);
  }
  componentDidMount() {
    this.props.getData(this.props.token);
  }
  render() {
    return (
      <>
        {this.props.loading ? (
          <div>
            <MenuBox>
              <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={(e) => this.setState({ anchorEl: e.currentTarget })}
              >
                {this.props.img.length === 0 || this.props.img === null ? (
                  <UserImage
                    alt="userImage"
                    src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
                  />
                ) : (
                  <UserImage alt="userImage" src={this.props.img} />
                )}
              </Button>
              <StyledMenu
                id="customized-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={() => this.setState({ anchorEl: null })}
              >
                <StyledMenuItem onClick={() => this.props.logout()}>
                  <ListItemIcon>
                    <ExitToAppOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </StyledMenuItem>
              </StyledMenu>
            </MenuBox>
            <BodyStyle>
              {/*SearchBar*/}
              <SearchBar>
                <Seachicon>
                  <BiSearchAlt2 />
                </Seachicon>
                <Searchfield placeholder="Search" />
              </SearchBar>
              {/*Container box for boxes*/}
              <ContainBox>
                {/*Today*/}
                <BoxStyle>
                  <IconCountBlock>
                    <TodayIcon>
                      <MdToday />
                    </TodayIcon>
                    <Count>0</Count>
                  </IconCountBlock>
                  <Text>Today</Text>
                </BoxStyle>
                {/*Scheduled*/}
                <BoxStyle>
                  <IconCountBlock>
                    <ScheduledIcon>
                      <BsCalendar />
                    </ScheduledIcon>
                    <Count>0</Count>
                  </IconCountBlock>
                  <Text>Scheduled</Text>
                </BoxStyle>
              </ContainBox>
              <MyList>My Lists</MyList>
              <ListConatiner>
                {this.props.taskList.length !== 0 ? (
                  this.props.taskList.map((list) => {
                    return (
                      <List
                        key={uuid()}
                        name={list.listName}
                        task={list.taskList.length}
                      />
                    );
                  })
                ) : (
                  <div>" "</div>
                )}
              </ListConatiner>
              <ContainBtn>
                <AddandREM>
                  <RemIcon>
                    <IoMdAddCircle />
                  </RemIcon>
                  <AddRem onClick={() => this.setState({ isOpen_rem: true })}>
                    New Reminder
                  </AddRem>
                </AddandREM>
                <AddReminderModel
                  open={this.state.isOpen_rem}
                  onClose={() => this.setState({ isOpen_rem: false })}
                />
                <AddList onClick={() => this.setState({ isOpen: true })}>
                  Add List
                </AddList>
                <Addlistmodel
                  open={this.state.isOpen}
                  onClose={() => this.setState({ isOpen: false })}
                />
              </ContainBtn>
            </BodyStyle>
          </div>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  userId: state.auth.user._id,
  img: state.auth.user.image,
  loading: state.user.loading,
  isAuthenticated: state.auth.isAuthenticated,
  taskList: state.task.taskList,
});

export default connect(mapStateToProps, {
  logout,
  themeChange,
  getData,
})(Body);
