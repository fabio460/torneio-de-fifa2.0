import React from 'react'
import { jogadoresType } from '../types'
import { getPosicaoPrincipal, traduzirPosicao } from '../telaCompraDeJogadores/Jogadores/metodosUteis'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { traduzirParaInglesArrayDePosicoes } from '../metodosUteis';
export default function Carta({elem}:{elem:jogadoresType}) {
  const handleJogador = (e:any)=>{
    
  }
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));
const arrayDePosicoesSecundarias = (pos:string)=>{
  let posicoes = "";
  let arrayPos = pos?.split(",")
  arrayPos?.map((e, key)=>{
    if (key > 0) {   
      posicoes+=traduzirPosicao(e)+" ";
    }
  })
  return posicoes;
}
  
  return (
    <div  id={elem?.id}>
      <HtmlTooltip
        title={
          arrayDePosicoesSecundarias(elem?.posicao) !== "" &&
              <React.Fragment>
               <span>Outras posições {arrayDePosicoesSecundarias(elem?.posicao)}</span> 
              </React.Fragment>
             
        }
      >
        
        <div className='cartaContainer'>
          <div className='carta'>
            <div className='cartaBody'>
              <div className='overall'>{elem?.overall}</div>
              <div className='posicao'>{getPosicaoPrincipal(elem?.posicao)}</div>
              <img className='imgPais' src={elem?.imagemDaNacionalidade} />
              <img  className='imgTime' src={elem?.escudoDoTime} />
            </div>
            <img src={elem?.imagemDoJogador} className='cartaImg'/>
          </div>
          <div className='cartaNome'>{elem?.nome}</div>
        </div>
      </HtmlTooltip>
    </div>
  )
}
