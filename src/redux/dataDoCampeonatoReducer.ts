const initialState = {
    data:null
}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case 'dataDoCampeonato':
    return { ...state, ...payload }

  default:
    return state
  }
}
