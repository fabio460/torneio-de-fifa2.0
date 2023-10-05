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
import { darkBackgroundBox, colorDark, dark } from '../../temaDark';
import ToolTipJogadores from '../tooltipJogadores';
export default function CardElenco({elenco}:{elenco:participantesType}) {
  const darkMode = useSelector((state:any)=>state.darkReducer.dark)

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
    background:darkMode ? darkBackgroundBox:"", color: darkMode ? colorDark:"",
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
        <Typography component={"div"} sx={{ fontSize: 14, color: darkMode ? colorDark:""}} color="text.secondary" gutterBottom>
          {
            elenco.saldo < 0 ? 
              <div style={{color:"red"}}>Saldo {formatoMonetario(elenco.saldo)}</div>:
              <div>Saldo {formatoMonetario(elenco.saldo)}</div>
          }
        </Typography>
        <Typography component={'div'} color="text.secondary" sx={{ fontSize: 14, color: darkMode ? colorDark:"" }}>
          Folha {calculaFolha(elenco.jogadores)}
        </Typography>
        <Typography component={'div'} color="text.secondary" sx={{ fontSize: 14, color: darkMode ? colorDark:"" }}>
          Valor do elenco: {calculaValoresDosJogadores(elenco.jogadores)}
        </Typography>
        <Typography  component={'div'} color="text.secondary" sx={{ fontSize: 14, color: darkMode ? colorDark:"", display:"flex" }}>
          Elenco com  <ToolTipJogadores jogadores={elenco.jogadores}/>
        </Typography>
        <Typography  component={'div'} sx={{ mb: 1.5, color: darkMode ? colorDark:"" }} variant="body2">
   
        </Typography>
        <Button color={elenco.saldo < 0 ? 'error' : 'success'} onClick={()=> linkGerenciaDeElenco()} variant={elenco.saldo < 0 ? 'outlined': 'contained'}  sx={{width:"100%", margin:"20px 0px"}}>
          {
            elenco.saldo < 0 ? 'dispensar jogadores':'Gerenciar time'
          }
        </Button>
        <Button color='warning' onClick={()=> linkComprarJogador()} variant='contained'   sx={{width:"100%"}}>Comprar jogador</Button>
      </CardContent>
    </Card>
  );
}
