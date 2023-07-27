import React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Checkbox } from '@mui/material';
import { chekedType, participantesType, timesType, torneioType } from '../../types';
import ModalCriarTorneio from '../modais/modalCriarTorneio';
import ModalAdicionarParticipantes from '../modais/modalAdicionarParticipantes';
import SelectTorneio from '../selectTorneio';
import { useDispatch, useSelector } from 'react-redux';
import ModalDeletarTorneio from '../modais/modalDeletarTorneio';
import ModalAtualizarTorneio from '../modais/modalAtualizarTorneio';
import { getTimes } from '../../metodosUteis';
import ListaDeParticipantes from '../listaParticipantes';

export default function CardParticipantes({participantes, torneio}:
  {
    participantes:participantesType[] | undefined,
    torneio:torneioType[] | undefined
  }) {
  const [checked, setChecked] = useState<any>()
  const [listaDeParticipantes, setListaDeParticipantes] = useState<any>([])
  const dispatch = useDispatch()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, data:boolean) => {
    setChecked({
      participante:JSON.parse(event.target.id), 
      selecionado:data
    })
  };
  
  function getSelecionados(checked:chekedType) {
    if (checked?.selecionado) {
      setListaDeParticipantes([...listaDeParticipantes, checked])
    }else{
      let selecionados = listaDeParticipantes.filter((e:chekedType)=>{
        if (checked.participante.id !== e.participante.id) {
          return e
        }
      })
      setListaDeParticipantes(selecionados) 
    }
  }
  useEffect(()=>{
    getSelecionados(checked)
  },[checked])
  

  dispatch({
    type:'participantes',
    payload:{participantes:listaDeParticipantes}
  })

  return (
    <Card sx={{ minWidth: 275, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
      <CardContent sx={{padding:'3%'}}>
        <Typography variant="h5" component="div" className='cardParticipantesBtns'>
          <SelectTorneio/>
        </Typography>
        <ListaDeParticipantes listaDeParticipantes={participantes} handleChange={handleChange}/>
      </CardContent>
      <div className='cardParticipantesBtnInferior'>
        <h3>Ação do torneio</h3>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:10}}>
          <ModalCriarTorneio/>
          <ModalDeletarTorneio torneio={torneio}/>
          <ModalAtualizarTorneio torneio={torneio}/>
        </div>
        <ModalAdicionarParticipantes/>
      </div>
    </Card>
  );
}
