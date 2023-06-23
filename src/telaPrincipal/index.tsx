import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUsuarioPorIdApi } from '../api/usuarioApi'
import "./telaPrincipal.css"
import CardParticipantes from './cardParticipantes'
import CradPremiacoes from './cardPremiacoes'
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
import BtnScroll from './btnScroll';





interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ScrollTop(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');
    
    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
        {children}
      </Box>
    </Fade>
  );
}

export default function TelaPrincipal() {
  const dispatch = useDispatch()
  const [usuario, setUsuario] = useState<usuarioLogadoType>()
  const [carregando, setCarregando] = useState(true)
  const [estatisticas, setEstatisticas] = useState()
  const torneio = useSelector((state:any)=>state.torneioReducer.torneio)
  const participantes = useSelector((state:any)=>state.participantesReducer.participantes)
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
  
  localStorage.setItem("idDoTorneio",usuario?.torneio[torneio].id || '')
  useEffect(()=>{    
    getEstatistica()
  },[torneio])
  return (
    <React.Fragment>
      
      <Toolbar id="back-to-top-anchor" />
      <div className='container'>
      {
        carregando?
        <div><Carregando/></div>:
          <div>
            <ResponsiveAppBar/>
            <div className='main'>
              <div className='appBar'>
                <h1 style={{textAlign:"center", marginTop:"10px"}}>Bem vindo {usuario?.nome}!</h1>
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
      {
        participantes.length > 0 &&
        <ScrollTop >
          <BtnScroll usuario={usuario}/>
        </ScrollTop>
      }
    </React.Fragment>
  );
}

