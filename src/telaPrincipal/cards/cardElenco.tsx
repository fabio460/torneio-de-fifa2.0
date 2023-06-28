import * as React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import { Divider, IconButton } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { participantesType } from '../../types';
import { calculaFolha, calculaQuantDeJogadores, formatoMonetario } from '../../metodosUteis';
import ModalDeletarParticipantes from '../modais/modalDeletarParticipantes';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { calculaValoresDosJogadores } from '../../metodosUteis';
export default function CardElenco({elenco}:{elenco:participantesType}) {

  const navigate = useNavigate()
  const linkComprarJogador:any = ()=>{
    localStorage.setItem('idDoElenco',elenco.id)
    localStorage.setItem('idDoTorneio',elenco.idTorneio)
    navigate('/compraDeJogadores')  
  }
  const linkGerenciaDeElenco:any = ()=>{
    localStorage.setItem('idDoElenco',elenco.id)
    navigate('/elenco')
  }
  const deleteChecked = useSelector((state:any)=>state.checkedDeletarPart.status)
  const cardStyle = { 
    minWidth: 275,
    paddingBottom:0,
    "@media (max-width:850px)":{
      paddingBottom:0,
    } 
  }
  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{display:'flex', justifyContent:'space-between', marginBottom:2}}>
          <div style={{display:"flex", alignItems:"center"}}>
            {elenco?.emblemaDoTime && <Avatar src={elenco?.emblemaDoTime} sx={{marginRight:1}}/> }
            <div style={{display:"flex", flexDirection:"column"}}>
              <div>
                {elenco.nome}
              </div>
              <div style={{fontSize:"13px",color:"gray"}}>
                {elenco.time}
              </div>
            </div>
          </div>
          {deleteChecked ? 
              <ModalDeletarParticipantes elenco={elenco}/>
                :
              <IconButton  size='small' disabled>
                  <DeleteOutlineIcon />
              </IconButton>
          }
        </Typography>
        <Divider sx={{marginBottom:1}}/>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Saldo {formatoMonetario(elenco.saldo)}
        </Typography>
        <Typography  color="text.secondary" sx={{ fontSize: 14 }}>
          Folha {calculaFolha(elenco.jogadores)}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          Valor do elenco: {calculaValoresDosJogadores(elenco.jogadores)}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          Elenco com {calculaQuantDeJogadores(elenco.jogadores)} jogadores
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="body2">
   
        </Typography>
        <Button color='success' onClick={()=> linkGerenciaDeElenco()} variant='contained' size="small" sx={{width:"100%", marginBottom:1}}>Gerenciar time</Button>
        <Button color='warning' onClick={()=> linkComprarJogador()} variant='contained' size="small"  sx={{width:"100%"}}>Comprar jogador</Button>
      </CardContent>
    </Card>
  );
}
