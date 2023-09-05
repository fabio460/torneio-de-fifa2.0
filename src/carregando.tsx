import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';


export default function Carregando() {
  return (
      <div className='carregando' style={{ height:"50vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <CircularProgress/>
      </div>
  )
}
