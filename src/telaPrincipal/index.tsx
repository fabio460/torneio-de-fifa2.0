import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUsuarioPorIdApi } from '../api/usuarioApi'
import "./telaPrincipal.css"
import CardParticipantes from './cardParticipantes'
import CradPremiacoes from './cardPremiacoes'
import CardEstatisticas from './cardEstatisticas'
import CardElenco from './cardElenco'
import ResponsiveAppBar from '../appBar'
import { idDoUsuarioLogado } from '../metodosUteis'
import { usuarioLogadoType } from '../types'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Carregando from '../carregando'
import EstatisticaArtilheiros from './estatisticaArtilheiro'
import EstatisticaCampeao from './estatisticaCampeao'
import EstatisticaAssistencia from './estatisticaAssistencia'
import { listarStatisticaApi } from '../api/estatisticasApi'

export default function TelaPrincipal() {
  const dispatch = useDispatch()
  const [usuario, setUsuario] = useState<usuarioLogadoType>()
  const [carregando, setCarregando] = useState(true)
  const [estatisticas, setEstatisticas] = useState()
  const torneio = useSelector((state:any)=>state.torneioReducer.torneio)
  const deslogar = ()=>{
    localStorage.removeItem('jwt')
    window.location.reload()
  }

  async function getUsuario() {
    var u = await getUsuarioPorIdApi(idDoUsuarioLogado)
    setCarregando(false)
    setUsuario(u)
    dispatch({
      type:"usuario",
      payload:{usuario:u}
    })
  }
  useEffect(()=>{
    getUsuario()
  },[])
  async function getEstatistica() {
    const est = await listarStatisticaApi(usuario?.torneio[torneio].id || '')
    setEstatisticas(est)
    
  }
  useEffect(()=>{
    getEstatistica()
  },[torneio])
  return (
    <div className='container'>
      {
        carregando?
          <div><Carregando/></div>:
          <div>
            <ResponsiveAppBar/>
            <div className='main'>
              <div className='appBar'>
                <h1>Bem vindo {usuario?.nome}!</h1>
              </div>
              <div className='telaPrincipalSuperior'>
                <CardParticipantes 
                  participantes = {usuario?.torneio[torneio]?.participantes}
                  torneio = {usuario?.torneio}  
                />
                <CradPremiacoes torneio = {usuario?.torneio} usuario={usuario}/>
              </div>
              <div className='telaPrincipalMeio'>
                <EstatisticaCampeao estatistica={estatisticas}/>
                <EstatisticaAssistencia estatistica={estatisticas}/>
                <EstatisticaArtilheiros estatistica={estatisticas}/>
              </div>
                <div className='telaPrincipalInferior'>
                  {
                    usuario?.torneio[torneio]?.participantes?.map((elem, key)=>{
                      return <CardElenco key={key} elenco = {elem}/>
                    })
                  }
                </div>
            </div>
          </div>
      }
    </div>
  )
}
