import { SET_DATA, RESET_DATA } from "../constants/previewBlogConstant";

export const previewBlogAction = (data) => async (dispatch) => {
    dispatch({
      type: SET_DATA,
      payload: data,
    });
};

export const previewBlogResetAction = (data) => async (dispatch) => {
    dispatch({
      type: RESET_DATA,
      payload: data,
    });
};
