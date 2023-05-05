const initialState = {
    artilheiros:{}
}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case "artilharia":
    return { ...state, ...payload }

  default:
    return state
  }
}
