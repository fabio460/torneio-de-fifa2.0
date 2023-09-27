import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ModalConfCancelTorneio({cancelarCompetição}:any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
         excluir torneio
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseja excluir este torneio?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao confirmar voce estará excluindo todos os dados do tormeio assim como os resultados das partidas
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={cancelarCompetição}>Excluir torneio</Button>
          <Button onClick={handleClose} autoFocus>
            fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
