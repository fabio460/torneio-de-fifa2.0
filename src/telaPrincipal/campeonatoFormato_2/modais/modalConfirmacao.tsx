import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type propType = {
    action:any,
    titulo:string,
    mensagem:string,
    textoBtn:string,
    textoBtnConfirmar?:string,
    textoBtnCancelar?:string
}
export default function ModalConfirmacoes({action, titulo, mensagem,textoBtn, textoBtnConfirmar="confirmar", textoBtnCancelar="cancelar"}:propType) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAction = ()=>{
    action()
    handleClose()
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
         {textoBtn}
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
          <Button color='success' onClick={handleAction}>{textoBtnConfirmar}</Button>
          <Button onClick={handleClose} color='error' autoFocus>
            {textoBtnCancelar}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
