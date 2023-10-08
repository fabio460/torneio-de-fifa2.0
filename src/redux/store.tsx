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
import posicaoSelectJogadorReducer from './posicaoSelectJogadorReducer'
import jogadoresDoTorneioSelecionadoReducer from './jogadoresDoTorneioSelecionadoReducer'
import checkedDeletarPart from './checkedDeletarPart'
import torneioAtualReducer from './torneioAtualReducer'
import inputFocusReducer from './inputFocusReducer'
import arrayPremiadosReducer from './arrayPremiadosReducer'
import darkReducer from './darkReducer'
import selectFormatoDaCompeticaoReducer from './selectFormatoDaCompeticaoReducer'
import atualizarDadosReducer from './atualizarDadosReducer'
import dataDoCampeonatoReducer from './dataDoCampeonatoReducer'
import btnDisableCompraJogReducer from './btnDisableCompraJogReducer'
import carregandoTorneioReducer from './carregandoTorneioReducer'
import focusTelaDeElenco from './focusTelaDeElenco'
export const store = configureStore({
  reducer: {
    focusTelaDeElenco,
    carregandoTorneioReducer,
    btnDisableCompraJogReducer,
    dataDoCampeonatoReducer,
    atualizarDadosReducer,
    selectFormatoDaCompeticaoReducer,
    darkReducer,
    arrayPremiadosReducer,
    inputFocusReducer,
    torneioAtualReducer,
    checkedDeletarPart,
    jogadoresDoTorneioSelecionadoReducer,
    posicaoSelectJogadorReducer,
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