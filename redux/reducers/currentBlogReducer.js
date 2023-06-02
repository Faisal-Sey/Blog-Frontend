import { SET_POST_ID } from "../constants/currentBlogConstants";

const initialState = {
    postId: null
}

const setPostIdReducer = (state=initialState, action) => {
    switch (action.type){
        case SET_POST_ID:
            state = action.payload
            return state
        default:
            return state;
    }
}

export default setPostIdReducer;