import { resultadoType } from "../types"
import { linkLocal } from "./link"

export const criarTabela = async(tabelaDePremiados:resultadoType)=>{
    return fetch(linkLocal+"tabelaDeResultados/criar",{
        headers:{
          "Content-Type":"application/json"
        },
        method:"post",
        body:JSON.stringify({tabelaDePremiados})
      })
      .then(r=>r.json())
      .then(r=>console.log(r))
}
export const listarTabelaApi = async()=>{
  let res = null
  const f = await fetch(linkLocal+"tabelaDeResultados/",{
      headers:{
        "Content-Type":"application/json"
      },
    })
    .then(r=>r.json())
    .then(r=>{
      res = r
    })
    
  return res
}

export const listarTabelaPorIdCampeonato = (idDoCampeonato:string)=>{
    return fetch(linkLocal+"tabelaDeResultados/listarPorIdDoCampionato",{
        headers:{
          "Content-Type":"application/json"
        },
        method:"post",
        body:JSON.stringify({idDoCampeonato})
      })
      .then(r=>r.json())
      .then(r=>console.log(r))
}
export const deletarTabelaResultado = (id:string)=>{
    return fetch(linkLocal+"tabelaDeResultados/deletar",{
        headers:{
          "Content-Type":"application/json"
        },
        method:"delete",
        body:JSON.stringify({id})
      })
      .then(r=>r.json())
      .then(r=>console.log(r))
}