import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from 'react-bootstrap';
import { checkedType, participantesType } from '../../types';
import { removerJogadoresApi } from '../../api/jogadoresApi';
import CarregandoBtn from '../../carregandoBtn';
import { formatoMonetario } from '../../metodosUteis';

export default function ModalDespensarJogador({listaDeSelecionados, elenco}:{
    listaDeSelecionados:checkedType[] | undefined,
    elenco:participantesType | undefined
    }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const despensar = async()=>{
    setLoading(true)
    let listaDeIds:any = listaDeSelecionados?.map((sel)=>{
       return sel.jogador.id
    })
    let somaDosValores = listaDeSelecionados?.reduce((acc, item)=>{
        return acc + parseFloat(item.jogador.valorDoJogador || '')*(
          parseInt(item.jogador.overall) < 90 ? 0.4 : 0.6
        )
    },0) || 0
    const saldo = elenco?.saldo || 0
    const saldoAtualizado = somaDosValores + saldo
    console.log(saldoAtualizado)
    const res = await removerJogadoresApi(listaDeIds, saldoAtualizado, elenco?.id)
    window.location.reload()
    setLoading(false)
  }
  return (
    <div>
      <Button style={{background:"red"}} onClick={handleClickOpen}>
        Despensar
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Voçê esta prestes a remover seu jogador"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
                listaDeSelecionados?.map((jog, key)=>{
                    return <div>
                        <div>
                          {jog.jogador.nome}
                        </div>
                        <div>
                          Você recebera {formatoMonetario(parseFloat(jog.jogador.valorDoJogador || "")*(
                            parseInt(jog.jogador.overall) < 90 ? 0.4 : 0.6
                          ))} por este jogador
                        </div>
                    </div>
                })
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            loading?
            <Button  style={{paddingBottom:"0px",background:"green",width:"90px"}}>
            <CarregandoBtn/>
          </Button>:
            <Button onClick={despensar} style={{background:"green", color:"white"}}>Confirmar</Button>
          }
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}