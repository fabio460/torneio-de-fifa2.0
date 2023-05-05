import { configureStore } from '@reduxjs/toolkit'
import campoDeBuscaReducer from './campoDeBuscaReducer'
import autenticacaoReducer from './autenticacaoReducer'
import torneioReducer from './torneioReducer'
import usuarioReducer from './usuarioReducer'
import carregarApiReducer from './carregarApiReducer'
import participantesReducer from './participantesReducer'
import premiadosReducer from './premiadosReducer'
import colocacaoReducer from './colocacaoReducer'
import artilhariaReducer from './artilhariaReducer'
import assisteciaReducer from './assisteciaReducer'
import golsEmpVitoriasReducer from './golsEmpVitoriasReducer'
export const store = configureStore({
  reducer: {
    artilhariaReducer,
    assisteciaReducer,
    golsEmpVitoriasReducer,
    colocacaoReducer,
    premiadosReducer,
    participantesReducer,
    carregarApiReducer,
    usuarioReducer,
    torneioReducer,
    autenticacaoReducer,
    campoDeBuscaReducer
    },
})