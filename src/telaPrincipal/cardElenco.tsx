import * as React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import { IconButton } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { participantesType } from '../types';
import { calculaFolha, formatoMonetario } from '../metodosUteis';
import ModalDeletarParticipantes from './modalDeletarParticipantes';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

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
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{display:'flex', justifyContent:'space-between'}}>
          <div style={{display:"flex", alignItems:"center"}}>
            {elenco?.emblemaDoTime && <Avatar src={elenco?.emblemaDoTime} sx={{marginRight:1}}/> }
            {elenco.nome}
          </div>
          {deleteChecked ? 
              <ModalDeletarParticipantes elenco={elenco}/>
                :
              <IconButton  size='small' disabled>
                  <DeleteOutlineIcon />
              </IconButton>
          }
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         Saldo {formatoMonetario(elenco.saldo)}
          
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          folha {calculaFolha(elenco.jogadores)}
        </Typography>
        <Typography variant="body2">
   
        </Typography>
        <Button onClick={()=> linkGerenciaDeElenco()} variant='contained' size="small" sx={{width:"100%", marginBottom:1}}>Gerenciar time</Button>
        <Button onClick={()=> linkComprarJogador()} variant='contained' size="small"  sx={{width:"100%", marginBottom:1}}>Comprar jogador</Button>
      </CardContent>
    </Card>
  );
}
