import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { dadosDoJogoType, selecionadosType, usuarioLogadoType } from '../types';
import { pagarFolhasApi, pagarPremiacoesApi } from '../api/pagamentosApi';
import { adicionarEstatisticaApi } from '../api/estatisticasApi';
import CarregandoBtn from '../carregandoBtn';
import { torneioType } from '../types';
import ModalConfirmarPagamentoPremiacao from './modalConfirmarPagPrem';
import ModalConfirmaPagamentoFolha from './modalConfirPagFolha';




export default function CradPremiacoes({torneio,usuario}:{
  usuario:usuarioLogadoType | undefined,
  torneio:torneioType[] | undefined
}) {
  const colocacao:selecionadosType = useSelector((state:any)=>state.colocacaoReducer.colocacao)
  const artilheiros:any = useSelector((state:any)=>state.artilhariaReducer.artilheiros)
  const assistentes:any = useSelector((state:any)=>state.assisteciaReducer.assistentes)
  const dadosDoJogo:any = useSelector((state:any)=>state.golsEmpVitoriasReducer.dados)
  const [carregandoFolha, setCarregandoFolha] = useState(false)
  const torneioReducer = useSelector((state:any)=>state.torneioReducer.torneio)
  const participantes = useSelector((state:any)=>state.participantesReducer.participantes)

  return (
    <Card sx={{ minWidth: 275 }} >
      <CardContent  className='cardPremiacoesContainer'>
         <div className='cardPremiacoesBox'>
           <h2>Colocação</h2>
           <ul>
             {colocacao.primeiro && <li>Primeiro: {colocacao.primeiro.nome}</li> }
             {colocacao.segundo && <li>Segundo: {colocacao.segundo?.nome}</li> }
             {colocacao.terceiro && <li>Terceiro: {colocacao.terceiro?.nome}</li> }
             {colocacao.quarto && <li>Quarto: {colocacao.quarto?.nome}</li> }
           </ul> 
         </div>  
         <div className='cardPremiacoesBox'>
           <h2>Artiharia</h2>
           <ul>
           {artilheiros.primeiro?.length > 0 && <li>Primeiro:  
              {
                artilheiros.primeiro.map((e:any)=>{
                  return " "+e.nome + ", "
                })
              }
            </li> }
            {artilheiros.segundo?.length > 0 && <li>Segundo: 
              {
                artilheiros.segundo.map((e:any)=>{
                  return " "+e.nome + ", "
                })
              }
            </li> }
            {artilheiros.terceiro?.length > 0 && <li>Terceiro: 
              {
                artilheiros.terceiro.map((e:any)=>{
                  return " "+e.nome + ", "
                })
              }
            </li> }
            {artilheiros.quarto?.length > 0 && <li>Quarto: 
              {
                artilheiros.quarto.map((e:any)=>{
                  return " "+e.nome + ", "
                })
              }
            </li> }
           </ul> 
         </div>  
         <div className='cardPremiacoesBox'>
           <h2>Assisências</h2>
           <ul>
            {assistentes.primeiro?.length > 0 && <li>Primeiro:  
              {
                assistentes.primeiro.map((e:any)=>{
                  return " "+e.nome + ", "
                })
              }
            </li> }
            {assistentes.segundo?.length > 0 && <li>Segundo: 
              {
                assistentes.segundo.map((e:any)=>{
                  return " "+e.nome + ", "
                })
              }
            </li> }
            {assistentes.terceiro?.length > 0 && <li>Terceiro: 
              {
                assistentes.terceiro.map((e:any)=>{
                  return " "+e.nome + ", "
                })
              }
            </li> }
            {assistentes.quarto?.length > 0 && <li>Quarto: 
              {
                assistentes.quarto.map((e:any)=>{
                  return " "+e.nome + ", "
                })
              }
            </li> }
           </ul> 
         </div> 
         <div className='cardPremiacoesBox'>
           <h2>Dados da partida</h2>
           <ul>
             {dadosDoJogo.gols && <li>Gols: {dadosDoJogo.gols.map((e:any)=>{
              return <div>
                {e.participante} fez {e.dado}
              </div>
             })}</li> }
             {dadosDoJogo.empates && <li>Empate: {dadosDoJogo.empates.map((e:any)=>{
              return <div>
                {e.participante} empatou {e.dado} 
              </div>
             })}</li> }
             {dadosDoJogo.vitorias && <li>Vitórias: {dadosDoJogo.vitorias.map((e:any)=>{
              return <div>
                {e.participante} venceu {e.dado}
              </div>
             })}</li> }
           </ul> 
         </div> 
      </CardContent>
      <CardActions sx={{}}>
        <div className='btnPagamentos'>
            <ModalConfirmarPagamentoPremiacao
               usuario={usuario}
               icone={false}
            />
            <ModalConfirmaPagamentoFolha icone={false}/>
        </div>
      </CardActions>
    </Card>
  );
}
