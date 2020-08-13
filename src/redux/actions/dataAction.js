import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  SET_POST,
  DELETE_POST,
  ADD_POST,
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  ADD_COMMENT,
} from "../types";
import axios from "axios";

//get all posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/posts")
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_POSTS, payload: [] });
    });
};

//like post
export const likePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/like`)
    .then((res) => {
      dispatch({ type: LIKE_POST, payload: res.data });
    })
    .catch((err) => console.log(err));
};

//unlike post
export const unlikePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_POST, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch((err) => console.log(err));
};

export const addPost = (postDetails) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/post", postDetails)
    .then((res) => {
      dispatch({ type: ADD_POST, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/post/${postId}`)
    .then((res) => {
      dispatch({ type: SET_POST, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const addComment = (postId, commentDetails) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/post/${postId}/comment`, commentDetails)
    .then((res) => {
      dispatch({ type: ADD_COMMENT, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

export const getPeopleData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data.posts });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_POSTS, payload: null });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
