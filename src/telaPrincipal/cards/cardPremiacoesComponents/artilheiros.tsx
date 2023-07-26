import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { artilheirosTypeReducer, assistentesTypeReducer, dadosDoJogoType, selecionadosType } from '../../../types';
import AvatarComponent from './avatarComponent';

export default function Artilheiros() {
    const artilheiros:artilheirosTypeReducer = useSelector((state:any)=>state.artilhariaReducer.artilheiros)

  return (
    <div>
         {
                (artilheiros?.primeiro || artilheiros.segundo || artilheiros.terceiro || artilheiros.quarto) &&
                <div>
                    <div>
                        <h5>Artilheiros</h5>
                        <div>
                            {
                                artilheiros.primeiro &&
                                <div style={{display:"flex", flexWrap:"wrap"}}>
                                    {
                                        artilheiros.primeiro.map((elem, key)=>{
                                        return <div>
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>   
                                                    <ListItem alignItems="flex-start">   
                                                        <ListItemAvatar>
                                                        <AvatarComponent 
                                                            imgJogador={elem.jogador.imagemDoJogador}
                                                            imgTime={elem.participante.participante.emblemaDoTime}
                                                            />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                        primary="Artilheiro"
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
                                artilheiros.segundo &&
                                <div style={{display:"flex", flexWrap:"wrap"}}>
                                    {
                                        artilheiros.segundo.map((elem, key)=>{
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
                                                        primary="Vice-Artilheiro"
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
                                artilheiros.terceiro &&
                                <div style={{display:"flex", flexWrap:"wrap"}}>
                                    {
                                        artilheiros.terceiro.map((elem, key)=>{
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
                                                        primary="Terceiro-Artilheiro"
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
                                artilheiros.quarto &&
                                <div style={{display:"flex", flexWrap:"wrap"}}>
                                    {
                                        artilheiros.quarto.map((elem, key)=>{
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
                                                        primary="Quarto-Artilheiro"
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
