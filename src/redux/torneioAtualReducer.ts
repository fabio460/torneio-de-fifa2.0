import { torneioType } from "../types"

type torneioReduxTypes = {
  torneio:torneioType | null
}

const initialState:torneioReduxTypes = {
    torneio:null
}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case "torneioAtual":
    return { ...state, ...payload }

  default:
    return state
  }
}
