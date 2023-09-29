const initialState = {
    disable:true
}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case "btnDisableCompraJogReducer":
    return { ...state, ...payload }

  default:
    return state
  }
}
