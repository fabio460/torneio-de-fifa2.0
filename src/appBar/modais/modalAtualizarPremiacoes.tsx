import React,{useState} from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { atualizarPremiacoesApi, listarPremiacoesApi } from '../../api/premiacoesApi';

export default function ModalAtualizarPremiacoes() {
  const [open, setOpen] = useState(false);
  const [Campeao, setCampeao] = useState(0)
  const [ViceCampeao, setViceCampeao] = useState(0)
  const [TerceiroColocado, setTerceiroColocado] = useState(0)
  const [QuartoColocado, setQuartoColocado] = useState(0)
  const [Artileiro, setArtileiro] = useState(0)
  const [ViceArtilheiro, setViceArtilheiro] = useState(0)
  const [TerceiroArtilheiro, setTerceiroArtilheiro] = useState(0)
  const [QuartoArtilheiro, setQuartoArtilheiro] = useState(0)
  const [Vitorias, setVitorias] = useState(0)
  const [Empates, setEmpates] = useState(0)
  const [DefezaMenosVazada, setDefezaMenosVazada] = useState(0)
  const [DefezaSegundaMenosVazada, setDefezaSegundaMenosVazada] = useState(0)
  const [DefezaTerceiroMenosVazada, setDefezaTerceiroMenosVazada] = useState(0)
  const [DefezaQuartaMenosVazada, setDefezaQuartaMenosVazada] = useState(0)
  const [Gols, setGols] = useState(0)
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };
  async function getPremiacoes() {
      const res = await listarPremiacoesApi()
      setCampeao(res[0].campeao)
      setViceCampeao(res[0].viceCampeao)
      setTerceiroColocado(res[0].terceiroColocado)
      setQuartoColocado(res[0].quartoColocado)
      setArtileiro(res[0].artilheiro)
      setViceArtilheiro(res[0].viceArtilheiro)
      setTerceiroArtilheiro(res[0].terceiroArtilheiro)
      setQuartoArtilheiro(res[0].quartoAtilheiro)
      setDefezaMenosVazada(res[0].defezaMenosVazada)
      setDefezaSegundaMenosVazada(res[0].defezaSegundaMenosVazada)
      setDefezaTerceiroMenosVazada(res[0].defezaTerceiraMenosVazada)
      setDefezaQuartaMenosVazada(res[0].defezaQuartaMenosVazada)
      setGols(res[0].gols)
      setEmpates(res[0].empates)
      setVitorias(res[0].vitoria)
  }
  const confirmar = ()=>{

    atualizarPremiacoesApi(
      "663c276245ac7db30e01ce27",
      Campeao,
      ViceCampeao,
      TerceiroColocado,
      QuartoColocado,
      Artileiro,
      ViceArtilheiro,
      TerceiroArtilheiro,
      QuartoArtilheiro,
      DefezaMenosVazada,
      DefezaSegundaMenosVazada,
      DefezaTerceiroMenosVazada,
      DefezaQuartaMenosVazada,
      Empates,
      Vitorias,
      Gols
    )
    getPremiacoes()
    handleClose()
  }

  const cancelar = ()=>{
    getPremiacoes()
    handleClose()
  }

  const dialogStyle = {
    minWidth:"600px",
    "@media (max-width:800px)":{
      minWidth:"80vw"
    }
  }


  const handleCampeao = (e:any)=>{
    setCampeao(parseFloat(e.target.value))
  }
  const handleViceCampeao = (e:any)=>{
    setViceCampeao(parseFloat(e.target.value))
  }
  const handleTerceiroColocado = (e:any)=>{
    setTerceiroColocado(parseFloat(e.target.value))
  }
  const handleQuartoColocado = (e:any)=>{
    setQuartoColocado(parseFloat(e.target.value))
  }
  const handleArtilheiro = (e:any)=>{
    setArtileiro(parseFloat(e.target.value))
  }
  const handleViceArtilheiro = (e:any)=>{
    setViceArtilheiro(parseFloat(e.target.value))
  }
  const handleTerceiroArtilheiro = (e:any)=>{
    setTerceiroArtilheiro(parseFloat(e.target.value))
  }
  const handleQuartoArtilheiro = (e:any)=>{
    setQuartoArtilheiro(parseFloat(e.target.value))
  }
  const handleDefezaMenosVazada = (e:any)=>{
    setDefezaMenosVazada(parseFloat(e.target.value))
  }
  const handleDefezaSegundaMenosVazada = (e:any)=>{
    setDefezaSegundaMenosVazada(parseFloat(e.target.value))
  }
  const handleDefezaTerceiraMenosVazada = (e:any)=>{
    setDefezaTerceiroMenosVazada(parseFloat(e.target.value))
  }
  const handleDefezaQuartaMenosVazada = (e:any)=>{
    setDefezaQuartaMenosVazada(parseFloat(e.target.value))
  }
  const handleVitorias = (e:any)=>{
    setVitorias(parseFloat(e.target.value))
  }
  const handleEmpates = (e:any)=>{
    setEmpates(parseFloat(e.target.value))
  }
  const handleGols = (e:any)=>{
    setGols(parseFloat(e.target.value))
  }

  React.useEffect(()=>{
    getPremiacoes()
  },[])
  return (
    <div>
      <div onClick={handleClickOpen}>
        Atualizar premiações
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{background:"",width:"100%"}}
      >
        <DialogTitle id="alert-dialog-title">
          Atualizar Premiações
        </DialogTitle>
        <DialogContent className='modalColocacaoFormsContainer' sx={dialogStyle} >
          <DialogContentText id="alert-dialog-description"  >            
              <TextField 
                 fullWidth
                 size='small'
                 label="Campeão"
                 sx={{marginTop:1}}
                 onChange={(e)=> handleCampeao(e)}
                 defaultValue={Campeao}
              />
              <TextField 
                 fullWidth
                 size='small'
                 label="Vice-campeão"
                 sx={{marginTop:1}}
                 onChange={(e)=> handleViceCampeao(e)}
                 defaultValue={ViceCampeao}
              />
              <TextField 
                 fullWidth
                 size='small'
                 label="Terceiro-colocado"
                 sx={{marginTop:1}}
                 onChange={(e)=> handleTerceiroColocado(e)}
                 defaultValue={TerceiroColocado}
              />
              <TextField 
                 fullWidth
                 size='small'
                 label="Quarto-colocado"
                 sx={{marginTop:1}}
                 onChange={(e)=> handleQuartoColocado(e)}
                 defaultValue={QuartoColocado}
              />
              <TextField 
                 fullWidth
                 size='small'
                 label="Artilheiro"
                 sx={{marginTop:1}}
                 onChange={(e)=> handleArtilheiro(e)}
                 defaultValue={Artileiro}
              />
              <TextField 
                 fullWidth
                 size='small'
                 label="Vice Artilheiro"
                 sx={{marginTop:1}}
                 onChange={(e)=> handleViceArtilheiro(e)}
                 defaultValue={ViceArtilheiro}
              />
              <TextField 
                 fullWidth
                 size='small'
                 label="Terceiro Artilheiro"
                 sx={{marginTop:1}}
                 onChange={(e)=> handleTerceiroArtilheiro(e)}
                 defaultValue={TerceiroArtilheiro}
              />
              <TextField 
                 fullWidth
                 size='small'
                 label="Quarto Artilheiro"
                 sx={{marginTop:1}}
                 onChange={(e)=> handleQuartoArtilheiro(e)}
                 defaultValue={QuartoArtilheiro}
              />
              <TextField 
                 fullWidth
                 size='small'
                 label="Defeza menos vazada"
                 sx={{marginTop:1}}
                 onChange={(e)=> handleDefezaMenosVazada(e)}
                 defaultValue={DefezaMenosVazada}
              />
              <TextField  
                 fullWidth
                 size='small'
                 label="Defeza segunda menos vazada"
                 sx={{marginTop:1}}
                 onChange={(e)=> handleDefezaSegundaMenosVazada(e)}
                 defaultValue={DefezaSegundaMenosVazada}
              />
              <TextField 
                 fullWidth
                 size='small'
                 label="Defeza terceira menos vazada"
                 sx={{marginTop:1}}
                 onChange={(e)=> handleDefezaTerceiraMenosVazada(e)}
                 defaultValue={DefezaTerceiroMenosVazada}
              />
              <TextField 
                 fullWidth
                 size='small'
                 label="Defeza quarta menos vazada"
                 sx={{marginTop:1}}
                 onChange={(e)=> handleDefezaQuartaMenosVazada(e)}
                 defaultValue={DefezaQuartaMenosVazada}
              />
              <TextField 
                 fullWidth
                 size='small'
                 label="Vitorias"
                 sx={{marginTop:1}}
                 onChange={(e)=> handleVitorias(e)}
                 defaultValue={Vitorias}
              />
              <TextField 
                 fullWidth
                 size='small'
                 label="Empates"
                 sx={{marginTop:1}}
                 onChange={(e)=> handleEmpates(e)}
                 defaultValue={Empates}
              />
               <TextField 
                 fullWidth
                 size='small'
                 label="Gols"
                 sx={{marginTop:1}}
                 onChange={(e)=> handleGols(e)}
                 defaultValue={Gols}
              />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmar}>Confirmar</Button>
          <Button color='error' onClick={cancelar} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
