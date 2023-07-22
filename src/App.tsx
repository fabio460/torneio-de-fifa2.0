import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import TelaPrincipal from './telaPrincipal'
import RotaPrivada from './rotaPrivada'
import Login from './redux/login'
import Cadastro from './cadastro'
import TelaDeElenco from './telaDeElenco'
import TelaCompraDeJogadores from './telaCompraDeJogadores'
import Valores from './valores'
export default function App() {
  const l ={"nome":"Carlos Cesar Dos Santos","imagemDoJogador":"https://cdn.sofifa.net/players/163/015/07_120.png","nacionalidade":"Brasileiro","imagemDaNacionalidade":"https://cdn.sofifa.net/flags/br.png","escudoDoTime":"https://cdn.sofifa.net/meta/team/884/60.png","posicao":"ST, RM","overall":"62","valorDoJogador":"1","time":"SPORTING BRAGA","liga":"","linkSoFifa":"https://sofifa.com/player/229153/levi-garcia/230040/"}
   
  
  return (
    <div>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<RotaPrivada><TelaPrincipal/></RotaPrivada>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/elenco' element={<RotaPrivada><TelaDeElenco/></RotaPrivada>}></Route>
              <Route path='/valores' element={<RotaPrivada><Valores/></RotaPrivada>}></Route>
              <Route path='/compraDeJogadores' element={<RotaPrivada><TelaCompraDeJogadores /></RotaPrivada>}></Route>
              <Route path='/cadastro' element={<Cadastro/>}></Route>
          </Routes>
        </BrowserRouter>  
    </div>
  )
}