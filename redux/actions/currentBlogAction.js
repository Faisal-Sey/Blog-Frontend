import { SET_POST_ID } from "../constants/currentBlogConstants";

export const setPostIdAction = (data) => async (dispatch) => {
    dispatch({
      type: SET_POST_ID,
      payload: data,
    });
  };