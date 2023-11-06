import React,{useEffect, useState} from 'react'
import { criarCampeonatoApi, deletarCampeonatoApi, listarCampeonatoApi, listarTabelaApi } from '../../api/campeonatoApi';
import { campeonatoType, participanteeducerType, resultadoType, tabelaCampeonatoType, tabelaType, usuarioLogadoType } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material'
import ModalConfirmaPagamentoFolha from '../modais/modalConfirPagFolha';
import ModalConfirmacoes from '../../modalConfirmacao';
import { calculoDasPremiacoesDaTabela } from './funcoesDoComponentes';
import { pagarPremiacoesApi } from '../../api/pagamentosApi';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TabelaPremios from './tabelaPremios';
import { criarTabela } from '../../api/tabelaResultadosApi';

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
    const [resultados, setResultados] = useState<resultadoType[]>([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (premiados:any) => {
      criarTabela(premiados)
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      window.location.reload()
    };

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
      '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
      },
      '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
      },
    }));

    let idTorneio = usuarioReducer.torneio[torneioAtual]?.id
    let listaDeParticipantes = participantes
    let times = listaDeParticipantes.map(elem=>{
      return {
        id: elem.participante?.id,
        nome: elem.participante.nome,
        emblemaDoTime: elem.participante.emblemaDoTime,
        idTorneio: elem.participante?.idTorneio,
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
          criarCampeonatoApi(times, voltas, idTorneio, dispatch, atualizarDados, setCarregando)
        }else{
          alert("Não é possível criar um torneio com menos de 3 participantes!")
        }
      }  
      
    const finalizarTorneio = async()=>{
      setcarregandoPagamento(true)
      dispatch({
          type:"carregandoTorneio",
          payload:{carregando:true, nome:"pagarPremio"}
      })
      const tabela:any = await listarTabelaApi(idTorneio)
      if (tabela.length === 0) {
        alert("Não há um torneio aberto para finalizar")
        window.location.reload()
      }
      const premiados:any = await calculoDasPremiacoesDaTabela(tabela,campeonato?.data)
      handleClickOpen(premiados)
      setResultados(premiados)
      pagarPremiacoesApi(premiados)
      const idDoCampeonato = campeonato && campeonato?.id
      deletarCampeonatoApi(idDoCampeonato)
      setCarregando(false)
    }

    const cancelarCompetição = ()=>{
      setCarregando(true)
      const idDoCampeonato = campeonato && campeonato?.id
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
              !carregando &&
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
                              action={finalizarTorneio}
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
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              <TabelaPremios resultados={resultados}/>
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
    
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Confirmar
              </Button>
            </DialogActions>
          </BootstrapDialog>
      </div>
    )
}
