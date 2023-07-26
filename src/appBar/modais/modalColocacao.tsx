import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux/es/exports';
import { chekedType, dadosPremiacoesDaApiType, participantesType } from '../../types';
import { useSelector } from 'react-redux';
import { campeao, quartoColocado, terceiroColocado, viceCampeao } from '../../valoresDosPremios';

export default function ModalColocacao() {
  const [open, setOpen] = React.useState(false);
  const [primeiro, setPrimeiro] = React.useState<{nome:string, dados:participantesType,dadosDaApi:dadosPremiacoesDaApiType}>();
  const [segundo, setSegundo] = React.useState<{nome:string, dados:participantesType,dadosDaApi:dadosPremiacoesDaApiType}>();
  const [terceiro, setTerceiro] = React.useState<{nome:string, dados:participantesType,dadosDaApi:dadosPremiacoesDaApiType}>();
  const [quarto, setQuarto] = React.useState<{nome:string, dados:participantesType,dadosDaApi:dadosPremiacoesDaApiType}>();

  const participantes:chekedType[] = useSelector((state:any)=>state.participantesReducer.participantes)
  
  const handleChangePrimeiro = (event: any, data:any) => {
    const idParticipante =  JSON.parse(data.props.nonce).id
    setPrimeiro({nome:event.target.value, dados:data.props.nonce && JSON.parse(data.props.nonce), dadosDaApi:{idParticipante:idParticipante,premio:campeao}})
  };
  const handleChangeSegundo = (event: any, data:any) => {
    const idParticipante =  JSON.parse(data.props.nonce).id
    setSegundo({nome:event.target.value, dados:data.props.nonce && JSON.parse(data.props.nonce), dadosDaApi:{idParticipante:idParticipante,premio:viceCampeao}});
  };
  const handleChangeTerceiro = (event: any, data:any) => {
    const idParticipante =  JSON.parse(data.props.nonce).id
    setTerceiro({nome:event.target.value, dados:data.props.nonce && JSON.parse(data.props.nonce), dadosDaApi:{idParticipante:idParticipante,premio:terceiroColocado}});
  };
  const handleChangeQuarto = (event: any, data:any) => {
    const idParticipante =  JSON.parse(data.props.nonce).id
    setQuarto({nome:event.target.value, dados:data.props.nonce && JSON.parse(data.props.nonce), dadosDaApi:{idParticipante:idParticipante,premio:quartoColocado}});
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch()
  const handleClose = () => {
    setOpen(false);
    dispatch({
      type:"colocacao",
      payload:{colocacao:{primeiro,segundo,terceiro,quarto}}
    })
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        Colocação
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{background:"",width:"100%"}}
      >
        <DialogTitle id="alert-dialog-title">
          Colocação
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
