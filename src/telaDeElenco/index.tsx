import React,{useEffect,useState} from 'react'
import { getParticipantesPorIdApi, listarParticipantesApi } from '../api/participantesApi'
import { participantesType } from '../types'
import Carregando from '../carregando'
import Reservas from './escalacoes/quatroUmDoisTres/reservas';
import QuatroUmDoisTres from './escalacoes/quatroUmDoisTres';
import "./telaDeElenco.css"
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import HeaderHelenco from './headerHelenco';
import { atualizarOuCriarPosicoesApi } from '../api/posicoes';
import OptCampoLista from './optCampLista';

export default function TelaDeElenco() {
  const idElenco = localStorage.getItem('idDoElenco') || ''
  const [elenco, setElenco] = useState<participantesType>()
  const [carregando, setCarregando] = useState(true)
 
  async function getElenco() {
    const e = await getParticipantesPorIdApi(idElenco)

    setCarregando(false)
    setElenco(e)
  }
  useEffect(()=>{
    getElenco()
  },[])
  const handlePosition =async (e:any, data:any)=>{
    const res =await atualizarOuCriarPosicoesApi(data.node.firstChild.id, data.lastX, data.lastY)
	}

    const getZerarPosicoes = ()=>{
		elenco?.jogadores.map((e, key)=>{
			localStorage.setItem(`${key}`,JSON.stringify({x: 0, y:0, id: key}))
		})
		window.location.reload()
	}
  const navigate = useNavigate()
  return (
    <div>
      {
        carregando?
        <div><Carregando/></div>:
        <div>
          <HeaderHelenco elenco={elenco}/>
          <div className='campinho'>
            <OptCampoLista elenco={elenco} handlePosition={handlePosition}/>
          
          </div>
        </div>
      }
    </div>
  )
}
