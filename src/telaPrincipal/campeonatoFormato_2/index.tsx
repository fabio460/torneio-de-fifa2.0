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
import ModalConfirmacoes from './modais/modalConfirmacao'

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
  const torneioAtual = useSelector((state:any)=>state.torneioReducer.torneio)
  let usuarioReducer = useSelector((state:any)=>state.usuarioReducer.usuario)
  let idTorneio = usuarioReducer.torneio[torneioAtual].id


  const iniciarCompeticao =()=>{
    if (times.length > 2) {      
      setCarregando(true)
      criarCampeonatoApi(times, voltas, idTorneio)
      
      setTimeout(() => {
        dispatch({
          type:"atualizarDados",
          payload:{status:!atualizarDados}
        })
        window.location.reload()
      }, 6000);
    }else{
      alert("Não é possível criar um torneio com menos de 3 participantes!")
    }
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
    const camp = await listarCampeonatoApi(idTorneio) || []
    setCampeonato(camp)
    setCarregando(false)
    return camp
  }
    
  React.useEffect(()=>{
    listarCampeonato()
  },[atualizarDados, idTorneio])

  const encerrarTorneio = async()=>{
    setCarregando(true)
    const tabela:tabelaCampeonatoType[] = await listarTabelaApi(idTorneio)
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
    }, 6000);
  }
  const cancelarCompetição = ()=>{
    setCarregando(true)
    const idDoCampeonato = campeonato && campeonato.id
    deletarCampeonatoApi(idDoCampeonato)
    setTimeout(() => {
      dispatch({
        type:"atualizarDados",
        payload:{status:!atualizarDados}
      })
      setCarregando(false)
      window.location.reload()
    }, 1000);
  }
  let torneioEncerrado = campeonato?.rodada?.every(r=>r.statusDaRodada==="fechado")
  let camp:any = campeonato || []

  return (
    <div className='campeonato2Container'>
        <div >
          {
            (camp.length === 0) && <Button variant='contained' onClick={iniciarCompeticao}>Iniciar torneio</Button>
          }
          {
            (camp.length === 0) &&
            <div style={{display:"flex", alignItems:"center"}}>
              <Checkbox onChange={handleRodadas}/>
              <span>Ida e volta</span>
            </div>

          }
          <div 
          >
              { 
                carregando ? <div style={{display:'flex', width:"100%", justifyContent:"center", alignItems:"center"}}>
                  <Carregando size='120px'/>
                </div>
                :
                <div className='cardList'>
                  {  
                    campeonato && campeonato?.rodada?.map((rodada, key)=>{
                      return <Cards key={key} rodada={rodada} partida={key+1} idDoCampeonato={campeonato.id}/>
                    })
                  }
                </div>
              }
          </div>

        </div>
        <div className='btnActionsTipo2'>
          <div>
            {torneioEncerrado && 
              <ModalConfirmacoes 
                action={cancelarCompetição}
                titulo='Cuidado!' mensagem='Ao confirmar voçê estará apagando todos os resultados das partidas, esta ação não poderá ser desfeita!'
                textoBtn='cancelar'   
              />
            }
          </div>
          <div style={{display:"flex"}}>
            <div>            
              {(campeonato?.id && torneioEncerrado === false) && 
                <ModalConfirmacoes 
                  action={cancelarCompetição}
                  titulo='Cuidado!' mensagem='Ao confirmar voçê estará apagando todos os resultados das partidas, esta ação não poderá ser desfeita!'
                  textoBtn='cancelar'   
                />              }
            </div>
            <div style={{marginLeft:"10px"}}>
              {(campeonato?.id && torneioEncerrado ) && 
                
                <ModalConfirmacoes 
                action={encerrarTorneio}
                titulo='Deseja finalizar o torneio?' mensagem='Ao confirmar, voçê fará o pagamento das premiações, tem certeza que deseja finalizar?'
                textoBtn='finalizar competição'   
              />
              }
            </div>
          </div>
        </div>
    </div>
  )
}
