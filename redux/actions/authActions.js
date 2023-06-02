import { SET_AUTHENTICATION } from "../constants/authConstants";

export const setAuthDataAction = (data) => async (dispatch) => {
    dispatch({
      type: SET_AUTHENTICATION,
      payload: data,
    });
  };
  