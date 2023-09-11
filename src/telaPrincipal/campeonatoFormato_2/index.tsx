import React from 'react'
import Cards from './Cards'
import "./campeonato2.css"
import { useSelector } from 'react-redux'
import { participantesType } from '../../types'
import { Button } from '@mui/material'
type participanteeducerType ={
  participante:participantesType,
  selecionado:boolean
}
type jogosType = {casa:participanteeducerType, fora:participanteeducerType}
export default function CampeonatoFormato_2() {
  let [cards, setCards] =React.useState<participantesType[]>([])
  let participantes:participanteeducerType[] = useSelector((state:any)=>state.participantesReducer.participantes)
  const [jogos, setjogos] = React.useState<jogosType[]>([])
  
  function embaralharArray() {
    return (Math.round(Math.random())-1);
  }
  const comecar = ()=>{
    let aux = []
    for (let i = 0; i < participantes.length - 1; i++) {
      for (let j = 1; j < participantes.length ; j++) {
        if (participantes[j+i]) {          
          aux.push({
            casa:participantes[i],
            fora: participantes[i+j]
          })
        }
    
      }
    }
    setjogos(aux.sort(embaralharArray))
  }

return (
  <div style={{textAlign:"center"}}>
      <Button variant='contained' onClick={comecar}>Iniciar torneio</Button>
      <div className='cardList'>
        {
          jogos.map((jogo, key)=>{
            return <Cards key={key} jogo={jogo} partida={key+1}/>
          })
        }
      </div>
  </div>
)
}
