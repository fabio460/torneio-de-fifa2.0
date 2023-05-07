import React from 'react'
import { participantesType } from '../types'
import CampoDeBusca from './Jogadores/campoDeBusca'
import { useNavigate } from 'react-router-dom'
import { formatoMonetario } from '../metodosUteis'

export default function Header({elenco}:{elenco:participantesType | undefined}) {
    const n = useNavigate()
  return (
    <div className='compraDeJogadoresHeader'>
      <h3 className='compraDeJogadoresTitulo'>{elenco?.nome}</h3>
      <div className='compraDeJogadoresBody'>
        <div className='compraDeJogadoresBodyLeft'>
          <div onClick={()=>n('/')} className='compraDeJogadoresItens'>Home</div> 
          <div onClick={()=>n('/elenco')} className='compraDeJogadoresItens'>Elenco</div> 
          <div style={{marginLeft:"auto"}} className=''>Saldo {formatoMonetario(elenco?.saldo)}</div> 
        </div>
        <div className='compraDeJogadoresBodyRigth'>
          <CampoDeBusca/>
        </div>
      </div>
    </div>
  )
}
