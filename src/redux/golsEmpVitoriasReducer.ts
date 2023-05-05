const initialState = {
    dados:{}
}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case "dados":
    return { ...state, ...payload }

  default:
    return state
  }
}
