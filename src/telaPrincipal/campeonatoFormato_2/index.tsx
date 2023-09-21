import React, { HtmlHTMLAttributes, useState } from 'react'
import Cards from './Cards'
import "./campeonato2.css"
import { useDispatch, useSelector } from 'react-redux'
import { campeonatoType, jogosType, participanteeducerType, participantesType, resultadoDaPartidaType, tabelaCampeonatoType } from '../../types'
import { Button, Checkbox } from '@mui/material'
import { campeao, gols, quartoColocado, terceiroColocado, viceCampeao } from '../../valoresDosPremios'
import { criarCampeonatoApi, deletarCampeonatoApi, listarCampeonatoApi, listarTabelaApi } from '../../api/campeonatoApi'
import Carregando from '../../carregando'
import { calculoDasPremiacoesDaTabela } from './funcoesDoComponentes'
import { pagarPremiacoesApi } from '../../api/pagamentosApi'

export default function CampeonatoFormato_2() {
  let [carregando, setCarregando] =React.useState<boolean>(false)
  let participantes:participanteeducerType[] = useSelector((state:any)=>state.participantesReducer.participantes)
  
  const [campeonato, setCampeonato] = useState<campeonatoType>()
  const atualizarDados = useSelector((state:any)=>state.atualizarDadosReducer.status)
  const dispatch = useDispatch()
  const [voltas, setVoltas] =useState(1)
  let listaDeParticipantes = participantes
  let times = listaDeParticipantes.map(elem=>{
    return {
      id: elem.participante.id,
      nome: elem.participante.nome,
      emblemaDoTime: elem.participante.emblemaDoTime,
      idTorneio: elem.participante.idTorneio,
      jogadores: elem.participante.jogadores,
      saldo: elem.participante.saldo,
      time: elem.participante.time,
      torneio: elem.participante.torneio,
      gols:0
    }
  })

  const comecar =async()=>{
    setCarregando(true)
    const r =await criarCampeonatoApi(times, voltas)
    
    setTimeout(() => {
      dispatch({
        type:"atualizarDados",
        payload:{status:!atualizarDados}
      })
      window.location.reload()
    }, 1000);
  }
  const handleRodadas = (e:any)=>{
    if (e.target.checked) {
      setVoltas(2)
    }else{
      setVoltas(1)
    }
  }
  async function listarCampeonato() {
    setCarregando(true)
    const camp = await listarCampeonatoApi()
    const ultimoCampeonato = camp[camp.length -1]
    setCampeonato(ultimoCampeonato)
    setCarregando(false)
    return camp
  }
  React.useEffect(()=>{
    listarCampeonato()
  },[atualizarDados])

  const encerrarTorneio = async()=>{
    setCarregando(true)
    const tabela:tabelaCampeonatoType[] = await listarTabelaApi()
    const premiados = await calculoDasPremiacoesDaTabela(tabela)
    pagarPremiacoesApi(premiados)

    const idDoCampeonato = campeonato && campeonato.id
    deletarCampeonatoApi(idDoCampeonato)
    setTimeout(() => {
      dispatch({
        type:"atualizarDados",
        payload:{status:!atualizarDados}
      })
      setCarregando(false)
      window.location.reload()
    }, 4000);
  }
return (
  <div style={{textAlign:"center"}}>
      <Button variant='contained' onClick={comecar}>Iniciar torneio</Button>
      <div style={{display:"flex", alignItems:"center"}}>
        <Checkbox onChange={handleRodadas}/>
        <span>Ida e volta</span>
      </div>
      <div className='cardList'>
        { 
          carregando ? <div style={{display:'flex', width:"100%", justifyContent:"center", alignItems:"center"}}>
            <Carregando size='120px'/>
          </div>
          :
          campeonato && campeonato?.rodada?.map((rodada, key)=>{
             return <Cards key={key} rodada={rodada} partida={key+1} idDoCampeonato={campeonato.id}/>
          })
        }
      </div>
      
        <Button onClick={encerrarTorneio}>Encerrar</Button>
      
  </div>
)
}
