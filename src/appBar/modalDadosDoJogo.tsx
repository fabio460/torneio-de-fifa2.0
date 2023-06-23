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
import { chekedType, pagadoresType, participantesType } from '../types';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import { empates, gols, vitoria } from '../valoresDosPremios';

type dadosType = {
  idParticipante:string, 
  premio:number,
  dado?:number,
  tipoDeDado?:string,
  participante?:string
}

const golsPremio = gols
const vitoriasPremio = vitoria
const empatesPremio = empates
export default function ModalDadosDoJogo() {
  const [open, setOpen] = React.useState(false);
  const [gols, setgols] = React.useState<dadosType[]>([]);
  const [vitorias, setvitorias] = React.useState<dadosType[]>([]);
  const [empates, setempates] = React.useState<dadosType[]>([]);
  
  const participantes:chekedType[] = useSelector((state:any)=>state.participantesReducer.participantes)
  
  const handleChangegols = (event: any, data:chekedType) => {
    let gol = event.target.value 
    let golsFilter = []
    if (gol.trim() === '') {
      golsFilter = gols.filter((e)=>{
        if ( !e.idParticipante.includes(data.participante.id)) {
          return e
        }
      })
      setgols(golsFilter)
      return null
    }
    golsFilter = gols.filter((e)=>{
      if ( !e.idParticipante.includes(data.participante.id)) {
        return e
      }
    })
    setgols([...golsFilter,{
      idParticipante:data.participante.id,
      premio:parseInt(gol || "")*golsPremio,
      dado:gol,
      participante:data.participante.nome,
      tipoDeDado:"gol"
    }])
  };


  const handleChangevitorias = (event: any, data:any) => {
    let vitoria = event.target.value 
    let vitoriasFilter = []
    if (vitoria.trim() === '') {
      vitoriasFilter = vitorias.filter((e)=>{
        if ( !e.idParticipante.includes(data.participante.id)) {
          return e
        }
      })
      setvitorias(vitoriasFilter)
      return null
    }
    vitoriasFilter = vitorias.filter((e)=>{
      if ( !e.idParticipante.includes(data.participante.id)) {
        return e
      }
    })
    setvitorias([...vitoriasFilter,{
      idParticipante:data.participante.id,
      premio:parseInt(vitoria || "")*vitoriasPremio,
      dado:vitoria,
      participante:data.participante.nome,
      tipoDeDado:"vitoria"
    }])
  };
  const handleChangeempates = (event: any, data:any) => {
    let empate = event.target.value 
    let empateFilter = []
    if (empate.trim() === '') {
      empateFilter = empates.filter((e)=>{
        if ( !e.idParticipante.includes(data.participante.id)) {
          return e
        }
      })
      setempates(empateFilter)
      return null
    }
    empateFilter = empates.filter((e)=>{
      if ( !e.idParticipante.includes(data.participante.id)) {
        return e
      }
    })
    setempates([...empateFilter,{
      idParticipante:data.participante.id,
      premio:parseInt(empate || "")*empatesPremio,
      dado:empate,
      participante:data.participante.nome,
      tipoDeDado:"empate"
    }])
  };

  const handleClickOpen = () => {
    dispatch({
      type:"dados",
      payload:{dados:[]}
    })
    setOpen(true);
  };

  const dispatch = useDispatch()
  const handleClose = () => {
    setOpen(false);
  };
  
  const adicionar = ()=>{
    dispatch({
      type:"dados",
      payload:{dados:{gols,vitorias,empates}}
    })
    handleClose()
  }
  const dialogStyle = {
    width:"400px",
    "@media (max-width:800px)":{
      width:"100%"
    }
  }
  const textFielStyle = {
    maxWidth:"30%",
    margin:"1%"
  }
  return (
    <div>
      <div onClick={handleClickOpen}>
        Dados do jogo
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{background:"",width:"100%"}}
      >
        <DialogTitle id="alert-dialog-title">
          Insira os dados do jogo
        </DialogTitle>
        <DialogContent className='modalColocacaoFormsContainer' >
          <DialogContentText id="alert-dialog-description" 
            sx={{width:"100%"}}>
             {participantes?.map((elem:any,key)=>{
                return <div>
                  <h4>{elem.participante.nome}</h4>
                  <div style={{display:"flex", justifyContent:"center"}}>
                    <TextField 
                      sx={textFielStyle}
                      label="gols"    
                      onChange={(e:any)=>handleChangegols(e, elem)}              
                    />
                    <TextField 
                    sx={textFielStyle}
                      label="vitórias"   
                      onChange={(e:any)=>handleChangevitorias(e, elem)}                  
                    />
                    <TextField
                    sx={textFielStyle} 
                      label="empates"      
                      onChange={(e:any)=>handleChangeempates(e, elem)}   
                    />
                  </div>
                </div>
              })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={adicionar}>Confirmar</Button>
          <Button color='error' onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
