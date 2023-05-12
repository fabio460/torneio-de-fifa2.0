import React from 'react'
import Atacantes from './atacantes'
import Pontas from './pontas'
import Meias from './meias'
import Volantes from './volantes'
import Laterais from './laterais'
import Zaga from './zaga'
import Goleiro from './goleiros'
import { jogadoresType } from '../../../types'

export default function QuatroUmDoisTres({handlePosition, jogadores}:{handlePosition:any, jogadores:jogadoresType[] | undefined}) {
  
  const ATA = jogadores?.find(e=>{
    if (e.posicao === 'ST') {
      return e
    }
  })
  const PE = jogadores?.find(e=>{
    if (e.posicao === 'LW') {
      return e
    }
  })
  const ME = jogadores?.find(e=>{
    if (e.posicao === 'LM') {
      return e
    }
  })
  const MD = jogadores?.find(e=>{
    if (e.posicao === 'RM') {
      return e
    }
  })
  const PD = jogadores?.find(e=>{
    if (e.posicao === 'RW') {
      return e
    }
  })
  const MEI = jogadores?.find(e=>{
    if (e.posicao === 'CAM' || e.posicao === 'CM') {
      return e
    }
  })
  const MEI2 = jogadores?.reverse()?.find(e=>{
    if (e.posicao === 'CAM' || e.posicao === 'CM') {
      return e
    }
  })
  const VOL = jogadores?.find(e=>{
    if (e.posicao === 'CDM') {
      return e
    }
  })
  const LE = jogadores?.find(e=>{
    if (e.posicao === 'LB') {
      return e
    }
  })
  const LD = jogadores?.find(e=>{
    if (e.posicao === 'RB') {
      return e
    }
  })

  const ZAG = jogadores?.find(e=>{
    if (e.posicao === 'CB') {
      return e
    }
  })
  const ZAG2 = jogadores?.reverse()?.find(e=>{
    if (e.posicao === 'CB') {
      return e
    }
  })
  const GOL = jogadores?.find(e=>{
    if (e.posicao === 'GK') {
      return e
    }
  })
  
  let escalacao:any = []
  escalacao.push(GOL)
  escalacao.push(ZAG)
  escalacao.push(ZAG2)
  escalacao.push(LD)
  escalacao.push(LE)
  escalacao.push(VOL)
  escalacao.push(MEI)
  escalacao.push(MEI2)
  escalacao.push(PD)
  
  escalacao.push(PE)
  if (PE?.id) {
  }else{
    escalacao.push(ME)
  }
  escalacao.push(ATA)
  jogadores?.map((j, key)=>{
    if (!escalacao.includes(j)) {
      escalacao.push(j)
    }
  })
  

  console.log(escalacao.reverse())
  jogadores = escalacao
  return (
    <div className='containerDeEscalacao'>
        <Atacantes handlePosition={handlePosition} jogadores={jogadores}/>
        <Pontas handlePosition={handlePosition} jogadores={jogadores}/>
        <Meias handlePosition={handlePosition} jogadores={jogadores}/>
        <Volantes handlePosition={handlePosition} jogadores={jogadores}/>
        <Laterais handlePosition={handlePosition} jogadores={jogadores}/>
        <Zaga handlePosition={handlePosition} jogadores={jogadores}/>
        <Goleiro handlePosition={handlePosition} jogadores={jogadores}/>
    </div>
  )
}
