import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { jogadoresType } from '../../types';
import { Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCompraNegada({
    openFinalized,
    setOpenFinalized,
    handleCloseFinalizedd,
    jogador
    }:{
        openFinalized:any,
        setOpenFinalized:any,
        handleCloseFinalizedd:any,
        jogador:jogadoresType
    }) {
 


  const handleClose = () => {
    setOpenFinalized(false);
    handleCloseFinalizedd()
    setOpenFinalized(true)
  };

  return (
    <div>

      <Dialog
        open={openFinalized}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle color={"red"} style={{textAlign:"center"}}>Saldo insuficiênte!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" sx={{display:"flex"}}>
             <img className='imgJogadorComprado' src={jogador.imagemDoJogador} />
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"50%"}}>
                {/* <div>Voçe não pode comprar o {jogador.nome}</div> */}
                <img style={{width:"50%"}} src="https://img.freepik.com/vetores-premium/design-de-icone-de-botao-da-cruz-vermelha_178156-173.jpg" alt="" />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
