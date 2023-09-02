import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from 'react-bootstrap';
import { checkedType, jogadoresType, participantesType } from '../../types';
import { removerJogadoresApi } from '../../api/jogadoresApi';
import CarregandoBtn from '../../carregandoBtn';
import { calculaFolha, calculaFolhaSemFormato, formatoMonetario } from '../../metodosUteis';
import ModalDispensaConfirmada from './modalDispensaConfirmada';

export default function ModalDespensarJogador({listaDeSelecionados, elenco}:{
    listaDeSelecionados:checkedType[] | undefined,
    elenco:participantesType | undefined
    }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false)
  const [confir, setConfir] = React.useState(false)
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

    const res = await removerJogadoresApi(listaDeIds, saldoAtualizado, elenco?.id)
    setConfir(true)
    setOpen(false)
    setLoading(false)
  }

  const getTotal = ()=>{
    return listaDeSelecionados?.reduce((acc, item)=>{
      return acc + parseFloat(item.jogador.valorDoJogador || '')*(
        parseInt(item.jogador.overall) < 90 ? 0.4 : 0.6
      )
  },0) || 0
  }

  const folhaApois = ()=>{
      const valorElenco = calculaFolhaSemFormato(elenco?.jogadores as jogadoresType[])
      const valorDosSelecionados = calculaFolhaSemFormato(listaDeSelecionados?.map(e=>e.jogador) as jogadoresType[]) 
      return valorElenco - valorDosSelecionados
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
          {"Dispensa de jogadores"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              listaDeSelecionados?.length === 1 ?
                <div>1 jogador selecionado</div>
              :
                <div>{listaDeSelecionados?.length} jogadores selecionados</div>
            }
            <ul>              
              {
                listaDeSelecionados?.map((jog, key)=>{
                    return <li>
                        <div>       
                          {jog.jogador.nome} - você receberá <span style={{color:""}}>
                              {formatoMonetario(parseFloat(jog.jogador.valorDoJogador || "")*(
                                  parseInt(jog.jogador.overall) < 90 ? 0.4 : 0.6
                              ))}
                            </span> 

                           {
                            parseInt(jog.jogador.overall) < 90 ? <span> (40% do seu valor)</span>:<span> (60% do seu valor)</span>
                          }!
                           
                        </div>
                    </li>
                })
              }
            </ul>
            <div>
              Total a receber <span style={{color:"#4caf50"}}>{formatoMonetario(getTotal())}</span> 
            </div>
            <div>
              sua folha ira reduzir de <span style={{color:""}}> {calculaFolha(elenco?.jogadores as jogadoresType[])}</span> para <span style={{color:"#1976d2"}}> {formatoMonetario(folhaApois())}</span>
            </div>
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
      <ModalDispensaConfirmada confir={confir} listaDeSelecionados={listaDeSelecionados}/>
    </div>
  );
}
