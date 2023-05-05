const initialState = {
    colocacao:{}
}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case 'colocacao':
    return { ...state, ...payload }

  default:
    return state
  }
}
