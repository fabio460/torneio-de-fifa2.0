import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { participantesType } from '../types';
import { atualizarParticipantesApi } from '../api/participantesApi';

export default function ModalAtualizar({elenco}:{elenco:participantesType | undefined}) {
  const [open, setOpen] = React.useState(false);
  const [nome, setNome] = useState('')
  const [time, setTime] = useState('')
  const [saldo, setSaldo] = useState('')
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const atualizarParticipantes = async () => {
    const res = await atualizarParticipantesApi(
        elenco?.id || '',
         nome.trim() === '' ? elenco?.nome || '' : nome,
         saldo === '' ? elenco?.saldo || 0 : parseFloat(saldo),
         time.trim() === '' ? elenco?.time || '' : time
    )
    alert(res)
    window.location.reload()
  }
  return (
    <div>
      <div  onClick={handleClickOpen}>
        atualizar
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Atualizar conta do elenco"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className='modalAtualizarBody'>
            <TextField 
                size='small' 
                id="outlined-basic" 
                label="Nome" 
                variant="outlined"
                defaultValue={elenco?.nome} 
                onChange={e=> setNome(e.target.value)}
                sx={{marginBottom:1, width:"100%"}}
            />
            <TextField 
                size='small' 
                id="outlined-basic" 
                label="Saldo" 
                variant="outlined"
                defaultValue={elenco?.saldo} 
                onChange={e=> setSaldo(e.target.value)}
                sx={{marginBottom:1, width:"100%"}}
            />
                <TextField 
                size='small' 
                id="outlined-basic" 
                label="Time" 
                variant="outlined"
                defaultValue={elenco?.time} 
                onChange={e=> setTime(e.target.value)}
                sx={{marginBottom:1, width:"100%"}}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={atualizarParticipantes}>Atualizar</Button>
          <Button onClick={handleClose} autoFocus>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
