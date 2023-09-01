import React from 'react'
import {jogadoresType} from "../../types"
import "./jogadores.css"
import { Button } from '@mui/material'
import { getPosicaoPrincipal } from './metodosUteis'
import ModalComprarJogador from '../modais/modalComprarJog'
import { formatoMonetario } from '../../metodosUteis'
import { colorDark, dark, darkBackgroundBox } from '../../temaDark'
import { useSelector } from 'react-redux'
type JogadorType = {
  jogador:jogadoresType
}
export default function CardJogador({jogador}:JogadorType) {
  const darkMode = useSelector((state:any)=>state.darkReducer.dark)

  return (
     <div className='jogadorCard' style={{background:darkMode ? darkBackgroundBox:'', color:darkMode?colorDark:"black"}}>
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
            <img src={jogador.imagemDoJogador} alt='sem imagem' style={{maxWidth:"125px"}}/>
          </div>
        </div>
        <div className='jogadorCardDireito'>
          <div>
            <div className='jogadorCardNome'>
              {jogador.nome}
            </div>
            <div className='jogadorCardPreco'>
              {formatoMonetario(parseFloat(jogador.valorDoJogador as string))}
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
