import React,{useEffect,useState} from 'react'
import { getParticipantesPorIdApi } from '../api/participantesApi'
import { participantesType, torneioType } from '../types'
import Carregando from '../carregando'
import "./telaDeElenco.css"
import HeaderHelenco from './headerHelenco';
import { atualizarOuCriarPosicoesApi } from '../api/posicoes';
import OptCampoLista from './optCampLista';
import { getTorneioPorIdApi } from '../api/torneioApi'
import { useDispatch, useSelector } from 'react-redux'

export default function TelaDeElenco() {
  const idElenco = localStorage.getItem('idDoElenco') || ''
  const [elenco, setElenco] = useState<participantesType>()
  const [carregando, setCarregando] = useState(true)
  const dispatch = useDispatch()
  async function getElenco() {
    const e = await getParticipantesPorIdApi(idElenco)
    setCarregando(false)
    setElenco(e)
  }
  useEffect(()=>{
    getElenco()
  },[])

  async function getTorneio() {
    const torneio:torneioType = await getTorneioPorIdApi(localStorage.getItem('idDoTorneio') as string)
    dispatch({
      type:"torneioAtual",
      payload:{
        torneio
      }
    })
 }

 useEffect(() => {
    getTorneio()
 }, [])
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
