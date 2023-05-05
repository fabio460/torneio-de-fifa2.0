import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selecionadosType } from '../types';




export default function CradPremiacoes() {
  const colocacao:selecionadosType = useSelector((state:any)=>state.colocacaoReducer.colocacao)
  const artilheiros:selecionadosType = useSelector((state:any)=>state.artilhariaReducer.artilheiros)
  const assistentes:selecionadosType = useSelector((state:any)=>state.assisteciaReducer.assistentes)
  const dadosDoJogo:selecionadosType = useSelector((state:any)=>state.golsEmpVitoriasReducer.dados)
  
  return (
    <Card sx={{ minWidth: 275 }} >
      <CardContent  className='cardPremiacoesContainer'>
         <div className='cardPremiacoesBox'>
           <h2>Colocação</h2>
           <ul>
             {colocacao.primeiro && <li>Primeiro: {colocacao.primeiro?.nome}</li> }
             {colocacao.segundo && <li>Segundo: {colocacao.segundo?.nome}</li> }
             {colocacao.terceiro && <li>Terceiro: {colocacao.terceiro?.nome}</li> }
             {colocacao.quarto && <li>Quarto: {colocacao.quarto?.nome}</li> }
           </ul> 
         </div>  
         <div className='cardPremiacoesBox'>
           <h2>Artiharia</h2>
           <ul>
             {artilheiros.primeiro && <li>Primeiro: {artilheiros.primeiro?.nome}</li> }
             {artilheiros.segundo && <li>Segundo: {artilheiros.segundo?.nome}</li> }
             {artilheiros.terceiro && <li>Terceiro: {artilheiros.terceiro?.nome}</li> }
             {artilheiros.quarto && <li>Quarto: {artilheiros.quarto?.nome}</li> }
           </ul> 
         </div>  
         <div className='cardPremiacoesBox'>
           <h2>Assisências</h2>
           <ul>
             {assistentes.primeiro && <li>Primeiro: {assistentes.primeiro?.nome}</li> }
             {assistentes.segundo && <li>Segundo: {assistentes.segundo?.nome}</li> }
             {assistentes.terceiro && <li>Terceiro: {assistentes.terceiro?.nome}</li> }
             {assistentes.quarto && <li>Quarto: {assistentes.quarto?.nome}</li> }
           </ul> 
         </div> 
         <div className='cardPremiacoesBox'>
           <h2>Dados da partida</h2>
           <ul>
             {dadosDoJogo.primeiro && <li>Primeiro: {dadosDoJogo.primeiro?.nome}</li> }
             {dadosDoJogo.segundo && <li>Segundo: {dadosDoJogo.segundo?.nome}</li> }
             {dadosDoJogo.terceiro && <li>Terceiro: {dadosDoJogo.terceiro?.nome}</li> }
             {dadosDoJogo.quarto && <li>Quarto: {dadosDoJogo.quarto?.nome}</li> }
           </ul> 
         </div> 
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
