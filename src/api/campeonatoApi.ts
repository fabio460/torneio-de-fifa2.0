import { linkLocal } from "./link"

const local = linkLocal
export const criarCampeonatoApi = (times:any, voltas:any)=>{
    return fetch(local+"torneioTipoDois/gerarTorneio",{
      headers:{
        "Content-Type":"application/json"
      },
      method:"post",
      body:JSON.stringify({times, voltas, data: new Date()})
    })
    .then(r=>r.json())
}

export const listarCampeonatoApi = ()=>{
    return fetch(local+"torneioTipoDois/listarCampeonato",{
      headers:{
        "Content-Type":"application/json"
      },
    }).then(r=>r.json())
}

export const deletarCampeonatoApi = (id:string | undefined)=>{
  return fetch(local+"torneioTipoDois/deletarCampeonato/"+id,{
    headers:{
      "Content-Type":"application/json"
    },
    method:"delete"
  }).then(r=>r.json())
}

export const atualizarRodadaApi = (id:string | undefined, golsMandante:number | undefined, golsVisitante:number | undefined)=>{
  return fetch(local+"torneioTipoDois/atualizarRodada/",{
    headers:{
      "Content-Type":"application/json"
    },
    method:"put",
    body:JSON.stringify({id, golsMandante, golsVisitante})
  }).then(r=>r.json())
}

export const atualizarTabelaApi = (resultado:any)=>{
  return fetch(local+"torneioTipoDois/atualizarTabela/",{
    headers:{
      "Content-Type":"application/json"
    },
    method:"put",
    body:JSON.stringify({resultado})
  }).then(r=>r.json())
}

export const listarTabelaApi = ()=>{
  return fetch(local+"torneioTipoDois/listarTabela",{
    headers:{
      "Content-Type":"application/json"
    },
  }).then(r=>r.json())
}
