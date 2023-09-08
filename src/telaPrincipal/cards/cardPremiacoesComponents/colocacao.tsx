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

export default function Colocacao({dark}:{dark?:boolean}) {
    const colocacao:selecionadosType = useSelector((state:any)=>state.colocacaoReducer.colocacao)
    const imgCampeao = "https://images.emojiterra.com/google/android-12l/512px/1f3c6.png"
    const imgPrimeiro = "https://w7.pngwing.com/pngs/556/205/png-transparent-trophy-cup-medal-communion-medal-prize-champion.png"
    const imgVice = "https://png.pngtree.com/png-clipart/20210323/ourlarge/pngtree-3d-silver-trophy-illustration-png-image_3114153.png"
    const imgTerceiroColocado = "https://img.freepik.com/psd-premium/trofeu-de-bronze-brilhante-em-fundo-transparente_690834-1621.jpg?w=2000"
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
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: '' }}>   
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
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: '' }}>   
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
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: '' }}>   
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
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: '' }}>   
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
