import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  LOG_OUT,
  FOLLOW_USER,
  UN_FOLLOW_USER,
  UPDATING_FAIL,
  UPDATING_START,
  UPDATING_SUCCESS,
} from "./ActionTypes";

import * as authAPI from "../API/AuthAPI";

export const login = (formData, navigate) => async (dispatch) => {
  dispatch({ type: AUTH_START });
  try {
    const { data } = await authAPI.logIn(formData);
    dispatch({ type: AUTH_SUCCESS, data: data });
    // setUser(data.user);
    navigate("../home", { replace: true });
  } catch (error) {
    console.log(error);
    dispatch({ type: AUTH_FAIL });
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: AUTH_START });
  try {
    const { confirmPassword, ...otherData } = formData;
    const { data } = await authAPI.signUp(otherData);
    console.log("action start");
    dispatch({ type: AUTH_SUCCESS, data: data });
    // setUser(data.user);
    navigate("../home", { replace: true });
  } catch (error) {
    console.log(error);
    dispatch({ type: AUTH_FAIL });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOG_OUT });
};

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: UPDATING_START });
  try {
    const { data } = await authAPI.updateUser(id, formData);
    dispatch({ type: UPDATING_SUCCESS, data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATING_FAIL });
  }
};

export const uploadImage = (data) => async (dispatch) => {
  try {
    await authAPI.uploadImage(data);
  } catch (error) {
    console.log(error);
  }
};

export const followUser = (id, data) => async (dispatch) => {
  try {
    authAPI.followUser(id, data);
    dispatch({ type: FOLLOW_USER, data: id });
  } catch (error) {
    console.log(error);
  }
};

export const unFollowUser = (id, data) => async (dispatch) => {
  try {
    authAPI.unFollowUser(id, data);
    dispatch({ type: UN_FOLLOW_USER, data: id });
  } catch (error) {
    console.log(error);
  }
};
