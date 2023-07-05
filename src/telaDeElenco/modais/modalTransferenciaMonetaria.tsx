import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import { torneioType } from '../../types';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { transferenciaMonetariaApi } from '../../api/participantesApi';
import CarregandoBtn from '../../carregandoBtn';

export default function ModalTransferenciaMonetaria() {
  const [open, setOpen] = React.useState(false);
  const torneio:torneioType = useSelector((state:any)=>state.torneioAtualReducer.torneio)
  const [idDoRecebidor, setidDoRecebidor] = React.useState('');
  const [valor, setValor] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const handleChange = (event: SelectChangeEvent) => {
    setidDoRecebidor(event.target.value as string);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let idDoPagador = localStorage.getItem("idDoElenco") as string
  const transferirDinheiro = async()=>{
    setLoading(true)
    const res = await transferenciaMonetariaApi(idDoRecebidor,idDoPagador,valor)
    alert(res)
    setLoading(false)
    handleClose()
    window.location.reload()
  }
  return (
    <div>
      <div onClick={handleClickOpen}>
        transferir dinheiro
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Escolha quem voçe deseja transferir seu dinheiro e insira o valor"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box sx={{ minWidth: "100%",margin:"10px 0px" }}>
              <FormControl fullWidth  size='small'>
                <InputLabel id="demo-simple-select-label">Enviando para</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={idDoRecebidor}
                  label="Enviando para"
                  onChange={handleChange}
                >
                  {
                    torneio?.participantes?.map(p=>{
                      return p?.id !== idDoPagador && <MenuItem  value={p?.id}>{p?.nome}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </Box>
            <TextField
               size='small'
               sx={{width:"100%"}}
               label='Valor a transferir'
               onChange={e=>setValor(parseFloat(e.target.value))}
            />
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            loading ?
            <Button><CarregandoBtn color={"#2e7d32"}/></Button>:
            <Button onClick={transferirDinheiro} color='success'>Confirmar</Button>
          }
          <Button onClick={handleClose} color='error' autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
