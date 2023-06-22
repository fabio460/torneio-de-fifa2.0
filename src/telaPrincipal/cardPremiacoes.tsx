import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selecionadosType, usuarioLogadoType } from '../types';
import { pagarFolhasApi, pagarPremiacoesApi } from '../api/pagamentosApi';
import { adicionarEstatisticaApi } from '../api/estatisticasApi';
import CarregandoBtn from '../carregandoBtn';
import { torneioType } from '../types';




export default function CradPremiacoes({torneio,usuario}:{
  usuario:usuarioLogadoType | undefined,
  torneio:torneioType[] | undefined
}) {
  const colocacao:selecionadosType = useSelector((state:any)=>state.colocacaoReducer.colocacao)
  const artilheiros:selecionadosType = useSelector((state:any)=>state.artilhariaReducer.artilheiros)
  const assistentes:selecionadosType = useSelector((state:any)=>state.assisteciaReducer.assistentes)
  const dadosDoJogo:any = useSelector((state:any)=>state.golsEmpVitoriasReducer.dados)
  const [carregandoPremio, setCarregandoPremio] = useState(false)
  const [carregandoFolha, setCarregandoFolha] = useState(false)
  const torneioReducer = useSelector((state:any)=>state.torneioReducer.torneio)

  const pagarPremiacao =async ()=>{
    //setCarregandoPremio(true)
    let premiados:any = []
    artilheiros.primeiro && premiados.push(artilheiros.primeiro)
    artilheiros.segundo && premiados.push(artilheiros.segundo)
    artilheiros.terceiro && premiados.push(artilheiros.terceiro)
    artilheiros.quarto && premiados.push(artilheiros.quarto)
    assistentes.primeiro && premiados.push(assistentes.primeiro)
    assistentes.segundo && premiados.push(assistentes.segundo)
    assistentes.terceiro && premiados.push(assistentes.terceiro)
    assistentes.quarto && premiados.push(assistentes.quarto)
    colocacao.primeiro && premiados.push(colocacao.primeiro.dadosDaApi)
    colocacao.segundo && premiados.push(colocacao.segundo.dadosDaApi)
    colocacao.terceiro && premiados.push(colocacao.terceiro.dadosDaApi)
    colocacao.quarto && premiados.push(colocacao.quarto.dadosDaApi)
    if (dadosDoJogo.gols) {
      premiados = [...premiados, ...dadosDoJogo.gols, ...dadosDoJogo.empates, ...dadosDoJogo.vitorias]
    }

     const res =await pagarPremiacoesApi(premiados)
     if (artilheiros.primeiro || assistentes.primeiro || colocacao.primeiro) {     
       const resSta = await adicionarEstatisticaApi(
        artilheiros.primeiro ? artilheiros.primeiro.nome: "",
        assistentes.primeiro ? assistentes.primeiro.nome: "",
        colocacao.primeiro ? colocacao.primeiro.nome: "",
        usuario?.torneio[torneioReducer].id || ''
        )
       alert(res)
       window.location.reload()
     }else{
      alert("Não há participantes selecionados!")
      setCarregandoPremio(false)
     }
  }

  const participantes = useSelector((state:any)=>state.participantesReducer.participantes)
  const pagarFolha = async()=>{
    if (participantes.length === 0) {
      alert('Não há participantes selecionados!')
    }else{
      setCarregandoFolha(true)
      let pagadores:any = []
      participantes.map((e:any)=>{
         pagadores.push({
          idParticipante:e.participante.id
         })
         return pagadores[0]
      })
      const res = await pagarFolhasApi(pagadores)
      if (res === "pagamento efetuada com sucesso!") {        
        setTimeout(() => {      
          alert(res.toString())
          setCarregandoFolha(false)
          window.location.reload()
        }, 5000);
      }else{
        alert("falha ao efetuar pagamento!")
         window.location.reload()
      }
    }
  }
  const btnPagamentosStyle ={
    marginRight:"10px",
    "@media (max-width:800px)":{
      marginRight:"0px",
    }
  }
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
        <div className='btnPagamentos'>
           {
             carregandoPremio ? 
             <Button sx={btnPagamentosStyle} color='success' size="small" variant='contained' ><CarregandoBtn /></Button>:
             <Button sx={btnPagamentosStyle} color='success' size="small" variant='contained' onClick={pagarPremiacao}>Pagar premiação</Button>
           }
           {
             carregandoFolha ?
             <Button color='secondary' size="small" variant='contained' ><CarregandoBtn/></Button>:
             <Button color='secondary' size="small" variant='contained' onClick={pagarFolha}>Pagar folha</Button>    
           }
          
        </div>
      </CardActions>
    </Card>
  );
}
