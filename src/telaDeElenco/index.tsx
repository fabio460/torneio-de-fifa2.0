import React,{useEffect,useState} from 'react'
import { getParticipantesPorIdApi } from '../api/participantesApi'
import { participantesType, torneioType, torneioTypeApi } from '../types'
import Carregando from '../carregando'
import "./telaDeElenco.css"
import HeaderHelenco from './headerHelenco';
import { atualizarOuCriarPosicoesApi } from '../api/posicoes';
import OptCampoLista from './optCampLista';
import { getTorneioPorIdApi } from '../api/torneioApi'
import { useDispatch, useSelector } from 'react-redux'
import SelectDarkMode from '../appBar/selectDarkMode'
import { getCampeonatoPorIdApi } from '../api/campeonatoApi'

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

  const [campeonato, setCampeonato] = React.useState<torneioTypeApi>()
  async function getCampeonato(id:string) {      
    const c = await getCampeonatoPorIdApi(id)
    setCampeonato(c)
  }
  
  getCampeonato(elenco?.idTorneio || "")

  if (!campeonato?.idTorneio) {        
    dispatch({
      type:"btnDisableCompraJogReducer",
      payload:{disable:false}
    })
  }else{
    dispatch({
      type:"btnDisableCompraJogReducer",
      payload:{disable:true}
    })
  }

  const handlePosition =async (e:any, data:any)=>{
    const res =await atualizarOuCriarPosicoesApi(data.node.firstChild.id, data.lastX, data.lastY)
	}
  const dark = useSelector((state:any)=>state.darkReducer.dark)
  const disable = useSelector((state:any)=>state.btnDisableCompraJogReducer.disable) 

  return (
    <div >
      {
        carregando?
        <div style={{minHeight:"100vh"}}><Carregando/></div>:
        <div>
          <HeaderHelenco elenco={elenco}/>
          <div className='campinho' style={{background:dark ?"black":""}}>
          <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
             <SelectDarkMode/>
          </div>  
             {disable && <h5 style={{color:"#e91e63",textAlign:"center"}}>Janela de transferência fechada!</h5>}
            <OptCampoLista elenco={elenco} handlePosition={handlePosition}/>
          </div>
        </div>
      }
    </div>
  )
}
