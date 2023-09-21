const initialState = {
    status:false
}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case 'atualizarDados':
    return { ...state, ...payload }

  default:
    return state
  }
}
