import React, { HtmlHTMLAttributes, useState } from 'react'
import Cards from './Cards'
import "./campeonato2.css"
import { useSelector } from 'react-redux'
import { jogosType, participanteeducerType, participantesType, resultadoDaPartidaType } from '../../types'
import { Button, Checkbox } from '@mui/material'
import { gols } from '../../valoresDosPremios'

export default function CampeonatoFormato_2() {
  let [cards, setCards] =React.useState<participantesType[]>([])
  let participantes:participanteeducerType[] = useSelector((state:any)=>state.participantesReducer.participantes)
  let jogosJsonResponse = JSON.parse(localStorage.getItem("jogos") as string)
  const [jogos, setjogos] = React.useState<jogosType[]>(jogosJsonResponse?jogosJsonResponse:[])
  const [resultado, setResultado]= React.useState<resultadoDaPartidaType>()
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
    let responseJogos = aux.sort(()=>(Math.round(Math.random())-0.5))
    setjogos(responseJogos)
    localStorage.setItem("jogos",JSON.stringify(responseJogos))
  }
  const handleRodadas = (e:any)=>{
    if (e.target.checked) {
      setVoltas(2)
    }else{
      setVoltas(1)
    }
  }
  React.useEffect(()=>{
    if (resultado?.golCasa && resultado.golFora) {
      
      console.log(jogos)
    }
  },[resultado])
  let filter = jogos.filter(j=>{
    if  (
          j.casa?.participante.id === resultado?.golCasa?.participante.id &&
          j.fora?.participante.id === resultado.golFora?.participante.id
        ) {
      return Object.assign(j,{golsCasa:resultado.golCasa.gol, golsFora:resultado.golFora.gol})
    }
  })
  
  localStorage.setItem("jogos",JSON.stringify(jogos))
  const encerrarTorneio = ()=>{
    setjogos([])
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
            return <Cards key={key} jogo={jogo} partida={key+1} setResultado={setResultado}/>
          })
        }
      </div>
      
        <Button onClick={encerrarTorneio}>Encerrar</Button>
      
  </div>
)
}
