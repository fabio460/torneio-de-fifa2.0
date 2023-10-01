import React from 'react'
import { criarCampeonatoApi, deletarCampeonatoApi, listarCampeonatoApi, listarTabelaApi } from '../../api/campeonatoApi';
import { campeonatoType, participanteeducerType, tabelaCampeonatoType, usuarioLogadoType } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox } from '@mui/material'
import ModalConfirmaPagamentoFolha from '../modais/modalConfirPagFolha';
import ModalConfirmacoes from '../../modalConfirmacao';
import CarregandoBtn from '../../carregandoBtn';
import ModalConfirmarPagamentoPremiacao from '../modais/modalConfirmarPagPrem';
import { calculoDasPremiacoesDaTabela } from './funcoesDoComponentes';
import { pagarPremiacoesApi } from '../../api/pagamentosApi';

export default function BtnActions({usuario}:{usuario:usuarioLogadoType | undefined}) {
    const dispatch = useDispatch()
    let [carregando, setCarregando] =React.useState<boolean>(false)
    const [campeonato, setCampeonato] = React.useState<campeonatoType>()

    let participantes:participanteeducerType[] = useSelector((state:any)=>state.participantesReducer.participantes)
    const [carregandoTorneio, setcarregandoTorneio] = React.useState<boolean>(false)
    const [voltas, setVoltas] =React.useState(1)
    const atualizarDados = useSelector((state:any)=>state.atualizarDadosReducer.status)
    const torneioAtual = useSelector((state:any)=>state.torneioReducer.torneio)
    let usuarioReducer = useSelector((state:any)=>state.usuarioReducer.usuario)
    const [carregandoPagaento, setcarregandoPagamento] = React.useState<boolean>(false)

    let idTorneio = usuarioReducer.torneio[torneioAtual].id
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

    async function listarCampeonato() {
        setCarregando(true)
        const camp = await listarCampeonatoApi(idTorneio) || []
        setCampeonato(camp)
        dispatch({
          type:"dataDoCampeonato",
          payload:{data:camp.data ? camp.data : null}
        })
        setCarregando(false)
      }
        
      React.useEffect(()=>{
        listarCampeonato()
      },[atualizarDados, idTorneio])

    const iniciarCompeticao =()=>{
        if (times.length > 2) {      
            dispatch({
                type:"carregandoTorneio",
                payload:{carregando:true, nome:"criarTorneio"}
            })
          criarCampeonatoApi(times, voltas, idTorneio)

          
          setTimeout(() => {
            dispatch({
              type:"atualizarDados",
              payload:{status:!atualizarDados}
            })
            window.location.reload()
          
          }, 9000);
        }else{
          alert("Não é possível criar um torneio com menos de 3 participantes!")
        }
      }  

      const encerrarTorneio = async()=>{
        setcarregandoPagamento(true)
        dispatch({
            type:"carregandoTorneio",
            payload:{carregando:true, nome:"pagarPremio"}
        })
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
        }, 9000);
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
    let campeonatoArray:any = campeonato || []  
    let torneioEncerrado = campeonato?.rodada?.every(r=>r.statusDaRodada==="fechado")

  return (
    <div className='BtnsCardCampeonato2'>
        {
            (campeonatoArray.length === 0 && !carregandoTorneio) && 
            <div className='BtnIniciarTorneio'>
                    <ModalConfirmacoes
                        carregando={ carregando} 
                        setCarregando={times.length > 2 ? setCarregando : false}
                        action={iniciarCompeticao}
                        titulo='Criar torneio'
                        mensagem='Ao confirmar o torneio sera criado, caso não crie é so atualizar e se houver algum erro ou se vir incompleto e só cancelar e criar novamente!'
                        textoBtn='criar torneio'
                        corBtnPrincipal='success'
                        variant='contained'  
                        corBtnConfirmar='success'
                        variantConfirmar='contained'
                        varianteCancelar='outlined'
                        corBtnCancelar='error'
                        checkBox={true}
                        setCheked={setVoltas}
                        
                        textCheckBox='ida e volta'
                    />
            </div>
        }
        {
            campeonatoArray.length === 0 ?
            <div className='BtnPagarFolha'>
              <ModalConfirmaPagamentoFolha icone={false} tipo='1'/>
            </div>:
            <div className='BtnsCardCampeonato2'>
                <div className='BtnIniciarTorneio'>
                    <ModalConfirmacoes
                        setCarregando={setCarregando}
                        carregando={carregando} 
                        action={cancelarCompetição}
                        titulo='Cuidado!' mensagem='Ao confirmar voçê estará apagando todos os resultados das partidas, esta ação não poderá ser desfeita!'
                        textoBtn='cancelar'
                        corBtnPrincipal='warning'
                        variant='outlined'  
                        corBtnConfirmar='warning'
                        variantConfirmar='contained'
                        varianteCancelar='outlined'
                        corBtnCancelar='error'
                    />
                </div>
                <div className='BtnFinalizarTorneio'>
                    {
                        torneioEncerrado &&
                        <ModalConfirmacoes
                            setCarregando={setCarregando}
                            carregando={carregando} 
                            action={encerrarTorneio}
                            titulo='Deseja finalizar o torneio?' mensagem='Ao confirmar, voçê fará o pagamento das premiações, tem certeza que deseja finalizar?'
                            textoBtn='finalizar'
                            variant='outlined'
                            corBtnConfirmar='error'
                            corBtnPrincipal='error'   
                            corBtnCancelar='success'
                            variantConfirmar='contained'
                            varianteCancelar='outlined'
                        />
                    }
                </div>
            </div>
        }
    </div>
  )
}
