import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CarregandoBtn from '../../../carregandoBtn';
import { Avatar, IconButton, InputBase, Paper } from '@mui/material';
type propType = {
    action:any,
    titulo:string,
    mensagem:string,
    textoBtn?:string,
    textoBtnConfirmar?:string,
    textoBtnCancelar?:string,
    carregando?:boolean,
    setCarregando?:any,
    Icone?:any
}
export default function ModalIconeConfirmacao({action, titulo, mensagem,textoBtn, textoBtnConfirmar="confirmar", textoBtnCancelar="cancelar", carregando, setCarregando, Icone}:propType) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setCarregando(false)
    };
    const handleAction = ()=>{
      setCarregando(true)
      action()
    }
  return (
    <div>
       <IconButton onClick={handleClickOpen}>
          {
            carregando ?
            <CarregandoBtn/>:
            <Icone/>
          }
        </IconButton>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {titulo}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {mensagem}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {
            carregando ? 
            <Button color='success'><CarregandoBtn/></Button>:
            <Button color='success' onClick={handleAction}>{textoBtnConfirmar}</Button>
        }
        <Button onClick={handleClose} color='error' autoFocus>
          {textoBtnCancelar}
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}
