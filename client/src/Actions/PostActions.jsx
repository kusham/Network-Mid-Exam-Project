import * as PostApi from "../API/PostAPI";
import {
  COMMENTING_FAIL,
  COMMENTING_START,
  COMMENTING_SUCCESS,
  RETRIEVING_FAIL,
  RETRIEVING_START,
  RETRIEVING_SUCCESS,
  UPLOAD_FAIL,
  UPLOAD_START,
  UPLOAD_SUCCESS,
} from "./ActionTypes";

export const uploadPost = (postData) => async (dispatch) => {
  dispatch({ type: UPLOAD_START });
  try {
    const { data } = await PostApi.uploadPost(postData);
    // setTimeout(() => {
    //   console.log(data)
    dispatch({ type: UPLOAD_SUCCESS, data: data.post });

    // }, 5000);
  } catch (error) {
    console.log(error);
    dispatch({ type: UPLOAD_FAIL });
  }
};

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: RETRIEVING_START });
  try {
    const { data } = await PostApi.getTimelinePosts(id);
    console.log(data);
    console.log("first");
    dispatch({ type: RETRIEVING_SUCCESS, data: data.posts });
  } catch (error) {
    console.log(error);
    dispatch({ type: RETRIEVING_FAIL });
  }
};

export const commentPost = (commentData) => async (dispatch) => {
  console.log(commentData);
  dispatch({ type: COMMENTING_START });
  try {
    const { data } = await PostApi.commentPost(commentData.id, {
      userId: commentData.userId,
      comment: commentData.comment,
    });
    console.log(data);
    if (data.success === true) {
      dispatch({
        type: COMMENTING_SUCCESS,
        data: { id: commentData.id, comment: commentData.comment },
      });
    } else {
      dispatch({ type: COMMENTING_FAIL });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: COMMENTING_FAIL });
  }
};

export const deletePost = (id) => async (dispatch) => {};
