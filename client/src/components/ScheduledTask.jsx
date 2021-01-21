import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Header from "./header";
import { FaLessThan } from "react-icons/fa";
import Tasks from "./Tasks";
import { v4 as uuid } from "uuid";
import { IoMdAddCircle } from "react-icons/io";
import { getCurrentDate } from "../utils/dateFunction";

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
  color: #cf2727;
  margin-top: 0.4vh;
  font-size: 2vh;
`;
const ListTitle = styled.h3`
  color: #cf2727;
  font-size: 2.2vh;
`;
const ListName = styled.h1`
  margin: 0 0 0 2vh;
  color: #cf2727;
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

export class ScheduledTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TodayDate: getCurrentDate(),
    };
  }
  routeChange(path) {
    this.props.history.push(path);
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
          </BackTitleContain>
          <ListName>Scheduled</ListName>
          <TaskList>
            {this.props.displayTask.map((l) => {
              return l.taskList.map((t) => {
                const dts = new Date(t.date);
                if (this.state.TodayDate.getFullYear() <= dts.getFullYear()) {
                  if (this.state.TodayDate.getMonth() <= dts.getMonth()) {
                    if (this.state.TodayDate.getDate() < dts.getDate()) {
                      return (
                        <Tasks
                          key={uuid()}
                          id={t._id}
                          date={t.date}
                          title={t.title}
                          description={l.listName}
                          status={t.status}
                        />
                      );
                    }
                  }
                }
              });
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
    displayTask: state.task.taskList,
  };
}

export default connect(mapStateToProps)(ScheduledTask);
