import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Checkbox } from '@mui/material';
import ModalTrocaDeTorneio from "./modais/modalTrocaDeTorneio";
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { participantesType } from '../types';
import { darkBackgroundBox, colorDark, dark, darkBackgroundContainer } from '../temaDark';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
export default function ListaDeParticipantes({listaDeParticipantes, handleChange}:{
    listaDeParticipantes:participantesType[] | undefined,
    handleChange:any
}) {
  const getParticipante = (e:participantesType)=>{
    localStorage.setItem('idDoElenco', e.id as string)
    navigate('/elenco')
  }

  const darkMode = useSelector((state:any)=>state.darkReducer?.dark)
  const navigate = useNavigate()

  return (
    <List sx={{ width: '100%', background: darkMode ? 'inherit': '', color: darkMode ? colorDark:""  }}>
       {
        listaDeParticipantes?.map((elem, key)=>{
            return(
                <div key={key} style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <ListItem >
                        <Tooltip title={"Vá para o elenco do "+elem.nome}>
                            <ListItemAvatar sx={{ cursor:"pointer"}} onClick={()=> getParticipante(elem)}>
                                <Avatar sx={{marginRight:1 ,cursor:"pointer", padding:"5px", width:"50px", height:"50px"}} src={elem.emblemaDoTime} >
                                    <BeachAccessIcon />
                                </Avatar>
                            </ListItemAvatar>
                        </Tooltip>
                        <ListItemText primary={elem.nome} secondary={elem.time} sx={{color: darkMode ? colorDark:"" }}/>
                    </ListItem>
                    <div style={{display:"flex"}}>
                      <ModalTrocaDeTorneio participante={elem}/>
                      <Checkbox sx={{color: darkMode ? colorDark:""}} id={JSON.stringify(elem)} onChange={handleChange} disabled={elem.saldo < 0 && true}/>
                    </div>
                </div>
            )
        })
       } 
    </List>
  );
}
