import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Carregando() {
  return (
      <div className='carregando' style={{ height:"90vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <CircularProgress/>
      </div>
  )
}
