import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, InputBase, Paper } from '@mui/material';
import { participantesType } from '../../types';
import  "./campeonato2.css";
type participanteeducerType ={
  participante:participantesType,
  selecionado:boolean
}
type jogosType = {casa:participanteeducerType, fora:participanteeducerType}
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
export default function Cards({jogo, partida}:{jogo:jogosType, partida:number}) {
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
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80px" }}
                    >
                    <InputBase
                         sx={{ ml: "45%"}}
                        placeholder=""
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                </Paper>
                <div style={{display:"flex", alignItems:"center"}}>X</div>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80px" }}
                    >
                    <InputBase
                        sx={{ ml: "45%"}}
                        placeholder=""
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                </Paper>
            </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
