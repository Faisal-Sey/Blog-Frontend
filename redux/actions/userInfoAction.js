import { SET_USER_INFO, RESET_USER_INFO } from "../constants/userInfoConstant";

export const setUserDataAction = (data) => async (dispatch) => {
    dispatch({
      type: SET_USER_INFO,
      payload: data,
    });
  };

export const resetUserInfo = () => async (dispatch) => {
    dispatch({
      type: RESET_USER_INFO,
    });
};
  