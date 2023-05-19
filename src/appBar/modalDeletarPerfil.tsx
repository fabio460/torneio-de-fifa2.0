import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { deletarUsuarioApi } from '../api/usuarioApi';


export default function ModalDeletarPerfil() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);    
  };

  const dialogStyle = {
    width:"400px",
    "@media (max-width:800px)":{
      width:"100%"
    }
  }
  const deslogar = ()=>{
}
const deletar = async()=>{
    const id = localStorage.getItem("idDoUsuarioLogado") || ""
    const res = await deletarUsuarioApi(id)
    localStorage.removeItem('jwt')
    alert(res.toString())
    window.location.reload()
  }
  return (
    <div>
      <div onClick={handleClickOpen}>
        Deletar Perfi
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{background:"",width:"100%"}}
      >
        <DialogTitle id="alert-dialog-title">
          Remoção de conta
        </DialogTitle>
        <DialogContent>
            Voçê esta prestes a remover sua conta, ao confirmar, todos os dados, times, torneios e jogadores do seu perfil serão excluidos.
            Deseja realmente remover sua conta? esta ação não poderar ser revertida!
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='warning' onClick={deletar}>Confirmar</Button>
          <Button variant='outlined' color='primary' onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
