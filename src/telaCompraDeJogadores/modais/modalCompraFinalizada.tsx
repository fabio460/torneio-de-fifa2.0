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

export default function ModalCompraFinalizada({
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
 

  const handleClickOpenFinalized = () => {
    setOpenFinalized(true);
  };

  const handleClose = () => {
    setOpenFinalized(false);
    handleCloseFinalizedd()
    window.location.reload()
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
        <DialogTitle color={"green"}>{"Parabêns pela compra do jogador "+jogador.nome}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" sx={{display:"flex"}}>
             <img className='imgJogadorComprado' src={jogador.imagemDoJogador} />
             <ul>
                <li> Verifique seu novo saldo!</li>
                <li>Atenção a folha de pagamento, deixe um valor em caixa para pagar</li>
                {/* <li>Arrume seu campinho com o novo jogador</li> */}
             </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
