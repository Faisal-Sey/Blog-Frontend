import { SET_USER_INFO, RESET_USER_INFO } from "../constants/userInfoConstant";

const initialLoginState = {
    username: '',
    email: '',
    id: '',
    profileImage: null
}

const userInfoReducer = (state=initialLoginState, action) => {
    switch (action.type){
        case SET_USER_INFO:
            state = action.payload
            return state

        case RESET_USER_INFO:
            state = {}
            return state
        default:
            return state;
    }
}

export default userInfoReducer;