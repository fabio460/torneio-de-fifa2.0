import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { participantesType, torneioType, usuarioLogadoType } from '../../types';
import { useSelector } from 'react-redux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { atualizaTorneioApi } from '../../api/torneioApi';



export default function ModalAtualizarTorneio({torneio}:{torneio:torneioType[] | undefined}) {
  const [open, setOpen] = React.useState(false);
  const [Nome, setNome] = React.useState('');
  const [nomeDoParticipante, setNomeDoParticipante] = useState('')
  const [Id, setId] = useState('')
  const handleChange = (event: SelectChangeEvent, id:any) => {
    setNome(event.target.value);
    setId(id)
  };
  const usuario:usuarioLogadoType = useSelector((state:any)=>state.usuarioReducer.usuario)
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const atualizarTorneio = async()=>{
    if (Id !== "") {   
      const res = await atualizaTorneioApi(Id, Nome)
      alert(res)
      window.location.reload()
    }else{
      alert("Altere algum dado para atualizar!")
    }
   
  }
  
  return (
    <div>
      <Button size='small' color='warning' sx={{width:"100%"}} onClick={handleClickOpen} variant='contained'>
        Atualizar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Atualização de torneio
        </DialogTitle>
        <DialogContent>
           {
            torneio?.map((t, key)=>{
               return(
                <div style={{margin:10}}>
                  <TextField 
                     size='small'
                     defaultValue={t.nome}
                     onChange={(e:any)=> handleChange(e,t.id)}
                     id={t.id}
                  />
                </div>
               ) 
            })
           }
        </DialogContent>
        <DialogActions>
          <Button onClick={atualizarTorneio}>atualizar</Button>
          <Button color='error' onClick={handleClose} autoFocus>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
