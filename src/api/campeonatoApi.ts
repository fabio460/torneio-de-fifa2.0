import { linkLocal } from "./link"

//const local = "http://localhost:4000/"
const local = linkLocal

export const criarCampeonatoApi = (times:any, voltas:any, idTorneio:string)=>{
    return fetch(local+"torneioTipoDois/gerarTorneio",{
      headers:{
        "Content-Type":"application/json"
      },
      method:"post",
      body:JSON.stringify({times, voltas, idTorneio})
    })
    .then(r=>r.json())
    .then(r=>console.log(r))
}

export const listarCampeonatoApi = (idTorneio?:string)=>{
    return fetch(local+"torneioTipoDois/listarCampeonato/"+idTorneio,{
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

export const atualizarRodadaApi = (id:string | undefined, golsMandante:number | undefined, golsVisitante:number | undefined, statusDaRodada?:string)=>{
  return fetch(local+"torneioTipoDois/atualizarRodada/",{
    headers:{
      "Content-Type":"application/json"
    },
    method:"put",
    body:JSON.stringify({id, golsMandante, golsVisitante, statusDaRodada})
  }).then(r=>r.json())
}
export const atualizarStatusDaRodadaApi = (id: string, statusDaRodada: string, correcao?:any)=>{
  fetch(local+"torneioTipoDois/alterarStatusDaRodada",{
    headers:{
      "Content-Type":"application/json"
    },
    method:"put",
    body:JSON.stringify({id, statusDaRodada, correcao})
  }).then(r=>r.json())
}

export const atualizarTabelaApi = (resultado:any)=>{
  return fetch(local+"torneioTipoDois/atualizarTabela/",{
    headers:{
      "Content-Type":"application/json"
    },
    method:"put",
    body:JSON.stringify({resultado})
  }).then(r=>r.json()).then(res=>console.log(res))
}

export const listarTabelaApi = (idTorneio:string)=>{
  return fetch(local+"torneioTipoDois/listarTabela/"+idTorneio,{
    headers:{
      "Content-Type":"application/json"
    },
  }).then(r=>r.json())
}
