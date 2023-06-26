import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { pagarPremiacoesApi } from '../api/pagamentosApi';
import { selecionadosType, usuarioLogadoType } from '../types';
import { useSelector } from 'react-redux';
import { adicionarEstatisticaApi } from '../api/estatisticasApi';
import CarregandoBtn from '../carregandoBtn';
import { assistencia, quartoAssistencia, terceiroAssistencia, viceAssistencia } from '../valoresDosPremios';

export default function ModalConfirmarPagamentoPremiacao({usuario, icone}:{
   usuario:usuarioLogadoType | undefined,
   icone:boolean
  }) {
  const [open, setOpen] = React.useState(false);
  const [carregandoPremio, setCarregandoPremio] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const colocacao:selecionadosType = useSelector((state:any)=>state.colocacaoReducer.colocacao)
  const artilheiros:any = useSelector((state:any)=>state.artilhariaReducer.artilheiros)
  const assistentes:any = useSelector((state:any)=>state.assisteciaReducer.assistentes)
  const dadosDoJogo:any = useSelector((state:any)=>state.golsEmpVitoriasReducer.dados)
  const torneioReducer = useSelector((state:any)=>state.torneioReducer.torneio)
  const pagarPremiacao =async ()=>{
    setCarregandoPremio(true)
    let premiados:any = []
    
    assistentes.primeiro?.map((e:any)=>{
      premiados.push({
        idParticipante:e.idParticipante,
        nome:e.nome,
        premio:assistencia
      })
    })
    assistentes.segundo?.map((e:any)=>{
      premiados.push({
        idParticipante:e.idParticipante,
        nome:e.nome,
        premio:viceAssistencia
      })
    })
    assistentes.terceiro?.map((e:any)=>{
      premiados.push({
        idParticipante:e.idParticipante,
        nome:e.nome,
        premio:terceiroAssistencia
      })
    })
    assistentes.quarto?.map((e:any)=>{
      premiados.push({
        idParticipante:e.idParticipante,
        nome:e.nome,
        premio:quartoAssistencia
      })
    })

    artilheiros.primeiro?.map((e:any)=>{
      premiados.push({
        idParticipante:e.idParticipante,
        nome:e.nome,
        premio:assistencia
      })
    })
    artilheiros.segundo?.map((e:any)=>{
      premiados.push({
        idParticipante:e.idParticipante,
        nome:e.nome,
        premio:viceAssistencia
      })
    })
    artilheiros.terceiro?.map((e:any)=>{
      premiados.push({
        idParticipante:e.idParticipante,
        nome:e.nome,
        premio:terceiroAssistencia
      })
    })
    artilheiros.quarto?.map((e:any)=>{
      premiados.push({
        idParticipante:e.idParticipante,
        nome:e.nome,
        premio:quartoAssistencia
      })
    })

    colocacao.primeiro && premiados.push(colocacao.primeiro.dadosDaApi)
    colocacao.segundo && premiados.push(colocacao.segundo.dadosDaApi)
    colocacao.terceiro && premiados.push(colocacao.terceiro.dadosDaApi)
    colocacao.quarto && premiados.push(colocacao.quarto.dadosDaApi)
    if (dadosDoJogo.gols || dadosDoJogo.empates || dadosDoJogo.vitorias) {
      premiados = [...premiados, ...dadosDoJogo.gols, ...dadosDoJogo.empates, ...dadosDoJogo.vitorias]
    }
    
    if (premiados.length === 0) {
       alert("Não há dados selecionados!")
       setCarregandoPremio(false)
       return null 
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

  const btnPagamentosStyle ={
    marginRight:"10px",
    width:"100%",
    "@media (max-width:800px)":{
      marginRight:"0px",
    }
  }
  const participantes = useSelector((state:any)=>state.participantesReducer.participantes)
  return (
    <div>
     {
      icone ? <div onClick={handleClickOpen}>
        pp
      </div>:
        <Button 
           sx={btnPagamentosStyle} 
           color='success' size="small" variant='contained'
           onClick={handleClickOpen}
           disabled={participantes.length === 0 ? true : false}
        >Pagar premiação</Button>
      }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Pagamento das premiações"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voçê esta prestes a fazer o pagamento das premiações dos participantes selecionados,
            clique em confirmar, lembrando que esta ação não poderá ser revertida!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            {
             carregandoPremio ? 
             <Button  color='success' size="small" variant='contained' ><CarregandoBtn /></Button>:
             <Button  color='success' size="small" variant='contained' onClick={pagarPremiacao}>confirmar</Button>
            }
          <Button onClick={handleClose} autoFocus color='error' size="small" variant='outlined' >
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}