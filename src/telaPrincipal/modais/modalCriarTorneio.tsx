import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { usuarioLogadoType } from '../../types';
import { useSelector } from 'react-redux';
import { criarTorneioApi } from '../../api/torneioApi';
import TextField from '@mui/material/TextField';

export default function ModalCriarTorneio() {
  const [open, setOpen] = React.useState(false);
  const usuario:usuarioLogadoType = useSelector((state:any)=>state.usuarioReducer.usuario)
  const [nomeDoTorneio, setNomeDoTorneio] = useState('')
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const adicionarTorneio = async()=>{
    if (nomeDoTorneio.trim() === "") {
      alert("Este campo não pode ser nulo!")
      return null
    }
     const res = await criarTorneioApi(nomeDoTorneio, usuario?.id)
     alert(res)
     handleClose()
     window.location.reload()
  }
 
  return (
    <div>
      <Button  color='success' sx={{width:"100%"}} variant="contained" onClick={handleClickOpen}>
        Criar 
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Criar torneio"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Escolha um nome para seu torneio e depois adicione participantes!</DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <TextField fullWidth id="outlined-basic" label="Nome do torneio" variant="outlined" size='small' sx={{marginTop:1}}
              onChange={e => setNomeDoTorneio(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='success' onClick={adicionarTorneio}>Criar</Button>
          <Button color='error' onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
