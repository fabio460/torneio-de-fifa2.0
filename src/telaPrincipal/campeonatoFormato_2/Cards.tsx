import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, InputBase, Paper } from '@mui/material';
import { golsType, jogosType, participantesType } from '../../types';
import  "./campeonato2.css";

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const cardStyle = {
  minWidth: 175, margin:1,
  "@media (max-width:1050px)":{
    minWidth: "100%",
  }
}
type cardType = {
  jogo:jogosType,
  partida:number,
  setResultado:any
}
export default function Cards({jogo, partida, setResultado}:cardType) {
  const [golCasa, setGolCasa] = React.useState<golsType>()
  const [golFora, setGolFora] = React.useState<golsType>()
  const randleResultado = ()=>{
    setResultado({golCasa, golFora})
  }
  return (
    <Card sx={cardStyle} className='cardContainer'>
      <CardContent>
        <Typography variant="h5" component="div">
          Partida {partida}
        </Typography>
        <Typography sx={{ m: 1, display:"flex", justifyContent:"space-between", alignContent:"center" }} color="text.secondary">
          <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Avatar src={jogo.casa.participante.emblemaDoTime}/>
            <Typography>{jogo.casa.participante.nome}</Typography>
          </div>
          <div style={{ display:"flex", alignItems:"center", margin:"20px"}}> 
            <img style={{width:"30px"}} src='https://cdn-icons-png.flaticon.com/512/753/753228.png' alt=''/>
          </div>
          <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Avatar src={jogo.fora.participante.emblemaDoTime}/>
            <Typography>{jogo.fora.participante.nome}</Typography>
          </div>
        </Typography>
        <Typography variant="body2">
            <Typography style={{textAlign:"center"}}>Resultado</Typography>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                {
                  jogo.golsCasa !== undefined?
                  <div className='placar'>{jogo.golsCasa}</div>:
                  <Paper
                      component="form"
                      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80px" }}
                      >
                      <InputBase
                          onChange={e=>setGolCasa({participante:jogo.casa.participante,gol:parseInt(e.target.value)})}
                          sx={{ ml: "45%"}}
                          defaultValue={jogo.golsCasa}
                          inputProps={{ 'aria-label': 'search google maps' }}
                      />
                  </Paper>

                }
                <div style={{display:"flex", alignItems:"center"}}>X</div>
                    {
                      jogo.golsFora !== undefined ?
                      <div className='placar'>{jogo.golsFora}</div>:
                      <Paper
                          component="form"
                          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80px" }}
                          >
                          <InputBase
                              onChange={e=>setGolFora({participante:jogo.fora.participante,gol:parseInt(e.target.value)})}
                              sx={{ ml: "45%"}}
                              defaultValue={jogo.golsFora}
                              inputProps={{ 'aria-label': 'search google maps' }}
                          />
                      </Paper>

                    }
            </div>
        </Typography>
      </CardContent>
      <CardActions>
        {
          (jogo.golsCasa === undefined && jogo.golsFora === undefined) ?
          <Button variant='contained' sx={{width:"100%"}} onClick={randleResultado}>registrar</Button>:
          <Button disabled variant='contained' sx={{width:"100%"}}>Registrado</Button>
        }
      </CardActions>
    </Card>
  );
}
