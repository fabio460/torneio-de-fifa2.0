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
  const idDoTorneio = localStorage.getItem('idDoTorneio') || ''
  useEffect(() => {
    if (itensPorPagina > tamanhoDaLista) {
      setPagina(1)
    }
  }, [lista, itensPorPagina, tamanhoDaLista])
  const getJogadoresDoTorneio = async(list:any)=>{
    const torneio = await listaJogadoresPorTorneioApi(idDoTorneio)
    const nomeDosJog = torneio.map((e:jogadoresType)=>{
      return e.nome
    })
     var listaAux:any = []
    list.map((l:jogadoresType)=>{
      return nomeDosJog.map((n:string, key:number)=>{
        if ((l.nome.split(' ')[0]+l.nome.split(' ')[1]) === n) {
          listaAux.push(l)   
        }
      })
    })
    
    setListaFiltrada(listaAux)
  }
  getJogadoresDoTorneio(listaDeJogadores)
  useEffect(()=>{
    dispatch({
      type:'busca',
      payload:{lista:listaDeJogadores}
    })
  },[])
  
  return (
    <div className='jogadoresContainer'>

      <CampoDeBusca/>
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
