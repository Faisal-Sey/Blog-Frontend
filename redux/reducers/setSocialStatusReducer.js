import { SET_SOCIAL_STATUS, RESET_SOCIAL_STATUS } from "../constants/setSocialStatus";

const initialLoginState = {
    status: true
}

const socialStatus = (state=initialLoginState, action) => {
    switch (action.type){
        case SET_SOCIAL_STATUS:
            return {...state, status: action.payload};

        case RESET_SOCIAL_STATUS:
            state = {}
            return state
        default:
            return state;
    }
}

export default socialStatus;