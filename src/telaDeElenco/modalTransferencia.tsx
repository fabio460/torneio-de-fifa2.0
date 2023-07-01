import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from 'react-bootstrap';
import { checkedType, participantesType, torneioType } from '../types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { transferenciaDeJogadoresApi } from '../api/jogadoresApi';
import CarregandoBtn from '../carregandoBtn';
import { formatoMonetario } from '../metodosUteis';
import { Checkbox, TextField } from '@mui/material';

export default function ModalTransferencia({torneio,listaDeSelecionados, elenco}:{
    torneio:torneioType|undefined,
    listaDeSelecionados:checkedType[] | undefined,
    elenco:participantesType | undefined
  }) {
  const [open, setOpen] = React.useState(false);
  const [idDoComprador, setIdDoComprador] = React.useState('');
  const [loading, setLoading] = React.useState(false)
  const [valorDaNegociacao, setValorDaNegociacao] = React.useState<number>()
  const handleChange = (event: SelectChangeEvent) => {
    setIdDoComprador(event.target.value as string);
  };

  const handleClickOpen = async() => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [checked, setChecked] = React.useState(false);

  const  handleNovoValor = (e: any)=>{
     let valor:number = parseFloat(e.target.value)
     if (valor > 0) {
      setValorDaNegociacao(valor)
     }

  }
  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  
  const idsDosJogadoresSelecionados = listaDeSelecionados?.map(j=>{
    return j.jogador.id
  })
  
  const idDoProprietario = elenco?.id
  async function transferir() {
    setLoading(true)
    const res = await transferenciaDeJogadoresApi(
        idDoProprietario,
        idDoComprador,
        idsDosJogadoresSelecionados,
        valorDaNegociacao
      )
      if (res === "transferência concluida com sucesso!!!") {
        setTimeout(() => {
          alert(res)
          window.location.reload()
        }, 2000);
      }else{
        setLoading(false)   
        alert(res)
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
              Valor da negociação: {getValoresTotais(listaDeSelecionados)}
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
          <div>
            <Checkbox
              checked={checked}
              onChange={handleChangeCheckBox}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            Selecione aqui caso queira mudar o valor da negociação!
            <div style={{height:"60px"}}>
              {
              checked &&
                <TextField 
                  sx={{width:"100%"}}
                  size='small'
                  label='Novo valor da transação'
                  onChange={handleNovoValor}
                />
              }
            </div>
          </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            loading?
            <Button onClick={transferir} style={{paddingBottom:"0px",background:"green",width:"90px"}}>
              <CarregandoBtn/>
            </Button>:
            <Button onClick={transferir} style={{background:"green", color:"white"}}>
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
