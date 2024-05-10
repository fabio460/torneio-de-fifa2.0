import Toolbar from '@mui/material/Toolbar';
import React, { useEffect, useState } from 'react'
import { getUsuarioPorIdApi } from '../api/usuarioApi'
import "./telaPrincipal.css"
import "../index.css"
import CardParticipantes from './cards/cardParticipantes'
import CradPremiacoes from './cards/cardPremiacoes'
import CardElenco from './cards/cardElenco'
import ResponsiveAppBar from '../appBar'
import { getDataTorneio, getHoraTorneio, idDoUsuarioLogado } from '../metodosUteis'
import { tabelaDeResultadosType, usuarioLogadoType } from '../types'
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
import Mensagens from '../componentesGlobais/mensagens';
import CardTabelaDeClassificacao from './cards/cardTabelaDeClassificacao';
import CardTabelaResultados from './cards/cardTabelaResultados';
import { listarTabelaApi } from '../api/tabelaResultadosApi';


export default function TelaPrincipal() {
  const dispatch = useDispatch()
  const torneio = useSelector((state:any)=>state.torneioReducer.torneio)
  const [usuario, setUsuario] = useState<usuarioLogadoType>()
  localStorage.setItem("idDoTorneio",usuario?.torneio[torneio]?.id || '')
  const [carregando, setCarregando] = useState(true)
  const [estatisticas, setEstatisticas] = useState()
  const participantes = useSelector((state:any)=>state.participantesReducer.participantes)
  var id = localStorage.getItem("idDoTorneio") || ""
  
  const [resultadosApi, setresultadosApi] = useState<tabelaDeResultadosType[]>([])
  async function getTabela() {
    const r = await listarTabelaApi() || []
    setresultadosApi(r)
  }  
  useEffect(()=>{
    getTabela()
  },[])

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
  const darkMode = useSelector((state:any)=>state.darkReducer?.dark)
  const mensagemReducer = useSelector((state:any)=>state.checkedDeletarPart.status)
  const tipoDeTorneio = useSelector((state:any)=>state.selectFormatoDaCompeticaoReducer.tipo);
  
  let idDoTorneioSelecionado = usuario?.torneio[torneio]?.id as string
  const listaFiltrada = resultadosApi.filter(e=>{
    if (e.idDoTorneio === idDoTorneioSelecionado) {
      return e
    }
  })
  return (
    <React.Fragment >
      <Toolbar id="back-to-top-anchor" />
      <div className='container' style={{background:darkMode ? darkBackgroundContainer :""}}>
      {
        carregando?
        <div><Carregando/></div>:
          <div>
            <ResponsiveAppBar/>
            <Mensagens checked={mensagemReducer} mensagem={"Deleção de participantes habilitada!"} mensagemSec={"Deleção de participantes desabilitada!"}/>
            <div className='main'>
              <div className='telaPrincipalSuperior '>
                <CardParticipantes 
                  participantes = {usuario?.torneio[torneio]?.participantes}
                  torneio = {usuario?.torneio}  
                />
                <CradPremiacoes usuario={usuario}/>
              </div>
              {
                tipoDeTorneio === "2" &&
                <div className='telaPrincipalTabelaDeClassificacao '>
                  <h2 style={{textAlign:"center",marginTop:"30px"}}>Tabela de classificação</h2>
                  <CardTabelaDeClassificacao/>
                </div>
              }

              <h2 style={{textAlign:"center",marginTop:"20px"}}>Elencos do torneio</h2>
              <div className='telaPrincipalInferior'>
                {
                  usuario?.torneio[torneio]?.participantes?.map((elem, key)=>{
                    return <CardElenco key={key} elenco = {elem}/>
                  })
                }
              </div>
              {
                tipoDeTorneio === "2" &&
                <div className='telaPrincipalTabelaDeClassificacao '>
                  <CardTabelaResultados resultadosApi={resultadosApi}/>
                </div>
              }
              <h2 style={{textAlign:"center",marginTop:"30px"}}>Estatisticas</h2>
              {/* <div>{listaFiltrada.map((elem, key)=>{
                return <div>
                  {getDataTorneio(elem.dataDeInicio)} encerrou {getHoraTorneio(elem.data)}
                </div>
              }).reverse()}</div> */}
              <div>Torneios jogados {listaFiltrada.length}</div>
              {/* <div>{resultadosApi.length}</div> */}
              <div className='telaPrincipalMeio'>
                <EstatisticaCampeao lista={listaFiltrada} idDoTorneioSelecionado={idDoTorneioSelecionado}/>
                <EstatisticaAssistencia lista={listaFiltrada} idDoTorneioSelecionado={idDoTorneioSelecionado}/>
                <EstatisticaArtilheiros lista={listaFiltrada} idDoTorneioSelecionado={idDoTorneioSelecionado}/>
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
      <Footer/>
    </React.Fragment>
  );
}

