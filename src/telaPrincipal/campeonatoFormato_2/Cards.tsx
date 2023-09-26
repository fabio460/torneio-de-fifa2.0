import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, IconButton, InputBase, Paper } from '@mui/material';
import { golsType, rodadasType } from '../../types';
import  "./campeonato2.css";
import UpdateIcon from '@mui/icons-material/Update';
import { atualizarRodadaApi, atualizarStatusDaRodadaApi, atualizarTabelaApi, listarTabelaApi } from '../../api/campeonatoApi';
import { useDispatch, useSelector } from 'react-redux';
import CarregandoBtn from '../../carregandoBtn';
import { calculaDadosDaTabela } from './funcoesDoComponentes';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const cardStyle = {
   margin:1,
  "@media (max-width:1050px)":{
    minWidth: "100%",
  }
}
type cardType = {
  rodada:rodadasType,
  partida:number,
  idDoCampeonato:string
}
export default function Cards({rodada, partida, idDoCampeonato}:cardType) {
  const dispatch = useDispatch()
  const [golCasa, setGolCasa] = React.useState<{gol:number, time:any}>()
  const [golFora, setGolFora] = React.useState<{gol:number, time:any}>()
  const [carregando, setCarregando] = React.useState(false)
  const atualizarDados = useSelector((state:any)=>state.atualizarDadosReducer.status)
  const torneioAtual = useSelector((state:any)=>state.torneioReducer.torneio)
  let usuarioReducer = useSelector((state:any)=>state.usuarioReducer.usuario)
  let idTorneio = usuarioReducer.torneio[torneioAtual].id

  const atualizarRodada =async ()=>{
    setCarregando(true)
    const id = rodada.id
    atualizarRodadaApi(id, golCasa?.gol, golFora?.gol)
     const res =await calculaDadosDaTabela(golCasa ? golCasa : {gol:0, time:rodada.mandante}, golFora ? golFora : {gol:0, time:rodada.visitante})
     await atualizarTabelaApi(res)
    setTimeout(() => {
      dispatch({
        type:"atualizarDados",  
        payload:{status:!atualizarDados}
      })
      setCarregando(false)
    }, 2000);
    console.log(golCasa ? golCasa : {gol:rodada.golsMandante, time:rodada.mandante}, golFora ? golFora : {gol:rodada.golsVisitante, time:rodada.visitante})
  }
  
  const corrigirResultado = async()=>{
    setGolCasa({gol:rodada.golsMandante, time:rodada.mandante})
    setGolFora({gol:rodada.golsVisitante, time:rodada.visitante})
     setCarregando(true)
     const res = await calculaDadosDaTabela(golCasa ? golCasa : {gol:rodada.golsMandante, time:rodada.mandante}, golFora ? golFora : {gol:rodada.golsVisitante, time:rodada.visitante})
     await atualizarStatusDaRodadaApi(rodada.id, "aberto", res)
     setTimeout(() => {
      dispatch({
        type:"atualizarDados",  
        payload:{status:!atualizarDados}
      })
      
      setCarregando(false)
    }, 2000);
  }
  
  return (
    <Card sx={cardStyle} className='cardContainer' >
      {
        rodada.statusDaRodada === "fechado" ?
      <Typography sx={{display:"flex", justifyContent:"flex-end", width:"100%"}}>
        <IconButton onClick={corrigirResultado}><UpdateIcon/></IconButton>
      </Typography>
      :
      <Typography sx={{display:"flex", justifyContent:"flex-end", width:"100%"}}>
        <IconButton disabled><UpdateIcon/></IconButton>
      </Typography>
      }
      <CardContent>
        <Typography variant="h5" component="div">
          Partida {partida}
        </Typography>
        <Typography sx={{ m: 1, display:"flex", justifyContent:"space-between", alignContent:"center" }} color="text.secondary">
          <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Avatar src={rodada.mandante[0]?.emblemaDoTime}/>
            <Typography>{rodada.mandante[0]?.nome}</Typography>
          </div>
          <div style={{ display:"flex", alignItems:"center", margin:"20px"}}> 
            <img style={{width:"30px"}} src='https://cdn-icons-png.flaticon.com/512/753/753228.png' alt=''/>
          </div>
          <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Avatar src={rodada.visitante[0]?.emblemaDoTime}/>
            <Typography>{rodada.visitante[0]?.nome}</Typography>
          </div>
        </Typography>
        <Typography variant="body2">
            <Typography style={{textAlign:"center"}}>Resultado</Typography>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                {
                  rodada.statusDaRodada === 'fechado' ?
                  <div className='placar'>{rodada.golsMandante}</div>:
                  <Paper
                      component="form"
                      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80px" }}
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
                          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80px" }}
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
          <Button variant='contained' sx={{width:"100%"}} onClick={atualizarRodada}>
            {
              carregando? <CarregandoBtn/>:
              <span>Registrar</span>
            }
          </Button>:
          <Button disabled variant='contained' sx={{width:"100%"}}>Registrado</Button>
        }
      </CardActions>
    </Card>
  );
}
