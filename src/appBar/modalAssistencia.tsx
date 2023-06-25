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
import { chekedType, dadosPremiacoesDaApiType, participantesType } from '../types';
import { useSelector } from 'react-redux';
import OutlinedInput from '@mui/material/OutlinedInput';
import { assistencia, quartoAssistencia, terceiroAssistencia, viceAssistencia } from '../valoresDosPremios';
import Primeiro from './selectsAssistecias/primeiro';

export default function ModalAssistencia() {
  const [open, setOpen] = React.useState(false);
  const [primeiro, setPrimeiro] = React.useState<{nome:string, dados:participantesType, dadosDaApi:dadosPremiacoesDaApiType}>();
  const [segundo, setSegundo] = React.useState<{nome:string, dados:participantesType, dadosDaApi:dadosPremiacoesDaApiType}>();
  const [terceiro, setTerceiro] = React.useState<{nome:string, dados:participantesType, dadosDaApi:dadosPremiacoesDaApiType}>();
  const [quarto, setQuarto] = React.useState<{nome:string, dados:participantesType, dadosDaApi:dadosPremiacoesDaApiType}>();

  const participantes:chekedType[] = useSelector((state:any)=>state.participantesReducer.participantes)
  
  const handleChangePrimeiro = (event: any, data:any) => {
    let jogadorSelecionado = JSON.parse(data.props.nonce)
    setPrimeiro({
      nome:event.target.value,
      dados:data.props.nonce && JSON.parse(data.props.nonce),
      dadosDaApi:{
        idParticipante:jogadorSelecionado.idParticipante,
        premio:assistencia,
        nome:jogadorSelecionado.nome
      }
    })
  };
  const handleChangeSegundo = (event: any, data:any) => {
    let jogadorSelecionado = JSON.parse(data.props.nonce)
    setSegundo({
      nome:event.target.value,
      dados:data.props.nonce && JSON.parse(data.props.nonce),
      dadosDaApi:{
        idParticipante:jogadorSelecionado.idParticipante,
        premio:viceAssistencia,
        nome:jogadorSelecionado.nome
      }
    });
  };
  const handleChangeTerceiro = (event: any, data:any) => {
    let jogadorSelecionado = JSON.parse(data.props.nonce)
    setTerceiro({
      nome:event.target.value, 
      dados:data.props.nonce && JSON.parse(data.props.nonce),
      dadosDaApi:{
        idParticipante:jogadorSelecionado.idParticipante,
        premio:terceiroAssistencia,
        nome:jogadorSelecionado.nome
      }
    });
  };
  const handleChangeQuarto = (event: any, data:any) => {
    let jogadorSelecionado = JSON.parse(data.props.nonce)
    setQuarto({
      nome:event.target.value, 
      dados:data.props.nonce && JSON.parse(data.props.nonce),
      dadosDaApi:{
        idParticipante:jogadorSelecionado.idParticipante,
        premio:quartoAssistencia,
        nome:jogadorSelecionado.nome
      }
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch()
  const handleClose = () => {
    setOpen(false);
    dispatch({
      type:"assistencia",
      payload:{assistentes:{
        primeiro:primeiro?.dadosDaApi,
        segundo:segundo?.dadosDaApi,
        terceiro:terceiro?.dadosDaApi,
        quarto:quarto?.dadosDaApi
      }}
    })
    
  };

  const dialogStyle = {
    width:"400px",
    "@media (max-width:800px)":{
      width:"100%"
    }
  }
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <div>
      <div onClick={handleClickOpen}>
        Assisência
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{background:"",width:"100%"}}
      >
        <DialogTitle id="alert-dialog-title">
          Quem deu mais assisência
        </DialogTitle>
        <DialogContent className='modalColocacaoFormsContainer' >
          <DialogContentText id="alert-dialog-description">
            
            <Primeiro 
              handleChangePrimeiro={handleChangePrimeiro}
              participantes={participantes}
              setPrimeiro={setPrimeiro}  
            />
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
                {
                  participantes.map(e=>{
                    return e.participante.jogadores.map(e=>{
                      return <MenuItem value={e.nome} nonce={JSON.stringify(e)}>{e.nome}</MenuItem>
                    })
                  })
                }
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
                {
                  participantes.map(e=>{
                    return e.participante.jogadores.map(e=>{
                      return <MenuItem value={e.nome} nonce={JSON.stringify(e)}>{e.nome}</MenuItem>
                    })
                  })
                }
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
                {
                  participantes.map(e=>{
                    return e.participante.jogadores.map(e=>{
                      return <MenuItem value={e.nome} nonce={JSON.stringify(e)}>{e.nome}</MenuItem>
                    })
                  })
                }
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
