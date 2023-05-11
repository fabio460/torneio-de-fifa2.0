import React from 'react'
import { participantesType } from '../types'
import CampoDeBusca from './Jogadores/campoDeBusca'
import { useNavigate } from 'react-router-dom'
import { formatoMonetario } from '../metodosUteis'
import FormGroup from '@mui/material/FormGroup';
import { pink, lightBlue } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SelectPosicao from './selectPosicao'
import { useDispatch } from 'react-redux'
export default function Header({elenco}:{elenco:participantesType | undefined}) {
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
  return (
    <div className='compraDeJogadoresHeader'>
      <h3 className='compraDeJogadoresTitulo'>{elenco?.nome}</h3>
      <div className='compraDeJogadoresBody'>
        <div>
          <div className='compraDeJogadoresBodyLeft'>
            <div onClick={paraTelaPrincipal} className='compraDeJogadoresItens'>Home</div> 
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
