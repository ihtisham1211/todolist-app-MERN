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
            <ListItemIcon>
              <ExitToAppOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Log out" />
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
