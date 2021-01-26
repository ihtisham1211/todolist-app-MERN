import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import SearchItem from "./SearchItem";
import { v4 as uuid } from "uuid";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: transparent;
  z-index: 100;
`;
const Body = styled.div`
  @media (max-width: 400px) {
    width: auto;
    margin: 16vh 1vh 0 1vh;
  }
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 50vh;
  height: 70.5vh;
  background: #111;
  margin: 20vh auto;
  border-radius: 1vh;
  padding: 1.5vh;
`;

export class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalRef: createRef(),
    };
  }

  closeModal(e) {
    if (this.state.modalRef.current === e.target) {
      this.props.onClose();
    }
  }
  render() {
    if (!this.props.open) return null;
    return (
      <Overlay ref={this.state.modalRef} onClick={(e) => this.closeModal(e)}>
        <Body>
          {this.props.searchText === "" ? (
            <div />
          ) : (
            this.props.taskData.map((l) => {
              return l.taskList.map((t) => {
                if (t.title.includes(this.props.searchText)) {
                  return (
                    <SearchItem
                      key={uuid()}
                      listName={l.listName}
                      taskName={t.title}
                      status={t.status}
                      list={l._id}
                      taskId={t._id}
                      description={t.description}
                      date={t.date}
                      history={this.props.history}
                    />
                  );
                }
              });
            })
          )}
        </Body>
      </Overlay>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(SearchResult);
