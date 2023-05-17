import React,{useState, useEffect} from 'react'
import {listaDeJogadores} from "../../listaDeJogadoresCompleta"
import Paginacao from './paginacao'
import { manipularPaginacao } from './metodosUteis'
import CampoDeBusca from './campoDeBusca'
import { useSelector } from 'react-redux';
import { jogadoresType } from '../../types';
import Lista from './lista'
import {useDispatch} from 'react-redux'
import { getTorneioPorIdApi } from '../../api/torneioApi'
import { listaJogadoresPorTorneioApi } from '../../api/jogadoresApi'
export default function Jogadores() {
  const [pagina, setPagina] = useState(1)
  const [itensPorPagina] = useState(16)
  const dispatch = useDispatch()
  let intervalo = manipularPaginacao(pagina, itensPorPagina)
  var lista:jogadoresType[] = useSelector((state:any)=>state.campoDeBuscaReducer.lista) 
  let tamanhoDaLista = lista?.length
  const [listaFiltrada, setListaFiltrada] = useState<jogadoresType[]>([])
  const [Verify, setVerify] = useState(false)
  const idDoTorneio = localStorage.getItem('idDoTorneio') || ''
  useEffect(() => {
    if (itensPorPagina > tamanhoDaLista) {
      setPagina(1)
    }
  }, [lista, itensPorPagina, tamanhoDaLista])


  const getJogadoresDoTorneio = async()=>{
   const torneio = await listaJogadoresPorTorneioApi(idDoTorneio)
   if(torneio){
     const nomeDosJog =await torneio?.map((e:jogadoresType)=>{
       return e.nome
     })
     let listaFiltrada = listaDeJogadores?.filter((l:jogadoresType, key)=>{
       if (!nomeDosJog.includes(l.nome)) {
          return l
       }
     })
     setListaFiltrada(listaFiltrada)
   }
  }
  useEffect(()=>{
    getJogadoresDoTorneio()
  },[])

  useEffect(()=>{
    dispatch({
      type:'busca',
      payload:{lista:listaFiltrada}
    })
    if (listaFiltrada.length === 0) {
      setVerify(!Verify)
    }
  },[Verify])
  
  return (
    <div className='jogadoresContainer'>
      <Lista intervalo={intervalo}/>
      <Paginacao 
        setPagina={setPagina} 
        pagina={pagina} 
        itensPorPagina={itensPorPagina}
        tamanhoDaLista = {listaDeJogadores.length}
        />
    </div>
  )
}