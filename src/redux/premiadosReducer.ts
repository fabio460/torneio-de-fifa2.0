const initialState = {
    premiados:[]
}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case 'premiados':
    return { ...state, ...payload }

  default:
    return state
  }
}
