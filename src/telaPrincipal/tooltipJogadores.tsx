import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { jogadoresType } from '../types';
import { Avatar, Typography } from '@mui/material';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});

const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
  },
});


export default function ToolTipJogadores({jogadores}:{jogadores:jogadoresType[]}) {
  const longText = 
    <React.Fragment>
        <div className='toolTipJogadores'>
            {
              jogadores.map(e=>{
                return  <div style={{display:"flex", alignItems:"center", }}>
                    <Avatar src={e.imagemDoJogador} sx={{width:"30px", height:"30px"}}/> <span style={{fontSize:"12px"}}>{e.nome}</span>
                  </div>
              })
            }
        </div>
    </React.Fragment>
  
  return (
    <div>
      <Tooltip title={longText} >
        <div style={{marginLeft:"3px"}}> {jogadores.length} jogador{jogadores.length > 1 && "es"}</div>
      </Tooltip>
    </div>
  );
}
