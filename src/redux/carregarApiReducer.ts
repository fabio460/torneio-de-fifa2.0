const initialState = {
    carregar:false
}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case 'carregarApi':
    return { ...state, ...payload }

  default:
    return state
  }
}
