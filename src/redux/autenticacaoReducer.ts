const initialState = {
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDZjOGI2NTM0YzI4MTViMGI5MzAxYSIsImlhdCI6MTY4MjUzMjUzNywiZXhwIjoxNjgyNjE4OTM3fQ.VQPNZOpH8D2o4cwOzzDB7qSv6hwAidMtcdtVfrMJsGw"

}

export default (state = initialState, { type, payload }:any) => {
  switch (type) {

  case 'auth':
    return { ...state, ...payload }

  default:
    return state
  }
}
