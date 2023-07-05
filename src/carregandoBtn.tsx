import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export default function CarregandoBtn({color}:{color?:string | null}) {
  return (
    color ?
      <CircularProgress  sx={{color}} size='23px'/>:
      <CircularProgress  sx={{color:'white'}} size='23px'/>

  )
}
