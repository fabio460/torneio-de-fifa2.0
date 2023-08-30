import React,{useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {jogadoresType} from '../../types'
import { comprarJogadoresApi } from '../../api/jogadoresApi';
import CarregandoBtn from '../../carregandoBtn';
import ModalCompraFinalizada from './modalCompraFinalizada';
import ModalCompraNegada from './modalCompraNegada';
export default function ModalComprarJogador({jogador}:{jogador:jogadoresType}) {
  const [open, setOpen] = React.useState(false);
  const [openFinalized, setOpenFinalized] = React.useState(false);
  const idElenco = localStorage.getItem('idDoElenco') || ''
  const [openCompraNegada, setCompraNegada] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const comprar = async()=>{
      setCarregando(true)
      const res =await comprarJogadoresApi(idElenco, jogador)
      if (res === "jogador comprado com sucesso") {   
        setOpenFinalized(true)
      }else{
        setCompraNegada(true)
      }
      setCarregando(false)
    }


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{marginBottom:0.5}}>
        Comprar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Compra de jogadores
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja comprar o jogador {jogador.nome}?
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            carregando ?
            <Button onClick={comprar} color='success' variant='contained' fullWidth>
              <CarregandoBtn/>
            </Button>
            :
            <Button onClick={comprar} color='success' variant='contained' fullWidth>Confirmar</Button>
          }
          <Button color='error' variant='outlined' onClick={handleClose} fullWidth autoFocus>
            Cencelar
          </Button>
          <ModalCompraFinalizada 
            openFinalized={openFinalized}
            setOpenFinalized={setOpenFinalized}
            handleCloseFinalizedd={handleClose}
            jogador={jogador}  
          />
          <ModalCompraNegada 
            openFinalized={openCompraNegada}
            setOpenFinalized={setCompraNegada}
            handleCloseFinalizedd={handleClose}
            jogador={jogador}  
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
