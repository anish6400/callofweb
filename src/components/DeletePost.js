import React, { Component } from "react";
import PropTypes from "prop-types";

//MUI stuff
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
//Redux
import { connect } from "react-redux";
import { deletePost } from "../redux/actions/dataAction";

class DeletePost extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleSubmit = () => {
    this.props.deletePost(this.props.postId);
    this.handleClose();
  };
  render() {
    return (
      <div style={{ position: "absolute", right: 0 }}>
        <IconButton onClick={this.handleOpen}>
          <DeleteIcon style={{ color: "#f04f4f" }} />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete this post? </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={this.handleSubmit}
              style={{ backgroundColor: "#f04f4f", color: "#FFF" }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DeletePost.propTypes = {
  classes: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { deletePost })(DeletePost);
