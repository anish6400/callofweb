import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatIcon from "@material-ui/icons/Chat";

//redux
import { connect } from "react-redux";
import { likePost, unlikePost, deletePost } from "../redux/actions/dataAction";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 500,
    marginRight: 10,
  },
  content: {
    padding: 15,
    objectFit: "cover",
    paddingBottom: "0px !important",
  },
};

class Post extends Component {
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
  deletePost = () => {
    this.props.deletePost(this.props.postId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        body,
        imageUrl,
        userHandle,
        commentCount,
        likeCount,
        createdAt,
        postId,
      },
      user: { handle, authenticated },
    } = this.props;
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
    const deleteButton =
      authenticated && handle === userHandle ? (
        <DeletePost postId={postId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <div style={{ display: "flex" }}>
            <CardMedia
              image={imageUrl}
              title="ProfileImage"
              className={classes.image}
            />
            <Typography
              variant="h6"
              component={Link}
              to={`/users/${userHandle}`}
              color="primary"
            >
              {userHandle}
            </Typography>
          </div>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginTop: 5 }}
          >
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" style={{ marginTop: 2 }}>
            {body}
          </Typography>
          {likeButton}
          <span>{likeCount}</span>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <span>{commentCount}</span>
        </CardContent>
        {deleteButton}
        <PostDialog
          postId={postId}
          userHandle={userHandle}
          openDialog={this.props.openDialog}
        />
      </Card>
    );
  }
}

Post.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

export const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { likePost, unlikePost, deletePost })(
  withStyles(styles)(Post)
);
