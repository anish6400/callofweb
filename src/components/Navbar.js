import React, { Component } from "react";
import { Link } from "react-router-dom";
import Notifications from "./Notifications";

//MUI stuff
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import { IconButton, Tooltip } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AddPost from "./AddPost";

//import redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        {authenticated ? (
          <ToolBar className="nav-container">
            <AddPost />
            <Tooltip title="Home" placement="bottom">
              <IconButton color="inherit" component={Link} to="/">
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <Notifications />
          </ToolBar>
        ) : (
          <ToolBar className="nav-container">
            <Tooltip title="Home" placement="bottom">
              <IconButton color="inherit" component={Link} to="/">
                <HomeIcon />
              </IconButton>
            </Tooltip>
          </ToolBar>
        )}
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
