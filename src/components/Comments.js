import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography } from "@material-ui/core";
import dayjs from "dayjs";

const style = {
  image: {
    width: 32,
    height: 32,
    borderRadius: 500,
    marginRight: 10,
  },
  line: {
    width: "100%",
    height: "0px",
    borderBottom: "1px solid black",
    marginBottom: 10,
    marginTop: 10,
  },
};

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <div>
        <div className={classes.line} />
        <Typography variant="h6" style={{ textAlign: "center" }}>
          Comments
        </Typography>
        {comments ? (
          comments.length === 0 ? (
            <Typography style={{ textAlign: "center" }}>
              No comments found
            </Typography>
          ) : (
            comments.map((comment) => {
              const { body, createdAt, imageUrl, userHandle } = comment;
              return (
                <div>
                  <div className={classes.line} />
                  <span style={{ display: "flex" }}>
                    <img
                      src={imageUrl}
                      alt="Profile"
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
                  </span>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ marginTop: 5 }}
                  >
                    {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                  </Typography>
                  <Typography>{body}</Typography>
                </div>
              );
            })
          )
        ) : null}
      </div>
    );
  }
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
};

export default withStyles(style)(Comments);
