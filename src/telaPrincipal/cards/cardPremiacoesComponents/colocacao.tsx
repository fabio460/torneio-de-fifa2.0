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

export default function Colocacao() {
    const colocacao:selecionadosType = useSelector((state:any)=>state.colocacaoReducer.colocacao)

  return (
    <div>
         {
                (colocacao?.primeiro || colocacao.segundo || colocacao.terceiro || colocacao.quarto) &&
                <div>
                    <h5>Colocação</h5>
                    <div>
                        {
                            colocacao.primeiro &&
                            <div>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>   
                                    <ListItem alignItems="flex-start">   
                                        <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={colocacao.primeiro.dados.emblemaDoTime} />
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
                                                {colocacao.primeiro.nome}
                                            </Typography>
                                            {" — "+ colocacao.primeiro.dados.time}
                                            </React.Fragment>
                                        }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </List>
                            </div>

                        }
                        {
                            colocacao.segundo &&
                            <div>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>   
                                    <ListItem alignItems="flex-start">   
                                        <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={colocacao.segundo.dados.emblemaDoTime} />
                                        </ListItemAvatar>
                                        <ListItemText
                                        primary="Vice-Campeão"
                                        secondary={
                                            <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {colocacao.segundo.nome}
                                            </Typography>
                                            {" — "+ colocacao.segundo.dados.time}
                                            </React.Fragment>
                                        }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </List>
                            </div>

                        }
     

                        {
                            colocacao.terceiro &&
                            <div>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>   
                                    <ListItem alignItems="flex-start">   
                                        <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={colocacao.terceiro.dados.emblemaDoTime} />
                                        </ListItemAvatar>
                                        <ListItemText
                                        primary="Terceiro colocado"
                                        secondary={
                                            <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {colocacao.terceiro.nome}
                                            </Typography>
                                            {" — "+ colocacao.terceiro.dados.time}
                                            </React.Fragment>
                                        }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </List>
                            </div>

                        }

                        {
                            colocacao.quarto &&
                            <div>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>   
                                    <ListItem alignItems="flex-start">   
                                        <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={colocacao.quarto.dados.emblemaDoTime} />
                                        </ListItemAvatar>
                                        <ListItemText
                                        primary="Quarto colocado"
                                        secondary={
                                            <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {colocacao.quarto.nome}
                                            </Typography>
                                            {" — "+ colocacao.quarto.dados.time}
                                            </React.Fragment>
                                        }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </List>
                            </div>
                        }
                    </div>
                </div>
            }
    </div>
  )
}
