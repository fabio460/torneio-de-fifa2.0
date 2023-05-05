import React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Checkbox } from '@mui/material';
import { chekedType, participantesType } from '../types';
import ModalCriarTorneio from './modalCriarTorneio';
import ModalAdicionarParticipantes from './modalAdicionarParticipantes';
import SelectTorneio from './selectTorneio';
import { useDispatch } from 'react-redux';



export default function CardParticipantes({participantes}:{participantes:participantesType[] | undefined}) {
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
          <ModalCriarTorneio/>
        </Typography>
        {participantes?.map((elem, key)=>{
          return(
            <div key={key}>
              <Checkbox id={JSON.stringify(elem)} onChange={handleChange}/> {elem.nome}
            </div>
          )
        })}
      </CardContent>
      <div className='cardParticipantesBtnInferior'>
        <ModalAdicionarParticipantes/>
      </div>
    </Card>
  );
}
