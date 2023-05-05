const initialState = {
    assistentes:{}
}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case "assistencia":
    return { ...state, ...payload }

  default:
    return state
  }
}
