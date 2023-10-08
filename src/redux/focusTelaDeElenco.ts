const initialState = {
    focus:false
}

export default (state = initialState, { type, payload }:any
  ) => {
  switch (type) {

  case 'onFocus':
    return { ...state, ...payload }

  default:
    return state
  }
}
