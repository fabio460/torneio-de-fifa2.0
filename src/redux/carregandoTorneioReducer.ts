const initialState = {
    carregando:false,
    nome:""
}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case 'carregandoTorneio':
    return { ...state, ...payload }

  default:
    return state
  }
}
