const initialState = {
    usuario:{}
}



export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case "usuario":
    return { ...state, ...payload }

  default:
    return state
  }
}
