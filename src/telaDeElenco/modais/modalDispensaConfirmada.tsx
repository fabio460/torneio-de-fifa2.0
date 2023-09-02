import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { checkedType } from '../../types';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalDispensaConfirmada({confir, listaDeSelecionados}:{
  confir:boolean, listaDeSelecionados:checkedType[] | undefined
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload()
  };
  React.useEffect(()=>{
     if (confir) {
        setOpen(true)
     }
  },[confir])
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Jogador dispensado com sucesso"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {(listaDeSelecionados?.length as any) > 1 ?
              <div>
                <h5>Jogadores removidos do seu time</h5>
                <ul>
                    {
                        listaDeSelecionados?.map((jog, key)=>{
                            return <li>
                                <div>{jog.jogador.nome}</div>
                                <div></div>
                            </li>
                        })
                    }
                </ul>
              </div>:
              <h5>
                 Voçê removeu o jogador  {listaDeSelecionados && listaDeSelecionados[0].jogador.nome} do seu time   
              </h5>  
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' variant='contained' onClick={handleClose}>Fechar</Button>
        
        </DialogActions>
      </Dialog>
    </div>
  );
}
