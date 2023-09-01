import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Checkbox } from '@mui/material';

import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { participantesType } from '../types';
import { darkBackgroundBox, colorDark, dark, darkBackgroundContainer } from '../temaDark';
import { useSelector } from 'react-redux';

export default function ListaDeParticipantes({listaDeParticipantes, handleChange}:{
    listaDeParticipantes:participantesType[] | undefined,
    handleChange:any
}) {
  const darkMode = useSelector((state:any)=>state.darkReducer.dark)
  
  return (
    <List sx={{ width: '100%', background: darkMode ? 'inherit': '', color: darkMode ? colorDark:""  }}>
       {
        listaDeParticipantes?.map((elem, key)=>{
            return(
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <ListItem sx={{ }}>
                        <ListItemAvatar>
                        <Avatar src={elem.emblemaDoTime}>
                            <BeachAccessIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={elem.nome} secondary={elem.time} sx={{color: darkMode ? colorDark:"" }}/>
                    </ListItem>
                    <Checkbox sx={{color: darkMode ? colorDark:""}} id={JSON.stringify(elem)} onChange={handleChange} disabled={elem.saldo < 0 && true}/>

                </div>
            )
        })
       } 
    </List>
  );
}
