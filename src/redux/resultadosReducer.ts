const initialState = {
    resultado:null
}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case "resultado":
    return { ...state, ...payload }

  default:
    return state
  }
}
