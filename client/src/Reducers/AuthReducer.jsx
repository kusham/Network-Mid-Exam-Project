import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  FOLLOW_USER,
  LOG_OUT,
  UN_FOLLOW_USER,
  UPDATING_FAIL,
  UPDATING_START,
  UPDATING_SUCCESS,
} from "../Actions/ActionTypes";

const authReducer = (
  state = {
    authData: null,
    loading: false,
    error: false,
    updateLoading: false,
  },
  action
) => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, loading: true, error: false };
    case AUTH_SUCCESS:
      sessionStorage.setItem(
        "profile",
        JSON.stringify({ ...action?.data.user })
      );
      sessionStorage.setItem(
        "token",
        JSON.stringify({ ...action?.data.token })
      );

      return { ...state, authData: action.data.user, loading: false, error: false };

    case AUTH_FAIL:
      return { ...state, loading: false, error: true };
    case UPDATING_START:
      return { ...state, updateLoading: true, error: false };
    case UPDATING_SUCCESS:
      sessionStorage.setItem("profile", JSON.stringify({ ...action?.data.user }));
      return {
        ...state,
        authData: action.data.user,
        updateLoading: false,
        error: false,
      };

    case UPDATING_FAIL:
      return { ...state, updateLoading: true, error: true };

    case LOG_OUT:
      sessionStorage.clear();
      window.location.reload();
      return {
        ...state,
        authData: null,
        loading: false,
        error: false,
        updateLoading: false,
      };

    case FOLLOW_USER:
      return {
        ...state,
        authData: {
          ...state.authData,
          // user: {
          //   ...state.authData.user,
          following: [...state.authData.following, action.data],
          // },
        },
      };

    case UN_FOLLOW_USER:
      return {
        ...state,
        authData: {
          ...state.authData,
          // user: {
          //   ...state.authData.user,
          following: [
            ...state.authData.following.filter(
              (personId) => personId !== action.data
            ),
          ],
          // },
        },
      };

    default:
      return state;
  }
};

export default authReducer;
