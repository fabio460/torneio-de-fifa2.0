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
