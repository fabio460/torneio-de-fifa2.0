import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from 'react-bootstrap';

import { checkedType, participantesType, torneioType } from '../types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { transferenciaDeJogadoresApi } from '../api/jogadoresApi';
import CarregandoBtn from '../carregandoBtn';
import { formatoMonetario } from '../metodosUteis';


export default function ModalTransferencia({torneio,listaDeSelecionados, elenco}:{
    torneio:torneioType|undefined,
    listaDeSelecionados:checkedType[] | undefined,
    elenco:participantesType | undefined
  }) {
  const [open, setOpen] = React.useState(false);
  const [idDoComprador, setIdDoComprador] = React.useState('');
  const [loading, setLoading] = React.useState(false)
  const handleChange = (event: SelectChangeEvent) => {
    setIdDoComprador(event.target.value as string);
  };

  const handleClickOpen = async() => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const idsDosJogadoresSelecionados = listaDeSelecionados?.map(j=>{
    return j.jogador.id
  })
  console.log(listaDeSelecionados)
  const idDoProprietario = elenco?.id
  async function transferir() {
    setLoading(true)
    const res = await transferenciaDeJogadoresApi(idDoProprietario, idDoComprador, idsDosJogadoresSelecionados)
    alert(res)
    setLoading(false)
    if (res === "transferência concluida com sucesso") {
      window.location.reload()
    }
  }
  function getValoresTotais(lista:checkedType[] | undefined) {
    
    let total = 0
    lista?.map(j=>{
      total += parseFloat(j.jogador.valorDoJogador || "")
    })
    return formatoMonetario(total)
  }
  return (
    <div>
      <Button style={{marginLeft:'5px'}} onClick={handleClickOpen}>
        Transferir
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Transferência dos jogadores"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              listaDeSelecionados?.map(j=>{
                return <div>
                  {j.jogador.nome} - {formatoMonetario(parseFloat(j.jogador.valorDoJogador || ""))}
                </div>
              })
            }
            <h5 style={{color:"red", marginTop:"10px"}}>
              No total de: {getValoresTotais(listaDeSelecionados)}
            </h5>
          <FormControl fullWidth sx={{marginTop:3}} size='small'>
            <InputLabel id="demo-simple-select-label" sx={{bgcolor:'white', paddingRight:1}}>Transferir para</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={idDoComprador}
              label="idDoComprador"
              onChange={handleChange}
              sx={{}}
            >
              {
                torneio?.participantes.map((item, key)=>{
                  return idDoProprietario !== item.id && <MenuItem value={item.id}>{item.nome}</MenuItem>
                })
              }
            </Select>
          </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            loading?
            <Button onClick={transferir} style={{paddingBottom:"0px"}}>
              <CarregandoBtn/>
            </Button>:
            <Button onClick={transferir}>
               Transferir    
            </Button>
          }
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
