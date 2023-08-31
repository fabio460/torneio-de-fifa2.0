import Toolbar from '@mui/material/Toolbar';
import React, { useEffect, useState } from 'react'
import { getUsuarioPorIdApi } from '../api/usuarioApi'
import "./telaPrincipal.css"
import "../index.css"
import CardParticipantes from './cards/cardParticipantes'
import CradPremiacoes from './cards/cardPremiacoes'
import CardElenco from './cards/cardElenco'
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
import BtnScroll from './btnScroll';
import Footer from './footer';
import ScrollComponents from '../ScrollComponent';
import { dark, darkBackgroundContainer } from '../temaDark';


export default function TelaPrincipal() {
  const dispatch = useDispatch()
  const torneio = useSelector((state:any)=>state.torneioReducer.torneio)
  const [usuario, setUsuario] = useState<usuarioLogadoType>()
  localStorage.setItem("idDoTorneio",usuario?.torneio[torneio]?.id || '')
  const [carregando, setCarregando] = useState(true)
  const [estatisticas, setEstatisticas] = useState()
  const participantes = useSelector((state:any)=>state.participantesReducer.participantes)
  var id = localStorage.getItem("idDoTorneio") || ""
  
  async function getUsuario() {
    var u = await getUsuarioPorIdApi(idDoUsuarioLogado)
    setCarregando(false)
    setUsuario(u)
    dispatch({
      type:"usuario",
      payload:{usuario:u}
    })
  }
  
  async function getEstatistica() {
    if (id !== "") {
      const est = await listarStatisticaApi(id)
      setEstatisticas(est)
    }
  }
  
  useEffect(()=>{
    getUsuario()
  },[])
  
  useEffect(()=>{    
    getEstatistica()
  },[torneio,id])
  const darkMode = useSelector((state:any)=>state.darkReducer.dark)

  return (
    <React.Fragment >
      <Toolbar id="back-to-top-anchor" />
      <div className='container' style={{background:!darkMode ? darkBackgroundContainer:""}}>
      {
        carregando?
        <div><Carregando/></div>:
          <div>
            <ResponsiveAppBar/>
            <div className='main'>
              <div className='appBar'>
                <h1 style={{textAlign:"center", marginTop:"10px"}}></h1>
              </div>
              <div className='telaPrincipalSuperior '>
                <CardParticipantes 
                  participantes = {usuario?.torneio[torneio]?.participantes}
                  torneio = {usuario?.torneio}  
                />
                <CradPremiacoes usuario={usuario}/>
              </div>
              <h2 style={{textAlign:"center",marginTop:"30px"}}>Estatisticas</h2>
              <div className='telaPrincipalMeio'>
                <EstatisticaCampeao estatistica={estatisticas}/>
                <EstatisticaAssistencia estatistica={estatisticas}/>
                <EstatisticaArtilheiros estatistica={estatisticas}/>
              </div>
              <h2 style={{textAlign:"center",marginTop:"20px"}}>Elencos do torneio</h2>
              <div className='telaPrincipalInferior'>
                {
                  usuario?.torneio[torneio]?.participantes?.map((elem, key)=>{
                    return <CardElenco key={key} elenco = {elem}/>
                  })
                }
              </div>
              <div className='footer'>
              </div>
            </div>
          </div>
      }
    </div>
      {
        participantes.length > 0 &&
        <ScrollComponents >
          <BtnScroll usuario={usuario}/>
        </ScrollComponents>
      }
      {/* <Footer/> */}
    </React.Fragment>
  );
}

