const initialState = {
    torneio:0
}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case "torneio":
    return { ...state, ...payload }

  default:
    return state
  }
}
