import React from 'react'
import { jogadoresType } from '../../../types'
export default function Carta({elem}:{elem:jogadoresType}) {
  const handleJogador = (e:any)=>{
    console.log(e)
  }
  return (
    <div  id={elem.id}>
      <div className='cartaContainer'>
        <img src={elem.imagemDoJogador} className='carta'/>
        <div className='cartaNome'>{elem.nome}</div>
      </div>
    </div>
  )
}
