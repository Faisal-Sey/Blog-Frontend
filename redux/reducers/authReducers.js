import { SET_AUTHENTICATION } from "../constants/authConstants";


const initialLoginState = {
    status: false
}

const authReducer = (state=initialLoginState, action) => {
    switch (action.type){
        case SET_AUTHENTICATION:
            return {...state, status: action.payload};
        default:
            return state;
    }
}

export default authReducer;