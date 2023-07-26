const initialState = {
    focus:false
}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case "inputFocus":
    return { ...state, ...payload }

  default:
    return state
  }
}
