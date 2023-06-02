import { SET_DATA, RESET_DATA } from '../constants/previewBlogConstant'


const initialLoginState = {
    blog: "",
    clicks: 0,
    comments: {},
    id: 0,
    image: null,
    time_created: "",
    title: "",
    user: {},
    view: 0
}

const previewDataReducer = (state=initialLoginState, action) => {
    switch (action.type){
        case SET_DATA:
            state = action.payload
            return state

        case RESET_DATA:
            state = {}
            return state
        default:
            return state;
    }
}

export default previewDataReducer;