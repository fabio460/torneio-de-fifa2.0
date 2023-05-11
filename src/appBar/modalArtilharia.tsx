import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { chekedType, dadosPremiacoesDaApiType, jogadoresType, participantesType } from '../types';
import { artilheiro, quartoAtilheiro, terceiroArtilheiro, viceArtilheiro } from './valoresDosPremios';

export default function ModalArtilharia() {
  const [open, setOpen] = React.useState(false);
  const [primeiro, setPrimeiro] = React.useState<{nome:string, dados:participantesType, dadosDaApi:dadosPremiacoesDaApiType}>();
  const [segundo, setSegundo] = React.useState<{nome:string, dados:participantesType, dadosDaApi:dadosPremiacoesDaApiType}>();
  const [terceiro, setTerceiro] = React.useState<{nome:string, dados:participantesType, dadosDaApi:dadosPremiacoesDaApiType}>();
  const [quarto, setQuarto] = React.useState<{nome:string, dados:participantesType, dadosDaApi:dadosPremiacoesDaApiType}>();
  const participantes:chekedType[] = useSelector((state:any)=>state.participantesReducer.participantes)
  
  const handleChangePrimeiro = (event: any, data:any) => {
    let jogadorSelecionado = JSON.parse(data.props.nonce)
    setPrimeiro({nome:event.target.value, dados:data.props.nonce && JSON.parse(data.props.nonce),dadosDaApi:{idParticipante:jogadorSelecionado.idParticipante,premio:artilheiro}})
  };
  const handleChangeSegundo = (event: any, data:any) => {
    let jogadorSelecionado = JSON.parse(data.props.nonce)
    setSegundo({nome:event.target.value, dados:data.props.nonce && JSON.parse(data.props.nonce),dadosDaApi:{idParticipante:jogadorSelecionado.idParticipante,premio:viceArtilheiro}});
  };
  const handleChangeTerceiro = (event: any, data:any) => {
    let jogadorSelecionado = JSON.parse(data.props.nonce)
    setTerceiro({nome:event.target.value, dados:data.props.nonce && JSON.parse(data.props.nonce),dadosDaApi:{idParticipante:jogadorSelecionado.idParticipante,premio:terceiroArtilheiro}});
  };
  const handleChangeQuarto = (event: any, data:any) => {
    let jogadorSelecionado = JSON.parse(data.props.nonce)
    setQuarto({nome:event.target.value, dados:data.props.nonce && JSON.parse(data.props.nonce),dadosDaApi:{idParticipante:jogadorSelecionado.idParticipante,premio:quartoAtilheiro}});
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch()
  const handleClose = () => {
    setOpen(false);
    dispatch({
      type:"artilharia",
      payload:{artilheiros:{
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
