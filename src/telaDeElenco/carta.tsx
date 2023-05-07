import React from 'react'
import { jogadoresType } from '../types'
import { getPosicaoPrincipal, traduzirPosicao } from '../telaCompraDeJogadores/Jogadores/metodosUteis'
export default function Carta({elem}:{elem:jogadoresType}) {
  const handleJogador = (e:any)=>{
    
  }
  return (
    <div  id={elem.id}>
      <div className='cartaContainer'>
        <div className='carta'>
           <div className='cartaBody'>
             <div className='overall'>{elem.overall}</div>
             <div className='posicao'>{getPosicaoPrincipal(elem.posicao)}</div>
             <img className='imgPais' src={elem.imagemDaNacionalidade} />
             <img  className='imgTime' src={elem.escudoDoTime} />
           </div>
           <img src={elem.imagemDoJogador} className='cartaImg'/>
        </div>
        <div className='cartaNome'>{elem.nome}</div>
      </div>
    </div>
  )
}
