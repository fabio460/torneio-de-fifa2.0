import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, IconButton, InputBase, Paper } from '@mui/material';
import { golsType, rodadasType } from '../../types';
import Tooltip from '@mui/material/Tooltip';
import  "./campeonato2.css";
import UpdateIcon from '@mui/icons-material/Update';
import { atualizarRodadaApi, atualizarStatusDaRodadaApi, atualizarTabelaApi, listarTabelaApi } from '../../api/campeonatoApi';
import { useDispatch, useSelector } from 'react-redux';
import CarregandoBtn from '../../carregandoBtn';
import { calculaDadosDaTabela } from './funcoesDoComponentes';
import ModalIconeCorrecao from './modais/modalIconeConfirmacao';
import ModalConfirmacoes from '../../modalConfirmacao';
import { darkBackgroundBox } from '../../temaDark';
import { useNavigate } from 'react-router-dom';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
type cardType = {
  rodada:rodadasType,
  partida:number,
  idDoCampeonato:string
}
export default function Cards({rodada, partida, idDoCampeonato}:cardType) {
  
  const darkMode = useSelector((state:any)=>state.darkReducer?.dark)
  const cardStyle = {
     margin:1,
     background: darkMode?darkBackgroundBox:"#e0f7fa",
    "@media (max-width:1050px)":{
      minWidth: "100%",
      margin:0,
      marginBottom:4
    }
  }
  const dispatch = useDispatch()
  const [golCasa, setGolCasa] = React.useState<{gol:number, time:any}>()
  const [golFora, setGolFora] = React.useState<{gol:number, time:any}>()
  const [carregando, setCarregando] = React.useState(false)
  const atualizarDados = useSelector((state:any)=>state.atualizarDadosReducer.status)
  const torneioAtual = useSelector((state:any)=>state.torneioReducer.torneio)
  let usuarioReducer = useSelector((state:any)=>state.usuarioReducer.usuario)
  let idTorneio = usuarioReducer.torneio[torneioAtual].id

  const atualizarRodada =()=>{
    setCarregando(true)
    const id = rodada.id
    const Rodada:any = rodada
    const res = calculaDadosDaTabela(golCasa ? golCasa : {gol:0, time:rodada.mandante}, golFora ? golFora : {gol:0, time:rodada.visitante})  
    atualizarTabelaApi(res, dispatch, atualizarDados, setCarregando, id, golCasa?.gol, golFora?.gol, Rodada)
  }
  
  const corrigirResultado = async()=>{ 
    setGolFora({gol:rodada.golsVisitante, time:rodada.visitante})
     setCarregando(true)
     const res = calculaDadosDaTabela(golCasa ? golCasa : {gol:rodada.golsMandante, time:rodada.mandante}, golFora ? golFora : {gol:rodada.golsVisitante, time:rodada.visitante})
     atualizarStatusDaRodadaApi(rodada.id, "aberto", res, dispatch, atualizarDados, setCarregando)
     setTimeout(() => {
      dispatch({
        type:"atualizarDados",  
        payload:{status:!atualizarDados}
      })
      
      setCarregando(false)
    }, 2000);
  }
  const navigate = useNavigate()
  const getParticipante = (e:any)=>{
      localStorage.setItem('idDoElenco', e as string)
      navigate('/elenco')
  } 
  return (
    <Card sx={cardStyle} className='cardContainer' >
      {
        rodada.statusDaRodada === "fechado" ?
      <div style={{display:"flex", justifyContent:"flex-end", width:"100%"}}>
        <ModalIconeCorrecao
           action={corrigirResultado}
           titulo='Deseja corrigir resultado?'
           mensagem='Ao confirmar você estará apagando este resultado!'
           Icone={UpdateIcon}
           setCarregando={setCarregando}
           carregando={carregando}
        />
      </div>
      :
      <div style={{display:"flex", justifyContent:"flex-end", width:"100%"}} >
        <IconButton disabled><UpdateIcon/></IconButton>
      </div>
      }
      <CardContent>
        <Typography variant="h5" component="div" sx={{textAlign:"center"}}>
          Partida {partida}
        </Typography>
        <Typography component='div' sx={{ m: 1, display:"flex", justifyContent:"space-between", alignContent:"center" }} color="text.secondary">
          <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Tooltip title={"Vá para o elenco do "+rodada.mandante[0].nome}>
               <div>
                 <Avatar  onClick={()=> getParticipante(rodada.mandante[0].idParticipante)} sx={{cursor:"pointer", padding:"5px", width:"50px", height:"50px"}} src={rodada.mandante[0]?.emblemaDoTime} />
               </div>
            </Tooltip>
            <Typography>{rodada.mandante[0]?.nome}</Typography>
          </div>
          <div style={{ display:"flex", alignItems:"center", margin:"20px"}}> 
            <img style={{width:"30px"}} src='https://cdn-icons-png.flaticon.com/512/753/753228.png' alt=''/>
          </div>
          <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
          <Tooltip title={"Vá para o elenco do "+rodada.visitante[0].nome}>
             <div>
                <Avatar onClick={()=> getParticipante(rodada.visitante[0].idParticipante)} sx={{cursor:"pointer", padding:"5px", width:"50px", height:"50px"}} src={rodada.visitante[0]?.emblemaDoTime}/>
             </div>
          </Tooltip>

            <Typography component='div'>{rodada.visitante[0]?.nome}</Typography>
          </div>
        </Typography>
        <Typography variant="body2" component='div'>
            <Typography component='div' style={{textAlign:"center"}}>Resultado</Typography>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                {
                  rodada.statusDaRodada === 'fechado' ?
                  <div className='placar'>{rodada.golsMandante}</div>:
                  <Paper
                      component="form"
                      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "50px" }}
                      >
                      <InputBase
                          onChange={e=>setGolCasa({gol:parseInt(e.target.value), time:rodada.mandante})}
                          sx={{ ml: "35%"}}
                          defaultValue={rodada.golsMandante}
                          inputProps={{ 'aria-label': 'search google maps' }}
                      />
                  </Paper>

                }
                <div style={{display:"flex", alignItems:"center"}}>X</div>
                    {
                      rodada.statusDaRodada === 'fechado' ?
                      <div className='placar'>{rodada.golsVisitante}</div>:
                      <Paper
                          component="form"
                          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "50px" }}
                          >
                          <InputBase
                              onChange={e=>setGolFora({gol:parseInt(e.target.value), time:rodada.visitante})}
                              sx={{ ml: "45%"}}
                              defaultValue={rodada.golsVisitante}
                              inputProps={{ 'aria-label': 'search google maps' }}
                          />
                      </Paper>

                    }
            </div>
        </Typography>
      </CardContent>
      <CardActions>
        {
          (rodada.statusDaRodada === "aberto") ?

          <ModalConfirmacoes
              action={atualizarRodada}
              textoBtn='Registrar'
              mensagem='Ao confirmar, você estará registrando o resultado da partida'
              titulo='Registrar resultado!'
              variant={"contained"}
              corBtnConfirmar='secondary'
              corBtnCancelar='error'
              variantConfirmar='contained'
              varianteCancelar='outlined'
              setCarregando={setCarregando}
              carregando={carregando}
              carregarNoBtnPrincipal={true}
          />
          :
          <Button disabled variant='contained' sx={{width:"100%"}}>Registrado</Button>
        }
      </CardActions>
    </Card>
  );
}
