import { SET_SOCIAL_STATUS } from "../constants/setSocialStatus";

export const setSocialStatus = (data) => async (dispatch) => {
    dispatch({
      type: SET_SOCIAL_STATUS,
      payload: data,
    });
  };
  