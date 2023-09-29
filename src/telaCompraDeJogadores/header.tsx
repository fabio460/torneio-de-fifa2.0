import React, { useEffect } from 'react'
import { campeonatoType, participantesType, torneioType, torneioTypeApi } from '../types'
import CampoDeBusca from './campoDeBusca'
import { useNavigate } from 'react-router-dom'
import { formatoMonetario, getDataTorneio, getHoraTorneio } from '../metodosUteis'
import SelectPosicao from './selectPosicao'
import { useDispatch, useSelector } from 'react-redux'
import { getCampeonatoPorIdApi } from '../api/campeonatoApi'

export default function Header({elenco, campeonato}:{elenco:participantesType | undefined, campeonato:torneioTypeApi | undefined}) {
    const n = useNavigate()
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [checked, setChecked] = React.useState(true);
    const dispatch = useDispatch()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };
    const pataTelaDeElenco = ()=>{
      dispatch({
        type:'posicao',
        payload:{posicao:[]}
      })
      n('/elenco')
    }

    const paraTelaPrincipal = ()=>{
      dispatch({
        type:'posicao',
        payload:{posicao:[]}
      })
      n('/')
    } 
    const focus = useSelector((state:any)=>state.inputFocusReducer.focus)


  return (
    <div className='compraDeJogadoresHeader'>
      {
        campeonato?.idTorneio &&
        <div style={{color:""}}>Existe um torneio em andamento iniciado em {getDataTorneio(campeonato.data)} as {getHoraTorneio(campeonato.data)}</div>
      }
      {campeonato?.idTorneio && <h5 style={{color:"#e91e63",textAlign:"center"}}>Janela de transferência fechada!</h5>}
      <h3 className={`compraDeJogadoresTitulo ${focus && "focusStyle"}`}>{elenco?.nome}</h3>
      <div style={{textAlign:'center'}} className={`${focus && "focusStyle"}`}>{elenco?.time}</div>
      <div className='compraDeJogadoresBody'>
        <div className={`${focus && "focusStyle"}`}>
          <div className='compraDeJogadoresBodyLeft'>
            <div onClick={paraTelaPrincipal} className='compraDeJogadoresItens'>Principal</div> 
            <div onClick={pataTelaDeElenco} className='compraDeJogadoresItens'>Elenco</div> 
            <div style={{marginLeft:"auto"}} className=''>Saldo {formatoMonetario(elenco?.saldo)}</div> 
          </div>
          <div>  
             <SelectPosicao/>
          </div>
        </div>
        <div className='compraDeJogadoresBodyRigth'>
          <CampoDeBusca/>
        </div>
      </div>
    </div>
  )
}
