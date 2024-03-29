import React from 'react'
import Draggable from 'react-draggable'
import Carta from '../../carta'

export default 	 function Zaga({handlePosition, jogadores}) {
  return (<div className='zaga'>
   {
     jogadores.map((elem, key)=>{
       return (key >= 8 && key <= 9) && <div style={{display:"flex"}}>
         <Draggable   
          defaultPosition={{
            x:elem?.posicaoNoCampinho[0] ? elem?.posicaoNoCampinho[0]?.x : 0,
            y:elem?.posicaoNoCampinho[0] ? elem?.posicaoNoCampinho[0]?.y : 0
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
