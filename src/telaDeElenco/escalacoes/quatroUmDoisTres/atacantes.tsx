import React,{useState,useEffect} from 'react'
import Draggable from 'react-draggable'
import Carta from './carta'
import { jogadoresType, posicaoNoCampinhoType } from '../../../types'
import { getPosicoesPorIdApi, listarPosicoesApi } from '../../../api/posicoes'
import { IconButton, ListItemIcon } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
export default  function Atacantes({handlePosition, jogadores}:{handlePosition:any, jogadores:any}) {
  
    return (
       <div className='atacantesContainer'>
         <div className='atacantes'>
         {
             jogadores?.map((elem:any, key:number)=>{
                 return key === 0 && <div style={{display:"flex"}}>
                    <Draggable
                        defaultPosition={{
                            x:elem.posicaoNoCampinho[0] ? elem.posicaoNoCampinho[0]?.x : 0,
                            y:elem.posicaoNoCampinho[0] ? elem.posicaoNoCampinho[0]?.y : 0
                        }}
                        onStop={handlePosition}
                        
                    >
                        <div key={key}  className='cartas' >
                            <Carta elem={elem}/>     			
                        </div>
                    </Draggable> 
                </div>
             })
         }
         </div>
       </div>
     )
 }
