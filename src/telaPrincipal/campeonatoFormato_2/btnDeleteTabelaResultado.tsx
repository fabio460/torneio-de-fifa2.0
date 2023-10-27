import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import { deletarTabelaResultado } from '../../api/tabelaResultadosApi';
import { getDataTorneio, getHoraTorneio } from '../../metodosUteis';
import CarregandoBtn from '../../carregandoBtn';

export default function BtnDeleteTabelaResultados({tabela}:any) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deletarTabela = ()=>{
    deletarTabelaResultado(tabela.id)
    setLoading(true)
    //window.location.reload()
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}><MoreVertIcon/></IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseja realmente deletar esta tabela?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao deletar voçê não podera mais retornar esse processo!
            Se estiver certo disso, clique em confirmar deleção caso contrário, cancelar.
            <div>
              Torneio encerrado no dia {getDataTorneio(tabela.data)} as {getHoraTorneio(tabela.data)}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='warning' onClick={deletarTabela}>
            {loading ? <CarregandoBtn/> : " confirmar deleção"} 
          </Button>
          <Button variant='outlined' onClick={handleClose} autoFocus>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}