import  React,{useState} from 'react';
import { Button, Dialog, DialogActions, DialogContent, TextField, Typography, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { deletarUsuarioApi } from '../../api/usuarioApi';
import { codigoDeSeguranca } from '../../codigoDeSeguranca';


export default function ModalDeletarPerfil() {
  const [open, setOpen] = React.useState(false);
  const [chaveAutenticacao, setChaveAutenticacao] = useState('')
  const [erroDeCodigo, seterroDeCodigo] = useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);    
  };

 
const deletar = async()=>{
  if(chaveAutenticacao !== codigoDeSeguranca){
    seterroDeCodigo(true)
    return null
  }
  seterroDeCodigo(false)
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
            <TextField
             label={"Código"}
             size='small'
             onChange={(e:any)=> setChaveAutenticacao(e.target.value)}
             error={erroDeCodigo}
            />
            {
            erroDeCodigo && <Typography color={"red"}>Código inválido</Typography>
            }
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
