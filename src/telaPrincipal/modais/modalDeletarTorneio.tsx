import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { participantesType, torneioType, usuarioLogadoType } from '../../types';
import { useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { deletarTorneioApi } from '../../api/torneioApi';
import { DialogContentText, TextField, Typography } from '@mui/material';

export default function ModalDeletarTorneio({torneio}:{torneio:torneioType[] | undefined}) {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');
  const [chaveAutenticacao, setChaveAutenticacao] = useState('')
  const [erroDeCodigo, seterroDeCodigo] = useState(false)
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const usuario:usuarioLogadoType = useSelector((state:any)=>state.usuarioReducer.usuario)
  //const torneios = useSelector((state:any)=>state.torneioReducer.torneio)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletarTorneio = async()=>{
    if(chaveAutenticacao !== "recanto"){
      seterroDeCodigo(true)
      return null
    }
    seterroDeCodigo(false)
    if (age === "") {
      alert("Selecione um torneio")
      return null
    }

    const res = await deletarTorneioApi(age)
    alert(res)
    window.location.reload()
  }
  let dark = useSelector((state:any)=>state.darkReducer.dark)

  return (
    <div>
      <Button  color='error' sx={{width:"100%"}} onClick={handleClickOpen} variant='contained'>
        Deletar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Deletar torneio
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
              Atenção, ao confirmar você estará deletando o torneio e todos os seus dados
          </DialogContentText>
           <FormControl sx={{ m: '2% 0', width:'100%',height:'41px' }} size="small">
          <InputLabel id="demo-select-small-label" sx={{minWidth:"60px", background:dark? "":"white", marginRight:'20px'}}>Torneio a deletar</InputLabel>
          <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={age}
              label="Torneio a deletar"
              onChange={handleChange}
          >
              {
                torneio?.map((t, key)=>{
                   return  <MenuItem key={key} value={t.id} className={t.id}>{t.nome}</MenuItem>
                })
              }
          </Select>
          </FormControl>
          <TextField
             label={"Código"}
             size='small'
             onChange={e=> setChaveAutenticacao(e.target.value)}
             error={erroDeCodigo}
          />
          {
           erroDeCodigo && <Typography color={"red"}>Código inválido</Typography>
          }
          <DialogContentText>Tem certeza que deseja deletar? se sim, clique em remover torneio!</DialogContentText>
        </DialogContent>
        
        <DialogActions>
          <Button color='success' variant='outlined' onClick={deletarTorneio}>remover torneio</Button>
          <Button color='error' variant='outlined' onClick={handleClose} autoFocus>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
