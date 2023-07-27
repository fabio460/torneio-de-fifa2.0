import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selecionadosType } from '../../../types';
import AvatarComponent from './avatarComponent';

export default function Colocacao() {
    const colocacao:selecionadosType = useSelector((state:any)=>state.colocacaoReducer.colocacao)
    const imgCampeao = "https://images.emojiterra.com/google/android-12l/512px/1f3c6.png"
    const imgPrimeiro = "https://w7.pngwing.com/pngs/556/205/png-transparent-trophy-cup-medal-communion-medal-prize-champion.png"
    const imgVice = "https://w7.pngwing.com/pngs/210/851/png-transparent-cup-champion-award-trophy-second-runner-up-runner-up-almost-second-best-not-quite-thumbnail.png"
    const imgTerceiroColocado = "data:image/png;base64,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"
    const imgQuartoColocado = "https://cdn.w600.comps.canstockphoto.com.br/trof%C3%A9u-copo-fazendo-lugar-quarto-3d-banco-de-ilustra%C3%A7%C3%A3o_csp49336460.jpg"
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
                                        <AvatarComponent imgMaior={imgCampeao} imgMenor={colocacao.primeiro.dados.emblemaDoTime}/>
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
                                        <AvatarComponent imgMaior={imgVice} imgMenor={colocacao.segundo.dados.emblemaDoTime}/>
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
                                        <AvatarComponent imgMaior={imgTerceiroColocado} imgMenor={colocacao.terceiro.dados.emblemaDoTime}/>
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
                                           <AvatarComponent imgMaior={imgQuartoColocado} imgMenor={colocacao.quarto.dados.emblemaDoTime}/>
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
