import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Post from "../components/Post";
import PostSkeleton from "../components/PostSkeleton";
import Profile from "../components/Profile";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataAction";

class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.data;
    let recentPostsMarkup = !loading ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <p>
        <PostSkeleton />
      </p>
    );
    return (
      <Grid container>
        <Grid item sm={8} xs={12} style={{ padding: "8px" }}>
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12} style={{ padding: "8px" }}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getPosts })(home);
