import React, { Component } from "react";
import PropTypes from "prop-types";
import StaticProfile from "../components/StaticProfile";
import Post from "../components/Post";
import axios from "axios";
import PostSkeleton from "../components/PostSkeleton";

import { getPeopleData } from "../redux/actions/dataAction";
import { connect } from "react-redux";

import { Grid } from "@material-ui/core";
import UserSkeleton from "../components/UserSkeleton";

class user extends Component {
  state = {
    profile: null,
    postIdParam: null,
  };
  componentDidMount() {
    const userHandle = this.props.match.params.userHandle;
    const postId = this.props.match.params.postId;

    if (postId) this.setState({ postIdParam: postId });
    this.props.getPeopleData(userHandle);
    axios
      .get(`/user/${userHandle}`)
      .then((res) => {
        this.setState({ profile: res.data.user });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { posts, loading } = this.props.data;
    const { postIdParam } = this.state;
    let postsMarkup = loading ? (
      <PostSkeleton />
    ) : posts === null ? (
      <p>No posts made by the user {this.props.match.params.userHandle}</p>
    ) : !postIdParam ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      posts.map((post) => {
        if (post.postId !== postIdParam)
          return <Post key={post.postId} post={post} />;
        else return <Post key={post.postId} post={post} openDialog />;
      })
    );
    return (
      <Grid container>
        <Grid item sm={8} xs={12} style={{ padding: "8px" }}>
          {postsMarkup}
        </Grid>
        <Grid item sm={4} xs={12} style={{ padding: "8px" }}>
          {this.state.profile === null ? (
            <UserSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getPeopleData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getPeopleData })(user);
