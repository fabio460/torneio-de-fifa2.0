import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { participantesType } from '../types';
import { deletarParticipantesApi } from '../api/participantesApi';
import { useNavigate } from 'react-router-dom';

export default function ModalRemover({elenco}:{elenco:participantesType | undefined}) {
  const [open, setOpen] = React.useState(false);
  const n = useNavigate()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const removerParticipante = async()=>{
     const res = await deletarParticipantesApi(elenco?.id || '')
     alert(res)
     n('/')
  }
  return (
    <div>
      <div onClick={handleClickOpen}>
        deletar
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseja realmente remover a conta?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voçe esta prestes a remover a conta do participante {elenco?.nome}.
            Esta ação não podera ser revertida, clique em confirmar abaixo!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={removerParticipante} color='warning'>confirmar</Button>
          <Button onClick={handleClose} autoFocus>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
