import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { autozidacaoApi } from '../api/autenticacaoApi'

export default function RotaPrivada({children}:any) {
  const [autorizado, setAutorizado] = useState()
  const  token = localStorage.getItem('jwt')
  
  async function autorizacao() {
    const auth = await autozidacaoApi()
    setAutorizado(auth)
  }
  useEffect(()=>{
    autorizacao()
  },[])

  return (
    <div>
      {
         !autorizado ?
         <div>carregando...</div>:
         (token === 'undefined') || !token ?
          <div><Navigate to={'/login'}/></div> :
          children 
      }
    </div>
  )
}
