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

export default function TelaPrincipal() {
  const dispatch = useDispatch()
  const [usuario, setUsuario] = useState<usuarioLogadoType>()
  const [carregando, setCarregando] = useState(true)
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
                <Button onClick={deslogar}>Deslogar</Button>
              </div>
              <div className='telaPrincipalSuperior'>
                <CardParticipantes participantes = {usuario?.torneio[torneio]?.participantes}/>
                <CradPremiacoes/>
              </div>
              <div className='telaPrincipalMeio'>
                <CardEstatisticas/>
                <CardEstatisticas/>
                <CardEstatisticas/>
              </div>
                <div className='telaPrincipalInferior'>
                  {
                    usuario?.torneio[torneio]?.participantes.map((elem, key)=>{
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
