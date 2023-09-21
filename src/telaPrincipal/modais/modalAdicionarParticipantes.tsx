
import React,{useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { jogadoresType, timesType, usuarioLogadoType } from '../../types';
import { useSelector } from 'react-redux';
import { adicionarParticipantesoApi } from '../../api/participantesApi';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getEmblemaDoTime, getJogadoresPorTime, getTimeName, getTimes } from '../../metodosUteis';
import Autocomplete from '@mui/material/Autocomplete';
import { listaJogadoresPorTorneioApi } from '../../api/jogadoresApi';
import { Checkbox } from '@mui/material';
export default function ModalAdicionarParticipantes() {
  const [open, setOpen] = React.useState(false);
  const [nomeDoParticipante, setNomeDoParticipante] = useState('')
  const [age, setAge] = React.useState('');
  const [time, setTime] = React.useState('');
  const [listaDeTimes, setListaDeTimes] = useState<any>([])
  const [value, setValue] = useState<any>()
  const [saldo, setSaldo] = useState(0)
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleChangeTime = (event:any, newValue:any) => {
    setValue(newValue);
  }
  const usuario:usuarioLogadoType = useSelector((state:any)=>state.usuarioReducer.usuario)
  
  const [jogadoresDoTorneioSelecionado, setJogadoresDoTorneioSelecionado] = useState<any>([])
  async function torneioSelecionado() {
    const res = await listaJogadoresPorTorneioApi(localStorage.getItem('idDoTorneio') || "")
    res.map((r:jogadoresType)=>{
      return jogadoresDoTorneioSelecionado.push(r?.nome);
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    torneioSelecionado()
  },[open])
  const adicionarParticipantes = async()=>{
    const jogadores = getJogadoresPorTime(value.label)
    var jogadoresdTime = jogadores.filter(j=>{
      if (!jogadoresDoTorneioSelecionado.includes(j.nome)) {
        return j
      }
    })
    const nomeDoTime = value.label;
    const emblemaDoTime = getEmblemaDoTime(value.label);
    if (nomeDoParticipante.trim() === "" || age.trim() === "") {
      alert("Não pode haver campos nulos")
      return null
    }
    if (!checked) {   
      jogadoresdTime=[]
      jogadoresdTime.push(
        {
          nome:"Genérico",
          imagemDoJogador:"",
          nacionalidade:"",
          imagemDaNacionalidade:"",
          escudoDoTime:"",
          posicao:"RW, ST, CF",
          overall:"0",
          valorDoJogador:"0",
          time:"",
          liga:"",
          linkSoFifa:""
        }
      )
    }
    const res = await adicionarParticipantesoApi(
      nomeDoParticipante,
      age,
      saldo,
      nomeDoTime,
      emblemaDoTime,
      jogadoresdTime
    )
    alert(res.toString())
    window.location.reload();
  }
  
  let dark = useSelector((state:any)=>state.darkReducer.dark)
  useEffect(()=>{
    setListaDeTimes(getTimeName())
  },[])
  
  return (
    <div>
      <Button size='small'  sx={{height:'41px', width:'100%'}} variant="contained" onClick={handleClickOpen}>
        Adicionar paticipantes
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Adicione participantes para seu torneio!"}
        </DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: '2% 0', width:'100%',height:'41px' }} size="small">
          <InputLabel id="demo-select-small-label" sx={{minWidth:"60px", background:dark?"": "white", marginRight:'20px'}}>Torneio</InputLabel>
          <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={age}
              label="Torneio"
              onChange={handleChange}
          >
              {
                  usuario?.torneio?.map((elem, key)=>{
                      return  <MenuItem key={key} value={elem.id} className={elem.id}>{elem.nome}</MenuItem>
                  })
              }
          </Select>
          </FormControl>
          <Autocomplete
            value={value}
            onChange={handleChangeTime}
            id="combo-box-demo"
            options={listaDeTimes}
            sx={{ width: "100%"}}
            renderInput={(params) => <TextField {...params} label="Selecione o clube" size='small'/>}
          /> 
          <TextField id="outlined-basic" label="nome" variant="outlined" size='small' sx={{margin:"2% 0",  width:'100%'}}
              onChange={e => setNomeDoParticipante(e.target.value)}
          />
          <TextField id="outlined-basic" label="saldo" variant="outlined" size='small' sx={{margin:"2% 0",  width:'100%'}}
              onChange={e => setSaldo(parseFloat(e.target.value))}
          />
          <span>Adicionar jogadores originais do clube</span>
          <Checkbox
            checked={checked}
            onChange={handleChangeChecked}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={adicionarParticipantes} variant='outlined' color='success'>adicionar</Button>
          <Button variant='outlined' color='error' onClick={handleClose} autoFocus>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
