import React,{useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {jogadoresType} from '../types'
import { comprarJogadoresApi } from '../api/jogadoresApi';
import CarregandoBtn from '../carregandoBtn';
export default function ModalComprarJogador({jogador}:{jogador:jogadoresType}) {
  const [open, setOpen] = React.useState(false);
  const idElenco = localStorage.getItem('idDoElenco') || ''
  const [jogadores, setJogadores] = useState<any>()
  const [carregando, setCarregando] = useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const comprar = async()=>{
      setCarregando(true)
      const res =await comprarJogadoresApi(idElenco, jogadores)
      alert(res)
      if (res === "jogador comprado com sucesso") {   
        window.location.reload()
      }
      setCarregando(false)
    }

    useEffect(()=>{
      setJogadores(jogador)
   
 },[])
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Comprar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
             {jogador.nome}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          {
            carregando ? <CarregandoBtn />:
            <Button onClick={comprar} variant='contained'>Confirmar</Button>
          }
          <Button variant='outlined' onClick={handleClose} autoFocus>
            Cencelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
