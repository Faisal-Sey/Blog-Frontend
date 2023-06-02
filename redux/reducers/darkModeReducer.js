const initialState = {
    dark: false
}
const darkModeReducer = (state=initialState , action) =>{
    switch (action.type){
        case "TOGGLE_DARK_MODE":
            return {dark: !state.dark}
        default:
            return state
    }

}
export default darkModeReducer;