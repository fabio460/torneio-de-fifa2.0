import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import { pagarFolhasApi } from '../../api/pagamentosApi';
import CarregandoBtn from '../../carregandoBtn';

export default function ModalConfirmaPagamentoFolha({icone}:{icone:boolean}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const participantes = useSelector((state:any)=>state.participantesReducer.participantes)
  const [carregandoFolha, setCarregandoFolha] = React.useState(false)
  const [carregandoPremio, setCarregandoPremio] = React.useState(false)
  const pagarFolha = async()=>{
    if (participantes.length === 0) {
      alert('Não há participantes selecionados!')
    }else{
      setCarregandoFolha(true)
      let pagadores:any = []
      participantes?.map((e:any)=>{
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
     width:"100%", ml:"20px",
    "@media (max-width:800px)":{
        width:"100%", ml:"0px",
        margin:"50px 0px"
    }
  }
  return (
    <div>
      {
      icone ? <div onClick={handleClickOpen}>
        PF
      </div>: 
       <Button color='secondary' 
            variant='contained' 
           onClick={handleClickOpen}
           sx={btnPagamentosStyle}
           disabled={participantes.length === 0 ? true : false}
        >Pagar folha</Button> 
      }   
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Pagamento de folha"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Ao confirmar voçê estará efetuando o pagamento da folha dos selecionados,
           Essa ação não poderá ser desfeita!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            {
             carregandoFolha ?
             <Button color='secondary'  variant='contained' ><CarregandoBtn/></Button>:
             <Button color='secondary'  variant='contained' onClick={pagarFolha}>Confirmar</Button>    
            }
          <Button onClick={handleClose} autoFocus color='error'  variant='outlined'>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
