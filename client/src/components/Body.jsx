//libs
import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import "date-fns";
import { v4 as uuid } from "uuid";
//components
import List from "./List";
import Header from "./header";
import { SearchResult } from "./SearchResult";
//functions
import { editClick, setcheckData } from "../actions/user";
import {
  getData,
  handleClicked,
  loadTaskList,
  getNumbers,
} from "../actions/task";

import { getCurrentDate } from "../utils/dateFunction";

//icons
import { BiSearchAlt2 } from "react-icons/bi";
import { MdToday } from "react-icons/md";
import { BsCalendar } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import AlertM from "./routering/Alert";

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
    margin: 2vh 1vh 0 1vh;
  }
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 50vh;
  height: 77vh;
  background: #111;
  margin: 5vh auto;
  margin-bottom: 0;
  border-radius: 1vh;
  padding: 1.5vh;
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
  width: 100%;
  height: auto;
  border-radius: 1vh;
  background-color: #3b3b3b;
  color: lightgray;
  font-size: 2vh;
  outline: none;
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
    width: 38vw;
    height: 24vw;
  }
  &:hover {
    opacity: 0.7;
  }
  cursor: pointer;
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
  @media (max-width: 400px) {
    font-size: 6vw;
  }
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
  @media (max-width: 400px) {
    font-size: 6vw;
  }
  display: flex;
  align-self: center;
  background-color: #cf2727;
  font-size: 3vh;
  border-radius: 4vh;
  padding: 1vh;
  margin: 1vh auto 1vh 1vh;
  color: #e5e5e5;
`;
const Count = styled.div`
  @media (max-width: 400px) {
    font-size: 6vw;
  }
  color: #e5e5e5;
  font-size: 3vh;
  font-weight: bold;
  margin: 1.5vh 1vh 1vh auto;
`;
const Text = styled.div`
  @media (max-width: 400px) {
    font-size: 5vw;
  }
  color: lightgray;
  font-size: 2.5vh;
  font-weight: bold;
  margin: 1vh;
`;
const ContainBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3vh;
`;

const MyList = styled.h2`
  color: lightgray;
  margin-left: 2vh;
  font-size: 2.5vh;
`;

//***********************************
// List Dropdown
//***********************************
const ListConatiner = styled.div`
  &:last-child {
    border: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
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
const AddList = styled.div`
  &:hover {
    opacity: 0.7;
  }
  cursor: pointer;
  color: #2d62f3;
  font-size: 1.5vh;
  margin-left: auto;
  justify-items: flex-end;
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

const EditBtn = styled.div`
  &:hover {
    opacity: 0.7;
  }
  cursor: pointer;
  color: #2d62f3;
  margin: 2.5vh 1.5vh 0 auto;
  font-size: 1.8vh;
`;
const EbtnContain = styled.div`
  display: flex;
`;
const Divider = styled.div`
  margin: 0 auto 0 auto;
`;
//**************************
//Styles
//**************************

export class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDateNTime: getCurrentDate(),
      isOpen: false,
      search: "",
    };
  }
  routeChange(path) {
    this.props.history.push(path);
  }

  editClicked() {
    this.props.editClick(this.props.edit);
  }
  displayPage(listId) {
    this.props.handleClicked(listId, this.props.taskList);
    this.routeChange(`/displaytask`);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  componentDidMount() {
    if (!this.props.checkData) {
      this.props.getData(this.props.token);
      this.props.setcheckData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevProps.taskList) !== JSON.stringify(this.props.taskList)
    ) {
      this.props.getNumbers(this.props.taskList);
    }
  }

  render() {
    return (
      <>
        {this.props.loading ? (
          <div>
            <Header />
            <SearchResult
              key={uuid()}
              open={this.state.isOpen}
              onClose={() => this.setState({ isOpen: false, search: "" })}
              searchText={this.state.search}
              taskData={this.props.taskList}
              history={this.props.history}
            />
            <BodyStyle>
              {/*SearchBar*/}
              <SearchBar>
                <Seachicon>
                  <BiSearchAlt2 />
                </Seachicon>
                <Searchfield
                  placeholder="Search"
                  onClick={() => this.setState({ isOpen: true })}
                  value={this.state.search}
                  name="search"
                  onChange={(e) => this.onChange(e)}
                  autocomplete="off"
                />
              </SearchBar>

              {/*Container box for boxes*/}
              <ContainBox>
                {/*Today*/}
                <BoxStyle onClick={() => this.routeChange(`/today`)}>
                  <IconCountBlock>
                    <TodayIcon>
                      <MdToday />
                    </TodayIcon>
                    <Count>{this.props.today}</Count>
                  </IconCountBlock>
                  <Text>Today</Text>
                </BoxStyle>
                <Divider />
                {/*Scheduled*/}
                <BoxStyle onClick={() => this.routeChange(`/scheduled`)}>
                  <IconCountBlock>
                    <ScheduledIcon>
                      <BsCalendar />
                    </ScheduledIcon>
                    <Count>{this.props.scheduled}</Count>
                  </IconCountBlock>
                  <Text>Scheduled</Text>
                </BoxStyle>
              </ContainBox>
              <EbtnContain>
                <MyList>My Lists</MyList>
                {this.props.taskList.length !== 0 ? (
                  <EditBtn onClick={() => this.editClicked()}>Edit</EditBtn>
                ) : (
                  <div />
                )}
              </EbtnContain>

              {this.props.taskList.length === 0 ? (
                <div />
              ) : (
                <ListConatiner>
                  {this.props.taskList.length !== 0 ? (
                    this.props.taskList.map((list) => {
                      return (
                        <List
                          key={uuid()}
                          name={list.listName}
                          task={list.taskList.length}
                          id={list._id}
                          displayPage={this.displayPage.bind(this)}
                        />
                      );
                    })
                  ) : (
                    <div />
                  )}
                </ListConatiner>
              )}
              <ContainBtn>
                <AddandREM onClick={() => this.routeChange(`/addrem`)}>
                  <RemIcon>
                    <IoMdAddCircle />
                  </RemIcon>
                  <AddRem>New Reminder</AddRem>
                </AddandREM>

                <AddList onClick={() => this.routeChange(`/addlist`)}>
                  Add List
                </AddList>
              </ContainBtn>
            </BodyStyle>
            <AlertM />
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
  loading: state.user.loading,
  isAuthenticated: state.auth.isAuthenticated,
  taskList: state.task.taskList,
  edit: state.user.editList,
  checkData: state.user.checkData,
  scheduled: state.task.scheduled,
  today: state.task.today,
});

export default connect(mapStateToProps, {
  handleClicked,
  getData,
  editClick,
  setcheckData,
  loadTaskList,
  getNumbers,
})(Body);
