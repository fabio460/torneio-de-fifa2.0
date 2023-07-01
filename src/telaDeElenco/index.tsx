import React,{useEffect,useState} from 'react'
import { getParticipantesPorIdApi } from '../api/participantesApi'
import { participantesType } from '../types'
import Carregando from '../carregando'
import "./telaDeElenco.css"
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
