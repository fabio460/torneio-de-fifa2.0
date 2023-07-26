import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { assistentesTypeReducer } from '../../../types';
import AvatarComponent from './avatarComponent';

export default function Assistentes() {
    const assistentes:assistentesTypeReducer = useSelector((state:any)=>state.assisteciaReducer.assistentes)

  return (
    <div>
         {
            (assistentes?.primeiro || assistentes.segundo || assistentes.terceiro || assistentes.quarto) &&
            <div>
                <div>
                    <h5>Assistentes</h5>
                    <div>
                        {
                            assistentes.primeiro &&
                            <div style={{display:"flex", flexWrap:"wrap"}}>
                                {
                                    assistentes.primeiro.map((elem, key)=>{
                                    return <div key={key}>
                                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>   
                                                <ListItem alignItems="flex-start">   
                                                    <ListItemAvatar>
                                                    <AvatarComponent 
                                                        imgJogador={elem.jogador.imagemDoJogador}
                                                        imgTime={elem.participante.participante.emblemaDoTime}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                    primary="Assistente"
                                                    secondary={
                                                        <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {elem.participante.participante.nome}
                                                        </Typography>
                                                        {" — "+ elem.jogador.nome}
                                                        </React.Fragment>
                                                    }
                                                    />
                                                </ListItem>
                                            </List>
                                        </div>
                                    })
                                }
                            </div>

                        }
                        
                    </div>
                </div>
                <Divider variant="inset" component="div" />
                <div>
                    <div>
                        {
                            assistentes.segundo &&
                            <div style={{display:"flex", flexWrap:"wrap"}}>
                                {
                                    assistentes.segundo.map((elem, key)=>{
                                    return <div key={key}>
                                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>   
                                                <ListItem alignItems="flex-start">   
                                                    <ListItemAvatar>
                                                    <AvatarComponent 
                                                        imgJogador={elem.jogador.imagemDoJogador}
                                                        imgTime={elem.participante.participante.emblemaDoTime}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                    primary="Vice-Assistente"
                                                    secondary={
                                                        <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {elem.participante.participante.nome}
                                                        </Typography>
                                                        {" — "+ elem.jogador.nome}
                                                        </React.Fragment>
                                                    }
                                                    />
                                                </ListItem>
                                            </List>
                                        </div>
                                    })
                                }
                            </div>

                        }
                        
                    </div>
                </div>
                <Divider variant="inset" component="div" />
                <div>
                    <div>
                        {
                            assistentes.terceiro &&
                            <div style={{display:"flex", flexWrap:"wrap"}}>
                                {
                                    assistentes.terceiro.map((elem, key)=>{
                                    return <div key={key}>
                                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>   
                                                <ListItem alignItems="flex-start">   
                                                    <ListItemAvatar>
                                                    <AvatarComponent 
                                                        imgJogador={elem.jogador.imagemDoJogador}
                                                        imgTime={elem.participante.participante.emblemaDoTime}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                    primary="Terceiro-Assistente"
                                                    secondary={
                                                        <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {elem.participante.participante.nome}
                                                        </Typography>
                                                        {" — "+ elem.jogador.nome}
                                                        </React.Fragment>
                                                    }
                                                    />
                                                </ListItem>
                                            </List>
                                        </div>
                                    })
                                }
                            </div>

                        }
                        
                    </div>
                </div>
                <Divider variant="inset" component="div" />
                <div>
                    <div>
                        {
                            assistentes.quarto &&
                            <div style={{display:"flex", flexWrap:"wrap"}}>
                                {
                                    assistentes.quarto.map((elem, key)=>{
                                    return <div key={key}>
                                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>   
                                                <ListItem alignItems="flex-start">   
                                                    <ListItemAvatar>
                                                    <AvatarComponent 
                                                        imgJogador={elem.jogador.imagemDoJogador}
                                                        imgTime={elem.participante.participante.emblemaDoTime}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                    primary="Quarto-Assistente"
                                                    secondary={
                                                        <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {elem.participante.participante.nome}
                                                        </Typography>
                                                        {" — "+ elem.jogador.nome}
                                                        </React.Fragment>
                                                    }
                                                    />
                                                </ListItem>
                                            </List>
                                        </div>
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        }
    </div>
  )
}
