import React,{useState,useEffect} from 'react'
import CardJogador from './cardJogador'
import { useSelector } from 'react-redux';
import { jogadoresType } from '../../types';
import Carregando from './carregando';

type intervaloType = {
    intervalo:{
        inicial: number;
        final: number;
    }
}
export default function Lista({intervalo}:intervaloType) {
    var lista:jogadoresType[] = useSelector((state:any)=>state.campoDeBuscaReducer.lista) 
    const [posicao, setPosicao] = useState(["GK", "CM"])
    const filtrada = posicao ? lista?.filter((l, key)=>{

      if ( posicao.includes(l.posicao)) {
        return l
      }
    }): lista
    
    return (
    <div className='jogadores'>
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
