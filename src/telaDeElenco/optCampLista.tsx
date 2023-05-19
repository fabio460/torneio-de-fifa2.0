


import  React,{useEffect,useState} from 'react';

import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import QuatroUmDoisTres from './escalacoes/quatroUmDoisTres';
import Reservas from './escalacoes/quatroUmDoisTres/reservas';
import { participantesType } from '../types';
import TabelaDeJogadores from './tabelaDeJogadores';
import { listarParticipantesApi } from '../api/participantesApi';
import { calculaFolha, formatoMonetario, refinaPosicao } from '../metodosUteis';
import { Button } from '@mui/material';
import { deletarTodasPosicoesApi } from '../api/posicoes';


interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function OptCampoLista({handlePosition, elenco}:{handlePosition:any, elenco:participantesType | undefined}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
 
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    localStorage.setItem('selectCampinho',newValue.toString())
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  useEffect(()=>{
    if (localStorage.getItem('selectCampinho')) {   
      setValue(parseInt(localStorage.getItem('selectCampinho') || ''))
    }
  },[])
  const ajustarPosicao = async()=>{
     const res = await deletarTodasPosicoesApi(elenco?.id)
     window.location.reload()
  }
  const btnAjustPos={
    margin:"10px 0px",
    "@media (max-width:700px)":{
      width:"100%",
      margin:"10px auto"
    }
  }
  let jogadores = refinaPosicao(elenco?.jogadores)
  return (
    <Box sx={{ bgcolor: 'white', width: "100%"}}>
      <div>
        <div className='TabsDesctop'>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant= "scrollable"
            aria-label="full width tabs example"
          >
            <Tab label="Lista" {...a11yProps(0)} />
            <Tab label="Campinho" {...a11yProps(1)} />
            <Tab label="Time" {...a11yProps(2)} />
          </Tabs>
        </div>
        <div className='TabsMobile'>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant= "fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Lista" {...a11yProps(0)} />
            <Tab label="Campinho" {...a11yProps(1)} />
            <Tab label="Time" {...a11yProps(2)} />
          </Tabs>
        </div>
      </div>
      <TabPanel value={value} index={0}>
        <TabelaDeJogadores jogadores={elenco?.jogadores} elenco={elenco}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
       {elenco?.emblemaDoTime && <div className='TelaDeElencoEmblemaDoTime'>
          <div>
            <img src={elenco?.emblemaDoTime} alt="sem imagem" />
            <h5>{elenco?.time}</h5>
          </div>
        </div>}
        <div className='btnAjustPos'>
          <Button  sx={btnAjustPos} variant='contained' onClick={ajustarPosicao}>Ajustar posições</Button>
        </div>
        <div className='campinhoBody'>
          <QuatroUmDoisTres handlePosition={handlePosition} jogadores={jogadores}/>
          <div className='reservarContainer'>
            <h3>Reservas</h3>
            <Reservas handlePosition={handlePosition} jogadores={jogadores}/>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className='dadosDoUsuario'>
          <img src={elenco?.emblemaDoTime} alt="" />
          <div>
            Usuário {elenco?.nome}
          </div>
          <div>
            Saldo {formatoMonetario(elenco?.saldo)}
          </div>
          <div>
            Time {elenco?.time}
          </div>
          <div>
            {elenco?.jogadores.length} jogadores
          </div>
          <div>
           Folha {calculaFolha(elenco?.jogadores || [])}
          </div>
        </div>
      </TabPanel>
    </Box>
  );
}
