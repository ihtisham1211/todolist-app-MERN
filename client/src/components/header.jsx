import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import ListItemText from "@material-ui/core/ListItemText";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { logout } from "../actions/auth";

const StyledMenu = withStyles({
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

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: "#3c3c3c",
    },
    "& .MuiSvgIcon-fontSizeSmall": {
      color: "#e5e5e5",
      margin: "0.2vh 0 0.2vh auto ",
      fontSize: "2.5vh",
    },
    "& .MuiListItemText-primary": {
      color: "#e5e5e5",
      margin: "0.2vh 0 0.2vh 0 ",
      fontSize: "2.2vh",
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

const MenuBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const UserImage = styled.img`
  border-radius: 5vh;
  height: 6vh;
  width: 6vh;
`;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }
  render() {
    return (
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
            <ListItemText primary="Log out" />
            <ListItemIcon>
              <ExitToAppOutlinedIcon fontSize="small" />
            </ListItemIcon>
          </StyledMenuItem>
        </StyledMenu>
      </MenuBox>
    );
  }
}

function mapStateToProps(state) {
  return {
    img: state.auth.user.image,
  };
}

export default connect(mapStateToProps, { logout })(Header);
