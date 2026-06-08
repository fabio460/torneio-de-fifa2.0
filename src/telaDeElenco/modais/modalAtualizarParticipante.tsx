import React,{useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { participantesType } from '../../types';
import { atualizarParticipantesApi } from '../../api/participantesApi';
import { getEmblemaDoTime, getJogadoresPorTime, getTimeName } from '../../metodosUteis';
import { SelectChangeEvent } from '@mui/material';

export default function ModalAtualizar({elenco}:{elenco:participantesType | undefined}) {
  const [open, setOpen] = React.useState(false);
  const [nome, setNome] = useState('')
  const [time, setTime] = useState('')
  const [saldo, setSaldo] = useState('')
  const [value, setValue] = useState<any>(null)
  const [listaDeTimes, setListaDeTimes] = useState<any>([])
  const [age, setAge] = React.useState('');
  const [checked, setChecked] = React.useState(true);

  const handleChangeTime = (event:any, newValue:any) => {
    setValue(newValue);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const atualizarParticipantes = async () => {
    const nomeDoTime = value.label;
    const emblemaDoTime = getEmblemaDoTime(value.label);
    const res = await atualizarParticipantesApi(
        elenco?.id || '',
        nome.trim() === '' ? elenco?.nome || '' : nome,
        saldo === '' ? elenco?.saldo || 0 : parseFloat(saldo),
        time.trim() === '' ? elenco?.time || '' : time,
        nomeDoTime,
        emblemaDoTime
    )
    //alert(res)
    window.location.reload()
  }
  
  useEffect(()=>{
    setValue({label:elenco?.time, id:elenco?.id})
  },[])
  useEffect(()=>{
    setListaDeTimes(getTimeName())
  },[])
  return (
    <div>
      <div  onClick={handleClickOpen}>
        Atualizar time
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Atualizar conta do elenco"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className='modalAtualizarBody'>
            <TextField 
                size='small' 
                id="outlined-basic" 
                label="Nome" 
                variant="outlined"
                defaultValue={elenco?.nome} 
                onChange={e=> setNome(e.target.value)}
                sx={{marginBottom:1, width:"100%"}}
            />
            <TextField 
                size='small' 
                id="outlined-basic" 
                label="Saldo" 
                variant="outlined"
                defaultValue={elenco?.saldo} 
                onChange={e=> setSaldo(e.target.value)}
                sx={{marginBottom:1, width:"100%"}}
                
            />
            <Autocomplete
                value={value}
                onChange={handleChangeTime}
                id="combo-box-demo"
                options={listaDeTimes}
                sx={{ width: "100%"}}
                renderInput={(params) => <TextField {...params} label="Selecione o clube" size='small'/>}
            /> 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={atualizarParticipantes}>Atualizar</Button>
          <Button onClick={handleClose} autoFocus>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
