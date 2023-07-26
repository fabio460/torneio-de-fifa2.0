import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { artilheirosTypeReducer, assistentesTypeReducer, dadosDoJogoType, selecionadosType } from '../../../types';
import Colocacao from './colocacao';
import Artilheiros from './artilheiros';

export default function PremiacoesBody() {
    const artilheiros:artilheirosTypeReducer = useSelector((state:any)=>state.artilhariaReducer.artilheiros)
    const assistentes:assistentesTypeReducer = useSelector((state:any)=>state.assisteciaReducer.assistentes)
    const dadosDoJogo:dadosDoJogoType = useSelector((state:any)=>state.golsEmpVitoriasReducer.dados)
    console.log(dadosDoJogo)
    return (
        <div>  
            <Colocacao/>
            <Artilheiros/>   
            {
                (assistentes.primeiro || assistentes.segundo || assistentes.terceiro || assistentes.quarto) &&
                <div>
                    <h5>Assistências</h5>
                    <div>
                        <div>      
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                    primary="Brunch this weekend?"
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Ali Connors
                                        </Typography>
                                        {" — I'll be in your neighborhood doing errands this…"}
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </List>
                        </div>
                    </div>
                </div>
            }
            {
                (dadosDoJogo.empates || dadosDoJogo.gols || dadosDoJogo.vitorias) &&
                <div>
                    <h5>Gols Vit. Empates</h5>
                    <div>
                        <div>      
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                    primary="Brunch this weekend?"
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Ali Connors
                                        </Typography>
                                        {" — I'll be in your neighborhood doing errands this…"}
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </List>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
