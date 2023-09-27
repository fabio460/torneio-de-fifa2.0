import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ExtendButtonBase, IconButtonTypeMap } from '@mui/material';
import CarregandoBtn from '../../../carregandoBtn';

type propType = {
    action:any,
    titulo:string,
    mensagem:string,
    textoBtn:string,
    textoBtnConfirmar?:string,
    textoBtnCancelar?:string,
    variant?:any,
    carregando?:boolean,
    setCarregando?:any
}
export default function ModalConfirmacoes({action, titulo, mensagem,textoBtn, textoBtnConfirmar="confirmar", textoBtnCancelar="cancelar", variant, carregando, setCarregando}:propType) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAction = ()=>{
    setCarregando(true)
    action()
    handleClose()
  }

  return (
    <div style={{width:"100%"}}>
      <Button variant={variant} sx={{width:"100%"}} onClick={handleClickOpen}>
         {
           carregando?
           <CarregandoBtn/>:
           textoBtn
         }
      </Button>
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
            <Button color='success' onClick={handleAction}><CarregandoBtn/></Button>
            :
            <Button color='success' onClick={handleAction}>{textoBtnConfirmar}</Button>

          }
          <Button onClick={handleClose} color='error' autoFocus>
            {textoBtnCancelar}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
