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
} from "../Actions/ActionTypes";

const postReducer = (
  state = { posts: [], loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    case UPLOAD_START:
      return { ...state, error: false, uploading: true };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.data],
        uploading: false,
        error: false,
      };
    case UPLOAD_FAIL:
      return { ...state, uploading: false, error: true };

    case RETRIEVING_START:
      return { ...state, loading: true, error: false };
    case RETRIEVING_SUCCESS:
      return { ...state, posts: action.data, loading: false, error: false };
    case RETRIEVING_FAIL:
      return { ...state, loading: false, error: true };

    case COMMENTING_START:
      return { ...state, loading: true, error: false };
    case COMMENTING_SUCCESS: // code does no work as expected. need to fix
    // const index = state.posts.map((post) => post._id === action.data.id && (post.comment = action.data.comment, true));
    return {...state, posts: action.data, loading: false, error: false};
    break;
    case COMMENTING_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default postReducer;
