import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, ExtendButtonBase, IconButtonTypeMap } from '@mui/material';
import CarregandoBtn from './carregandoBtn';

type propType = {
    action:any,
    titulo:string,
    mensagem:string,
    textoBtn:string,
    textoBtnConfirmar?:string,
    textoBtnCancelar?:string,
    variant?:'contained' | 'outlined' | 'text',
    variantConfirmar?:'contained' | 'outlined' | 'text',
    varianteCancelar?:'contained' | 'outlined' | 'text',
    carregando?:boolean,
    setCarregando?:any,
    checked?:any,
    setCheked?:any,
    checkBox?:boolean,
    textCheckBox?:string,
    corBtnPrincipal?:'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    corBtnConfirmar?:'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    corBtnCancelar?:'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' ,

}
export default function ModalConfirmacoes({action, titulo, mensagem,textoBtn, corBtnPrincipal, corBtnConfirmar, corBtnCancelar, variantConfirmar, varianteCancelar,textoBtnConfirmar="confirmar", textoBtnCancelar="cancelar", variant, carregando, setCarregando, checkBox=false, checked, textCheckBox, setCheked}:propType) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAction = ()=>{
    if (setCarregando) {   
      setCarregando(true)
    }
    action()
    handleClose()
  }
  const handleChecked = ()=>{
    setState(!state)
  }
  React.useEffect(()=>{
     if (state) {
      setCheked && setCheked(2)
     }else{
      setCheked && setCheked(1)
     }
  },[state])
  return (
    <div style={{width:"100%"}}>
      <Button variant={variant} color={corBtnPrincipal} sx={{width:"100%"}} onClick={handleClickOpen}>
         {
           carregando?
           <CarregandoBtn/>:
           textoBtn
         }
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {titulo}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {mensagem}
            <div>
              {
                checkBox &&
                <Checkbox 
                   onChange={handleChecked}
                />
              }
              {textCheckBox}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            carregando ?
            <Button variant={variantConfirmar} color={corBtnConfirmar} onClick={handleAction}><CarregandoBtn/></Button>
            :
            <Button color={corBtnConfirmar} variant={variantConfirmar} onClick={handleAction}>{textoBtnConfirmar}</Button>

          }
          <Button onClick={handleClose} variant={varianteCancelar} color={corBtnCancelar} autoFocus>
            {textoBtnCancelar}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
