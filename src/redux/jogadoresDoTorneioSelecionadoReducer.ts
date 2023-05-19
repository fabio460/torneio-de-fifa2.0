const initialState = {
    jogadores:[]
}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case "jogadoresDoTorneioSelecionado":
    return { ...state, ...payload }

  default:
    return state
  }
}
