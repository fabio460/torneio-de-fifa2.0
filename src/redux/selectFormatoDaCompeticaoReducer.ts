const initialState = {
    tipo:localStorage.getItem('tipoDeTorneio') ? localStorage.getItem('tipoDeTorneio') : "1"
}

export default (state = initialState, { type, payload }:any) => {
  localStorage.setItem("tipoDeTorneio",state.tipo?.toString() as string)
  switch (type) {
    case "selectFormatoDaCompeticao":
      return { ...state, ...payload }
      
      default:
        return state
    }
  }
