import { combineReducers } from "redux";
import authReducer from "./authReducers";
import userInfoReducer from "./userInfoReducer";
import darkModeReducer from "./darkModeReducer";
import setPostIdReducer from "./currentBlogReducer";
import socialStatus from "./setSocialStatusReducer";
import previewDataReducer from "./previewBlogReducer";

const rootReducer = combineReducers({
  authStatus: authReducer,
  userInfo: userInfoReducer,
  darkMode: darkModeReducer,
  postId: setPostIdReducer,
  social: socialStatus,
  previewBlog: previewDataReducer,
});

export default rootReducer;
