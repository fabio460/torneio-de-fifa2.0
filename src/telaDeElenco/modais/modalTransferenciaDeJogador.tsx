import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from 'react-bootstrap';
import { checkedType, jogadoresType, participantesType, torneioType } from '../../types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { transferenciaDeJogadoresApi } from '../../api/jogadoresApi';
import CarregandoBtn from '../../carregandoBtn';
import { calculaFolha, calculaFolhaSemFormato, formatoMonetario, numberIsValid, semVirgula } from '../../metodosUteis';
import { Checkbox, TextField } from '@mui/material';
import ModalTransferenciaConfirmada from './modalTransferenciaConfirmada';

export default function ModalTransferencia({torneio,listaDeSelecionados, elenco}:{
    torneio:torneioType|undefined,
    listaDeSelecionados:checkedType[] | undefined,
    elenco:participantesType | undefined
  }) {
  const [open, setOpen] = React.useState(false);
  const [idDoComprador, setIdDoComprador] = React.useState('');
  const [loading, setLoading] = React.useState(false)
  const [valorDaNegociacao, setValorDaNegociacao] = React.useState<number>()
  const [valorValido, setvalorValido] = React.useState(false)
  const [confir, setconfir] = React.useState(false)
  const [error, setError] = React.useState(false)
  const handleChange = (event: SelectChangeEvent) => {
    setIdDoComprador(event.target.value as string);
  };

  const handleClickOpen = async() => {
    setOpen(true);
  };

  const handleClose = () => {
    setError(false)
    setOpen(false);
  };

  const [checked, setChecked] = React.useState(false);

  const  handleNovoValor = (e: any)=>{
     if (!numberIsValid(e.target.value)) {
      setvalorValido(true)
     }else{
       let valor:number = parseFloat(semVirgula(e.target.value))
       if (valor > 0) {
        setValorDaNegociacao(valor)
       }
       setvalorValido(false)
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
          setError(false)
          setconfir(true)
          setOpen(false)
        }, 2000);
      }else{
        setLoading(false)
        setError(true)   
      }
  }
  function getValoresTotais(lista:checkedType[] | undefined) {
    
    let total = 0
    lista?.map(j=>{
      total += parseFloat(j.jogador.valorDoJogador || "")
    })
    return formatoMonetario(total)
  }

  const folhaApois = ()=>{
    const valorElenco = calculaFolhaSemFormato(elenco?.jogadores as jogadoresType[])
    const valorDosSelecionados = calculaFolhaSemFormato(listaDeSelecionados?.map(e=>e.jogador) as jogadoresType[]) 
    return valorElenco - valorDosSelecionados
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
            <h5 style={{color:"#4caf50", marginTop:"10px"}}>
              Valor da negociação: {getValoresTotais(listaDeSelecionados)}
            </h5>
          <FormControl fullWidth sx={{marginTop:3}} size='small' error={error}>
            <InputLabel id="demo-simple-select-label" sx={{bgcolor:'', paddingRight:1}}>Transferir para</InputLabel>
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
          {error && <div style={{color:"#d32f2f"}}>Escolha um usuário!</div> } 
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
              <div>
                  <TextField 
                    sx={{width:"100%"}}
                    size='small'
                    label='Novo valor da transação'
                    onChange={handleNovoValor}
                    error={valorValido}
                  />
                  {
                    valorValido && 
                    <span style={{color:"#d32f2f"}}>Insira um número válido!</span>
                  }
                </div>
              }
            </div>
            <div>
              Sua folha irá reduzir de <span style={{color:""}}> {calculaFolha(elenco?.jogadores as jogadoresType[])}</span> para <span style={{color:"#ff9800"}}> {formatoMonetario(folhaApois())}</span>
            </div>
          </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            loading?
            <Button onClick={transferir} style={{paddingBottom:"0px",background:"#4caf50",width:"90px"}}>
              <CarregandoBtn/>
            </Button>:
            <Button onClick={transferir} style={{background:"#4caf50", color:"white"}}>
               Transferir    
            </Button>
          }
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <ModalTransferenciaConfirmada confir={confir} listaDeSelecionados={listaDeSelecionados}/>
    </div>
  );
}
