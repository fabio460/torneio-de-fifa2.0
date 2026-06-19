import React, { useEffect, useState } from 'react'
import {jogadoresType} from "../../types"
import "./jogadores.css"
import { Button, Tooltip } from '@mui/material'
import { getPosicaoPrincipal } from './metodosUteis'
import ModalComprarJogador from '../modais/modalComprarJog'
import { formatoMonetario, traduzirParaPortugues } from '../../metodosUteis'
import { colorDark, dark, darkBackgroundBox } from '../../temaDark'
import { useSelector } from 'react-redux'
type JogadorType = {
  jogador:jogadoresType
}
export default function CardJogador({jogador}:JogadorType) {
  const darkMode = useSelector((state:any)=>state.darkReducer.dark)
  const [nacionalidadeTraduzida, setNacionalidadeTraduzida] = useState<string>("Carregando...");

  useEffect(() => {
  async function carregarTraducao() {
    if (jogador.nacionalidade) {
      const res = await traduzirParaPortugues(jogador.nacionalidade);
      setNacionalidadeTraduzida(res);
    }
   }
   carregarTraducao();
  }, [jogador.nacionalidade]);

  return (
     <div className='jogadorCard' style={{background:darkMode ? darkBackgroundBox:'', color:darkMode?colorDark:"black"}}>
        <div className='jogadorCardEsquerdo'>
          <div>
            <div className='jogadorCardOverall'>{jogador.overall}</div>
            <div className='jogadorCardPosicao'>{getPosicaoPrincipal(jogador.posicao)}</div>
            <div className='emblemas'>
              <Tooltip title={<div>
                <div style={{fontSize:"16px"}}>{jogador.time}</div>
                <div>{jogador.liga}</div>
              </div>}>
                <img className='imgEmblemaDoTime' src={jogador.escudoDoTime} alt="?" />
              </Tooltip>
              <Tooltip title={nacionalidadeTraduzida}>
                <img className='imgNascionaldade' src={jogador.imagemDaNacionalidade} alt="sem imagem" />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className='jogadorCardMeio'>
          <div>
            <img 
              src={jogador.imagemDoJogador} 
              alt='Jogador' 
              style={{ maxWidth: "100px" }}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.onerror = null; 
                target.src = "https://cdn.sofifa.net/player_0.png"
              }}
            />

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
