import { AnyAction } from "@reduxjs/toolkit"

const initialState = {
    posicao:[]
}

export default (state = initialState, { type, payload }:AnyAction) => {
  switch (type) {

  case 'posicao':
    return { ...state, ...payload }

  default:
    return state
  }
}
