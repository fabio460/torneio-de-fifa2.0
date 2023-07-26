import React from 'react'
import { useSelector } from 'react-redux'
import { dadosDoJogoType } from '../../../types'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Divider from '@mui/material/Divider';


export default function GolsVitEmpates() {
    const dadosDoJogo:dadosDoJogoType = useSelector((state:any)=>state.golsEmpVitoriasReducer.dados)
    const imgVitoria = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIunesqOdWZ6roIPO1cgDILM07dXHtvoHnLw&usqp=CAU"
    const imgEmpate = ""
    const imgGol ="data:image/jpeg;base64,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" 
  return (
    <div>
        {
            (dadosDoJogo.empates || dadosDoJogo.gols || dadosDoJogo.vitorias) &&            
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
             {
                dadosDoJogo.gols.map((elem, key)=>{
                    return(                    
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar src={imgGol}>
                                <ImageIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={elem.participante} secondary={
                                elem.dado?.toString() === "1" ? elem.dado + " gol": elem.dado + " gols" 
                            } />
                        </ListItem>
                    )
                })
             }
             <Divider/>
             {
                dadosDoJogo.vitorias.map((elem, key)=>{
                    return(                    
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar src={imgVitoria}>
                                <ImageIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={elem.participante} secondary={
                                elem.dado?.toString() === "1" ? elem.dado + " vitória": elem.dado + " vitórias" 
                            } />
                        </ListItem>
                    )
                })
             } 
             <Divider/>
             {
                dadosDoJogo.empates.map((elem, key)=>{
                    return(                    
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar src={imgEmpate}>
                                <ImageIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={elem.participante} secondary={
                                elem.dado?.toString() === "1" ? elem.dado + " empate": elem.dado + " empates" 
                            } />
                        </ListItem>
                    )
                })
             } 
            </List>
        }
    </div>
  );
}
