//libs
import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import "date-fns";
import { v4 as uuid } from "uuid";
//components
import List from "./List";
//functions
import { handleClicked, editClick } from "../actions/user";
import { getData } from "../actions/task";
//icons
import { BiSearchAlt2 } from "react-icons/bi";
import { MdToday } from "react-icons/md";
import { BsCalendar } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";

import Header from "./header";

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
  &:last-child {
    border: none;
  }

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

const EditBtn = styled.button`
  &:hover {
    opacity: 0.7;
  }
  background-color: transparent;
  border: none;
  color: ${(props) => (props.editColor ? "#ff2323" : "#2d62f3")};
  margin: 0 1.5vh 0 auto;
  font-size: 1.8vh;
`;
const EbtnContain = styled.div`
  display: flex;
`;

//**************************
//Styles
//**************************

export class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  routeChange(path) {
    this.props.history.push(path);
  }

  editClicked() {
    this.props.editClick(this.props.edit);
  }
  displayPage(listId) {
    this.props.handleClicked(listId);
    this.routeChange(`/displaytask`);
  }

  componentDidMount() {
    this.props.getData(this.props.token);
  }
  render() {
    return (
      <>
        {this.props.loading ? (
          <div>
            <Header />
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
              <EbtnContain>
                <MyList>My Lists</MyList>
                <EditBtn
                  editColor={this.props.edit}
                  onClick={() => this.editClicked()}
                >
                  Edit
                </EditBtn>
              </EbtnContain>

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
                  <div>" "</div>
                )}
              </ListConatiner>
              <ContainBtn>
                <AddandREM>
                  <RemIcon onClick={() => this.routeChange(`/addrem`)}>
                    <IoMdAddCircle />
                  </RemIcon>
                  <AddRem onClick={() => this.routeChange(`/addrem`)}>
                    New Reminder
                  </AddRem>
                </AddandREM>

                <AddList onClick={() => this.routeChange(`/addlist`)}>
                  Add List
                </AddList>
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
  loading: state.user.loading,
  isAuthenticated: state.auth.isAuthenticated,
  taskList: state.task.taskList,
  edit: state.user.editList,
});

export default connect(mapStateToProps, {
  handleClicked,
  getData,
  editClick,
})(Body);
