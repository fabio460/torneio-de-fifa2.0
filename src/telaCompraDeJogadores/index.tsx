import React, { useEffect, useState } from 'react'
import "./compraDeJogadores.css"
import Jogadores from './Jogadores'
import { useNavigate } from 'react-router-dom'
import { listarJogadoresApi } from '../api/jogadoresApi'
import { jogadoresType, participantesType, torneioTypeApi } from '../types'
import { getParticipantesPorIdApi } from '../api/participantesApi'
import Header from './header'
import "./telaCompraDeJogadores.css"

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material'
import { colorDark, dark, darkBackgroundContainer } from '../temaDark'
import { getCampeonatoPorIdApi } from '../api/campeonatoApi'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default function TelaCompraDeJogadores() {
    const h = useNavigate()
    const [elenco, setElenco] = useState<participantesType>()
    const idElenco = localStorage.getItem('idDoElenco') || ''
    async function getElenco() {
        const e = await getParticipantesPorIdApi(idElenco)
        setElenco(e)
    }
    useEffect(()=>{
       getElenco()
    },[])

    const dispatch = useDispatch()
    const darkMode = useSelector((state:any)=>state.darkReducer.dark)

    const [campeonato, setCampeonato] = React.useState<torneioTypeApi>()
    async function getCampeonato(id:string) {      
      const c = await getCampeonatoPorIdApi(id)
      setCampeonato(c)
    }
    
    getCampeonato(elenco?.idTorneio || "")

    useEffect(()=>{
      if (campeonato?.idTorneio) {        
        dispatch({
          type:"btnDisableCompraJogReducer",
          payload:{disable:true}
        })
      }else{
        dispatch({
          type:"btnDisableCompraJogReducer",
          payload:{disable:false}
        })
      }

    },[])
    
  return (
    <div className='container' style={{background:darkMode ? darkBackgroundContainer:''}}>
            <React.Fragment>
              <CssBaseline />
              <HideOnScroll >
                <AppBar>
                  <Header elenco={elenco} campeonato={campeonato}/>
                </AppBar>
              </HideOnScroll>
              <Toolbar />
                <Box>
                  {
                    campeonato?.id &&   <div style={{height:"50px"}}></div>
                  }
                  <Jogadores/>
                </Box>
            </React.Fragment>
    </div>
  );
}
