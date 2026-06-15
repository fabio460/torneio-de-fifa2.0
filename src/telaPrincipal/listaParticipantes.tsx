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
import BtnOpcoesDeParticipantes from './btnOpcoesDeParticipantes';
import { listarTorneiosApi } from '../api/torneioApi';
import usuarioReducer from '../redux/usuarioReducer';
import ModalAtualizarParticipante from '../telaDeElenco/modais/modalAtualizarParticipante';

import { getCampeonatoPorIdApi, listarCampeonatoApi } from '../api/campeonatoApi';
import { GetTorneioSelecionado } from '../metodosUteis';
export default function ListaDeParticipantes({listaDeParticipantes, handleChange}:{
    listaDeParticipantes:participantesType[] | undefined,
    handleChange:any
}) {
  const getParticipante = (e:participantesType)=>{
    localStorage.setItem('idDoElenco', e?.id as string)
    navigate('/elenco')
  }

  const darkMode = useSelector((state:any)=>state.darkReducer?.dark)
  const navigate = useNavigate()
  const [age, setAge] = React.useState(null);
  const disable = age !== null ? true : false

  const sel = GetTorneioSelecionado()

  async function getTorneios(id:string){
    const t = await listarCampeonatoApi(id)
    setAge(t)
  }
  React.useEffect(()=>{
    getTorneios(sel?.id)
  },[sel])
  return (
    <List sx={{ width: '100%', background: darkMode ? 'inherit': '', color: darkMode ? colorDark:""  }}>
       {
        listaDeParticipantes?.map((elem, key)=>{
            return(
                <div key={key} style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <ListItem >
                        <Tooltip title={"Vá para o elenco do "+elem.nome}>
                            <ListItemAvatar sx={{ cursor:"pointer"}} onClick={()=> getParticipante(elem)}>
                                <Avatar 
                                  sx={{marginRight:1 ,cursor:"pointer", padding:"5px", width:"50px", height:"50px"}} 
                                  src={elem.emblemaDoTime}
                                  alt={elem.nome}  
                                >
                                    <BeachAccessIcon />
                                </Avatar>
                            </ListItemAvatar>
                        </Tooltip>
                        <div>
                        <Tooltip title={"Vá para o elenco do "+elem.nome}>
                          <div className='nomeDoParticipante' onClick={()=> getParticipante(elem)}>{elem.nome}</div>
                        </Tooltip>
                          <div className='nomeDoTime'>{elem.time}</div>
                        </div>
                        {/* <ListItemText  onClick={()=> getParticipante(elem)} primary={elem.nome} secondary={elem.time} sx={{color: darkMode ? colorDark:"", background:"blue", minWidth:"80px" }}/> */}
                    </ListItem>
                    <div style={{display:"flex"}}>
                      <Checkbox disabled={disable} sx={{color: darkMode ? colorDark:""}} id={JSON.stringify(elem)} onChange={handleChange} />
                      <BtnOpcoesDeParticipantes participante={elem} disabled={disable}/>
                    </div>
                </div>
            )
        })
       } 
    </List>
  );
}
