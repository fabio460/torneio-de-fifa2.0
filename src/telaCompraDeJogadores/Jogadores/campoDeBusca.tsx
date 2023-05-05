import React,{useState} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { jogadoresType } from '../../types';
import {listaDeJogadores} from "../../listaDeJogadoresCompleta"
import {useDispatch, useSelector} from 'react-redux'
export default function CampoDeBusca() {
  const [lista, setLista] = useState<jogadoresType[]>([])
  var listaReducer:jogadoresType[] = useSelector((state:any)=>state.campoDeBuscaReducer.lista) 
  let tamanhoDaLista = listaReducer?.length
  const dispatch = useDispatch()
  const getLista = (event:any)=>{
    let l:jogadoresType[] = listaDeJogadores.filter((item:jogadoresType, key:number)=>{
        if (item.nome.toLowerCase().includes(event.target.value.toLowerCase().trim())) {
          return item
        }
        return null
     })
     setLista(l)
  }
  
  const buscar = ()=>{
    if(lista.length === 0){
      dispatch({
        type:'busca',
        payload:{lista:[]}
      })   
    }else{
      dispatch({
        type:'busca',
        payload:{lista}
      })
    }
  }
  

  const onKey = (e:any)=>{
    if(e.code === "Enter"){
      buscar()
    }
  }
  const paperStyle = { 
    p: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 450,
    "@media (max-width:1100px)":{
      width: "95vw",
    }
  }
  return (
    <div className='jogadoresCampoDeBusca'>
      <div>
        <Paper
          sx={paperStyle}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Busque o jogador ..."
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={getLista}
            onKeyUp={onKey}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon onClick={buscar}/>
          </IconButton>

        </Paper>
        <div className="jogadoresCampoDeBuscaQuantidadeDeJog">{tamanhoDaLista} jogador{tamanhoDaLista === 1 ? "":"es"} encontrado{tamanhoDaLista === 1 ? "":"s"}</div>
      </div>
    </div>
  );
}
