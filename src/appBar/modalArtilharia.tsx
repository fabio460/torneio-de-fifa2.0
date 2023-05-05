import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { chekedType, participantesType } from '../types';

export default function ModalArtilharia() {
  const [open, setOpen] = React.useState(false);
  const [primeiro, setPrimeiro] = React.useState<{nome:string, dados:participantesType}>();
  const [segundo, setSegundo] = React.useState<{nome:string, dados:participantesType}>();
  const [terceiro, setTerceiro] = React.useState<{nome:string, dados:participantesType}>();
  const [quarto, setQuarto] = React.useState<{nome:string, dados:participantesType}>();

  const participantes:chekedType[] = useSelector((state:any)=>state.participantesReducer.participantes)
  
  const handleChangePrimeiro = (event: any, data:any) => {
    setPrimeiro({nome:event.target.value, dados:data.props.nonce && JSON.parse(data.props.nonce)})
  };
  const handleChangeSegundo = (event: any, data:any) => {
    setSegundo({nome:event.target.value, dados:data.props.nonce && JSON.parse(data.props.nonce)});
  };
  const handleChangeTerceiro = (event: any, data:any) => {
    setTerceiro({nome:event.target.value, dados:data.props.nonce && JSON.parse(data.props.nonce)});
  };
  const handleChangeQuarto = (event: any, data:any) => {
    setQuarto({nome:event.target.value, dados:data.props.nonce && JSON.parse(data.props.nonce)});
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch()
  const handleClose = () => {
    setOpen(false);
    dispatch({
      type:"artilharia",
      payload:{artilheiros:{primeiro,segundo,terceiro,quarto}}
    })
    
  };

  const dialogStyle = {
    width:"400px",
    "@media (max-width:800px)":{
      width:"100%"
    }
  }
  return (
    <div>
      <div onClick={handleClickOpen}>
        Artilharia
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{background:"",width:"100%"}}
      >
        <DialogTitle id="alert-dialog-title">
          Quem fez mais gols
        </DialogTitle>
        <DialogContent className='modalColocacaoFormsContainer' >
          <DialogContentText id="alert-dialog-description">
            
            <FormControl className='modalColocacaoForms' sx={{margin:"9px 0"}} size="small">
              <InputLabel id="demo-select-small" >Primeiro lugar</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={primeiro?.nome}
                label="Primeiro lugar"
                onChange={handleChangePrimeiro}
              >
                <MenuItem id={''} value="">
                  <em>None</em>
                </MenuItem>
                {participantes?.map((elem:chekedType,key)=>{
                  return <MenuItem value={elem.participante.nome} nonce={JSON.stringify(elem.participante)}>{elem.participante.nome}</MenuItem>
                })}
              </Select>
            </FormControl>

            <FormControl className='modalColocacaoForms' size="small"  sx={{marginBottom:1}}>
              <InputLabel id="demo-select-small">Segundo lugar</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={segundo?.nome}
                label="Segundo lugar"
                onChange={handleChangeSegundo}
              >
                <MenuItem id={''} value="">
                  <em>None</em>
                </MenuItem>
                {participantes?.map((elem,key)=>{
                  return <MenuItem nonce={JSON.stringify(elem.participante)} value={elem.participante.nome}>{elem.participante.nome}</MenuItem>
                })}
              </Select>
            </FormControl>

            <FormControl className='modalColocacaoForms' size="small"  sx={{marginBottom:1}}>
              <InputLabel id="demo-select-small" >Segundo lugar</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={terceiro?.nome}
                label="Segundo lugar"
                onChange={handleChangeTerceiro}
              >
                <MenuItem id={''} value="">
                  <em>None</em>
                </MenuItem>
                {participantes?.map((elem,key)=>{
                  return <MenuItem nonce={JSON.stringify(elem.participante)} value={elem.participante.nome}>{elem.participante.nome}</MenuItem>
                })}
              </Select>
            </FormControl>
            <FormControl className='modalColocacaoForms' size="small">
              <InputLabel id="demo-select-small" >Quarto lugar</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={quarto?.nome}
                label="Segundo lugar"
                onChange={handleChangeQuarto}
              >
                <MenuItem id={''} value="">
                  <em>None</em>
                </MenuItem>
                {participantes?.map((elem,key)=>{
                  return <MenuItem nonce={JSON.stringify(elem.participante)} value={elem.participante.nome}>{elem.participante.nome}</MenuItem>
                })}
              </Select>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Confirmar</Button>
          <Button color='error' onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
