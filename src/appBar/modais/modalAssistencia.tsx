import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux/es/exports';
import { chekedType, dadosPremiacoesDaApiType, jogadoresType, participantesType } from '../../types';
import { useSelector } from 'react-redux';
import OutlinedInput from '@mui/material/OutlinedInput';
import { assistencia, quartoAssistencia, terceiroAssistencia, viceAssistencia } from '../../valoresDosPremios';
import Primeiro from '../selectsAssistecias/primeiro';
import Segundo from '../selectsAssistecias/segundo';
import Terceiro from '../selectsAssistecias/terceiro';
import Quarto from '../selectsAssistecias/quarto';

export default function ModalAssistencia() {
  const [open, setOpen] = React.useState(false);
  const [primeiro, setPrimeiro] = React.useState<jogadoresType[]>([]);
  const [segundo, setSegundo] = React.useState<jogadoresType[]>([]);
  const [terceiro, setTerceiro] = React.useState<jogadoresType[]>([]);
  const [quarto, setQuarto] = React.useState<jogadoresType[]>([]);
  const participantes:chekedType[] = useSelector((state:any)=>state.participantesReducer.participantes)
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch()
  const handleClose = () => {
    setOpen(false);
    
  };
  
  const confirmar = ()=>{
    dispatch({
      type:"assistencia",
      payload:{assistentes:{
        primeiro:primeiro,
        segundo:segundo,
        terceiro:terceiro,
        quarto:quarto
      }}
    })
    handleClose()
  }

  const cancelar = ()=>{
    dispatch({
      type:"assistencia",
      payload:{assistentes:[]}
    })
    handleClose()
  }

  const dialogStyle = {
    minWidth:"600px",
    "@media (max-width:800px)":{
      minWidth:"80vw"
    }
  }


  return (
    <div>
      <div onClick={handleClickOpen}>
        Assisência
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Quem deu mais assisência
        </DialogTitle>
        <DialogContent className='modalColocacaoFormsContainer'  sx={dialogStyle}>
          <DialogContentText id="alert-dialog-description">            
            <Primeiro 
              participantes={participantes}
              setPrimeiro={setPrimeiro}  
            />
            <Segundo 
              participantes={participantes}
              setSegundo={setSegundo}  
            />
            <Terceiro
              participantes={participantes}
              setTerceiro={setTerceiro}
            />
            <Quarto
              participantes={participantes}
              setQuarto={setQuarto}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmar}>Confirmar</Button>
          <Button color='error' onClick={cancelar} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
