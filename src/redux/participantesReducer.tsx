const initialState = {
    participantes:[]
}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case 'participantes':
    return { ...state, ...payload }

  default:
    return state
  }
}
