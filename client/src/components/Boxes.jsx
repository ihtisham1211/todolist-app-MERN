import React, {Component} from "react";
import styled from "styled-components";
import {RiDeleteBin7Line} from "react-icons/ri";
import {deleteTask, updateTask} from "../actions/task";
import {connect} from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";

const BoxStyle = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  border-radius: 5px;
  width: 100%;
`;

const WorkBox = styled.h5`
  display: flex;
  justify-content: flex-start;
  margin-left: 10px;
  color: #ac8eca;
  font-size: 20px;
  margin-left: 15px;
`;

const TimeBox = styled.h5`
  margin-left: 10px;
  justify-content: flex-end;
  color: #ac8eca;
  font-size: 15px;
`;

const DeleteBtn = styled.button`
  &:hover {
    color: #cc4c43;
  }

  border: none;
  color: #ac8eca;
  background-color: ${(props) => (props.mode ? "#faf8f8" : "#322f3d")};
  font-size: 15px;
  margin-left: auto;
`;
//**************************
//Styles
//**************************

export class Boxes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: this.props.status,
        };
        this.checkClick = this.checkClick.bind(this);
    }

    checkClick() {
        if (this.state.clicked) {
            this.setState({
                clicked: false,
            });
        } else {
            this.setState({
                clicked: true,
            });
            this.props.updateTask(
                this.props.token,
                this.props.id,
                this.props.user,
                this.props.title,
                this.props.date,
                this.props.description,
                this.state.clicked,
                this.props.day,
                this.props.month + 1,
                this.props.years
            );
        }
    }

    render() {
        return (
            <BoxStyle>
                <Checkbox checked={this.props.clicked} onChange={(e) => this.checkClick()}/>
                {!this.state.clicked ? (
                    <WorkBox>
                        <del>{this.props.title}</del>
                    </WorkBox>
                ) : (
                    <WorkBox>{this.props.title}</WorkBox>
                )}
                <DeleteBtn
                    mode={this.props.theme ? 1 : 0}
                    onClick={(e) =>
                        this.props.deleteTask(
                            this.props.token,
                            this.props.id,
                            this.props.user,
                            this.props.day,
                            this.props.month + 1,
                            this.props.years
                        )
                    }
                >
                    <RiDeleteBin7Line/>
                </DeleteBtn>
                <TimeBox>{this.props.date.split("|")[0]}</TimeBox>
            </BoxStyle>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    theme: state.user.theme,
});

export default connect(mapStateToProps, {updateTask, deleteTask})(Boxes);
