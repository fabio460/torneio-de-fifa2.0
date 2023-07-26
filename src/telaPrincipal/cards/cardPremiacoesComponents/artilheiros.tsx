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
                    <h5>Colocação</h5>
                    <div>
                        {
                            artilheiros.primeiro &&
                            <div>
                                {
                                    artilheiros.primeiro.map((elem, key)=>{
                                       return <div>
                                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>   
                                                <ListItem alignItems="flex-start">   
                                                    <ListItemAvatar>
                                                      <AvatarComponent />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                    primary="Campeão"
                                                    secondary={
                                                        <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {elem.jogador.nome}
                                                        </Typography>
                                                        {" — "+ "texte"}
                                                        </React.Fragment>
                                                    }
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </List>
                                        </div>
                                    })
                                }
                            </div>

                        }
                        
                    </div>
                </div>
            }
    </div>
  )
}
