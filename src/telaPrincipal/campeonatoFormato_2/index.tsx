import React, { HtmlHTMLAttributes, useState } from 'react'
import Cards from './Cards'
import "./campeonato2.css"
import { useSelector } from 'react-redux'
import { participantesType } from '../../types'
import { Button, Checkbox } from '@mui/material'
type participanteeducerType ={
  participante:participantesType,
  selecionado:boolean
}
type jogosType = {casa:participanteeducerType, fora:participanteeducerType}
export default function CampeonatoFormato_2() {
  let [cards, setCards] =React.useState<participantesType[]>([])
  let participantes:participanteeducerType[] = useSelector((state:any)=>state.participantesReducer.participantes)
  const [jogos, setjogos] = React.useState<jogosType[]>([])
  
  const tam = participantes.length
  const [voltas, setVoltas] =useState(1)

  const comecar = ()=>{
    let aux = []
    for (let i = 0; i < tam - 1; i++) {
      for (let j = 1; j < tam ; j++) {
        if (participantes[j+i]) {          
          aux.push({
            casa:participantes[i],
            fora: participantes[i+j]
          })
        }
    
      }
    }
    if (voltas === 2) {
      for (let i = 0; i < tam - 1; i++) {
        for (let j = 1; j < tam ; j++) {
          if (participantes[j+i]) {          
            aux.push({
              casa:participantes[i],
              fora: participantes[i+j]
            })
          }
      
        }
      }
    }
    setjogos(aux.sort(()=>(Math.round(Math.random())-0.5)))
  }
  const handleRodadas = (e:any)=>{
    if (e.target.checked) {
      setVoltas(2)
    }else{
      setVoltas(1)
    }
  }
return (
  <div style={{textAlign:"center"}}>
      <Button variant='contained' onClick={comecar}>Iniciar torneio</Button>
      <div style={{display:"flex", alignItems:"center"}}>
        <Checkbox onChange={handleRodadas}/>
        <span>Ida e volta</span>
      </div>
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
