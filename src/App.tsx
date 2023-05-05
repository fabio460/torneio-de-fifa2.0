import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import TelaPrincipal from './telaPrincipal'
import RotaPrivada from './rotaPrivada'
import Login from './login'
import Cadastro from './cadastro'
import TelaDeElenco from './telaDeElenco'
import TelaCompraDeJogadores from './telaCompraDeJogadores'
export default function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<RotaPrivada><TelaPrincipal/></RotaPrivada>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/elenco' element={<RotaPrivada><TelaDeElenco/></RotaPrivada>}></Route>
              <Route path='/compraDeJogadores' element={<RotaPrivada><TelaCompraDeJogadores/></RotaPrivada>}></Route>
              <Route path='/cadastro' element={<Cadastro/>}></Route>
          </Routes>
        </BrowserRouter>  
    </div>
  )
}