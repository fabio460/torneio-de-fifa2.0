const initialState = {
    lista:null
}

const campoDeBuscaReducer = (state = initialState, { type, payload }:any) => {
  switch (type) {

  case 'busca':
    return { ...state, ...payload }

  default:
    return state
  }
}

export default campoDeBuscaReducer
