import React, { useEffect, useState } from 'react'
import "./compraDeJogadores.css"
import Jogadores from './Jogadores'
import { useNavigate } from 'react-router-dom'
import { listarJogadoresApi } from '../api/jogadoresApi'
import { jogadoresType, participantesType } from '../types'
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
    const boxStyle={ 
      mt:4,
      "@media (max-width:900px)":{
        mt:14,
      }
    }
  return (
    <div className='container'>
      <React.Fragment>
        <CssBaseline />
        <HideOnScroll >
          <AppBar>
            <Header elenco={elenco}/>
          </AppBar>
        </HideOnScroll>
        <Toolbar />
          <Box sx={boxStyle}>
            <Jogadores/>
          </Box>
      </React.Fragment>
    </div>
  );
}
