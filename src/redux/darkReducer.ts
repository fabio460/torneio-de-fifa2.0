const initialState = {
    dark: localStorage.getItem('dark') === "true" ? true : !localStorage.getItem("dark") || localStorage.getItem("dark") === "false" && false
}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case 'dark':
   
    return { ...state, ...payload }

  default:
    return state
  }
}
