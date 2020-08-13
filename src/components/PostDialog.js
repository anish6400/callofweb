import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Comments from "./Comments";
import PropTypes from "prop-types";

//MUI
import {
  Typography,
  Tooltip,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  CircularProgress,
  withStyles,
  TextField,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatIcon from "@material-ui/icons/Chat";

//redux
import { connect } from "react-redux";
import {
  likePost,
  unlikePost,
  getPost,
  addComment,
  clearErrors,
} from "../redux/actions/dataAction";

const styles = {
  image: {
    width: 32,
    height: 32,
    borderRadius: 500,
    marginRight: 10,
  },
};

class PostDialog extends Component {
  state = { body: "", open: false, errors: {}, oldPath: "", newPath: "" };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.postId === this.props.post.postId
      )
    )
      return true;
    else return false;
  };
  likePost = () => {
    this.props.likePost(this.props.post.postId);
  };
  unlikePost = () => {
    this.props.unlikePost(this.props.post.postId);
  };
  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, postId } = this.props;
    let newPath = `/users/${userHandle}/post/${postId}`;
    window.history.pushState(null, null, newPath);

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    this.setState({ open: true, oldPath, newPath });
    this.props.getPost(this.props.postId);
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false, errors: {} });
    this.props.clearErrors();
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const commentDetails = {
      body: this.state.body,
    };
    this.props.addComment(this.props.post.postId, commentDetails);
    this.props.clearErrors();
    this.setState({ body: "", errors: {} });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  render() {
    const {
      classes,
      post: {
        commentCount,
        body,
        createdAt,
        likeCount,
        userHandle,
        imageUrl,
        comments,
      },
      UI: { loading },
      user: { authenticated },
    } = this.props;
    const { errors } = this.state;
    const likeButton = !authenticated ? (
      <IconButton component={Link} to="/login">
        <ThumbUpIcon />
      </IconButton>
    ) : this.likedPost() ? (
      <IconButton onClick={this.unlikePost}>
        <ThumbUpIcon color="primary" />
      </IconButton>
    ) : (
      <IconButton onClick={this.likePost}>
        <ThumbUpIcon />
      </IconButton>
    );
    return (
      <Fragment>
        <Tooltip title="See more">
          <IconButton
            onClick={this.handleOpen}
            style={{ position: "absolute", bottom: 0, right: 0 }}
          >
            <ExpandMoreIcon></ExpandMoreIcon>
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          style={{ padding: 24 }}
        >
          <DialogContent>
            <DialogActions style={{ position: "absolute", right: 0, top: 0 }}>
              <IconButton onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogActions>
            {loading ? (
              <CircularProgress></CircularProgress>
            ) : (
              <div>
                <span style={{ display: "flex" }}>
                  <img src={imageUrl} alt="Profile" className={classes.image} />
                  <Typography
                    variant="h6"
                    component={Link}
                    to={`/users/${userHandle}`}
                    color="primary"
                  >
                    {userHandle}
                  </Typography>
                </span>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ marginTop: 5 }}
                >
                  {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                </Typography>
                <Typography>{body}</Typography>
                {likeButton}
                <span>{likeCount}</span>
                <IconButton>
                  <ChatIcon />
                </IconButton>
                <span>{commentCount}</span>
                <form>
                  <TextField
                    name="body"
                    type="text"
                    label="Add Comment"
                    fullWidth
                    className={classes.textField}
                    placeholder="Type your comment"
                    value={this.state.body}
                    onChange={this.handleChange}
                    helperText={errors.comment}
                    error={errors.comment ? true : false}
                  />
                </form>
                <div style={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSubmit}
                    style={{ marginTop: 10 }}
                  >
                    Add
                  </Button>
                </div>
                <Comments comments={comments} />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps, {
  getPost,
  likePost,
  unlikePost,
  addComment,
  clearErrors,
})(withStyles(styles)(PostDialog));
