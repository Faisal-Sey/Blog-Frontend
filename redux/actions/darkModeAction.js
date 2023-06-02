export const darkModeAction = ()=>(dispatch)  =>{
    // console.log("dark mode clicked")
    // const html = document.querySelector('html')
    // html.classList.toggle("dark")
    dispatch({type:"TOGGLE_DARK_MODE"})
}