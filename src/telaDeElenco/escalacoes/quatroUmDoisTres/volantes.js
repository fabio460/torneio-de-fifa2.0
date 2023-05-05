import React from 'react'
import Draggable from 'react-draggable'
import Carta from './carta'

export default 	 function Volantes({handlePosition, jogadores}) {
  return (<div className='volantes'>
   {
     jogadores.map((elem, key)=>{
       return (key === 5) && <div style={{display:"flex"}}>
         <Draggable       
          defaultPosition={{
            x:elem.posicaoNoCampinho[0] ? elem.posicaoNoCampinho[0]?.x : 0,
            y:elem.posicaoNoCampinho[0] ? elem.posicaoNoCampinho[0]?.y : 0
          }}
           onStop={handlePosition}
         >
           <div id={key}  className='cartas'>
             <Carta elem={elem}/>
           </div>
         </Draggable>         			
       </div>
     })
   }
   </div>)
 }
