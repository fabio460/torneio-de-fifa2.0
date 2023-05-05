


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
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };


  
  return (
    <Box sx={{ bgcolor: 'white', width: "100%" }}>
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="standard"
          aria-label="full width tabs example"
        >
          <Tab label="Lista" {...a11yProps(0)} />
          <Tab label="Campinho" {...a11yProps(1)} />
          <Tab label="Time" {...a11yProps(2)} />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <TabelaDeJogadores jogadores={elenco?.jogadores} elenco={elenco}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <QuatroUmDoisTres handlePosition={handlePosition} jogadores={elenco?.jogadores}/>
        <div className='reservarContainer'><Reservas handlePosition={handlePosition} jogadores={elenco?.jogadores}/></div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
