import React,{useState,useEffect} from 'react'
import CardJogador from './cardJogador'
import { useSelector } from 'react-redux';
import { jogadoresType } from '../../types';
import Carregando from './carregando';
import { traduzirParaInglesArrayDePosicoes } from '../../metodosUteis';


type intervaloType = {
    intervalo:{
        inicial: number;
        final: number;
    }
}
export default function Lista({intervalo}:intervaloType) {
    var lista:jogadoresType[] = useSelector((state:any)=>state.campoDeBuscaReducer.lista) 
    const [posicao, setPosicao] = useState<string[]>([])
    const filtrada = posicao ? lista?.filter((l, key)=>{
      if (posicao.includes(l.posicao) || posicao.length === 0) {
        return l
      }
    }): lista

    const posicoesReducer = useSelector((state:any)=>state.posicaoSelectJogadorReducer.posicao)
    useEffect(()=>{
      setPosicao(traduzirParaInglesArrayDePosicoes(posicoesReducer))

    },[posicoesReducer])
    const focus = useSelector((state:any)=>state.inputFocusReducer.focus)
   
    return (
    <div className={`jogadores ${focus && "jogadoresFocus"}`}>
      {
        lista === null ?
        <Carregando/>:
        lista?.length === 0 ?
        <div className="jogadoresNaoEncontrado">Nenhum jogador encontrado!</div>:
        filtrada?.map((jogador, key)=>{
          if(key >= intervalo.inicial && key <= intervalo.final){
            return <CardJogador key={key} jogador={jogador}/>
          }
          return ""
        })
      }
  </div>
  )
}
