import React from 'react'
import {jogadoresType} from "../../types"
import "./jogadores.css"
import { Button } from '@mui/material'
import { getPosicaoPrincipal } from './metodosUteis'
import { formatoMonetario } from '../metodosUteisGerais'
import ModalComprarJogador from '../modalComprarJog'
type JogadorType = {
  jogador:jogadoresType
}
export default function CardJogador({jogador}:JogadorType) {

  return (
     <div className='jogadorCard'>
        <div className='jogadorCardEsquerdo'>
          <div>
            <div className='jogadorCardOverall'>{jogador.overall}</div>
            <div className='jogadorCardPosicao'>{getPosicaoPrincipal(jogador.posicao)}</div>
            <div className='emblemas'>
              <div><img className='imgEmblemaDoTime' src={jogador.escudoDoTime} alt="sem imagem" /></div>
              <div><img className='imgNascionaldade' src={jogador.imagemDaNacionalidade} alt="sem imagem" /></div>
            </div>
          </div>
        </div>
        <div className='jogadorCardMeio'>
          <div>
            <img src={jogador.imagemDoJogador} alt='sem imagem'/>
          </div>
        </div>
        <div className='jogadorCardDireito'>
          <div>
            <div className='jogadorCardNome'>
              {jogador.nome}
            </div>
            <div className='jogadorCardPreco'>
              {formatoMonetario(jogador.valorDoJogador)}
            </div>
          </div>
          <div className='jogadorCardBtn'>
            <div>
              <ModalComprarJogador jogador={jogador}/>
              <a style={{marginTop:"5px"}} href={jogador.linkSoFifa}>Jogador no fifa</a>
            </div>
          </div>
        </div>
 
     </div>
  )
}
