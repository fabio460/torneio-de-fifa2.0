import { linkLocal } from "./link"

//const local = "http://localhost:4000/"
const local = linkLocal

export const criarCampeonatoApi = (times:any, voltas:any, idTorneio:string, dispatch:any, atualizarDados:any, setCarregando:any)=>{
    return fetch(local+"torneioTipoDois/gerarTorneio",{
      headers:{
        "Content-Type":"application/json"
      },
      method:"post",
      body:JSON.stringify({times, voltas, idTorneio})
    })
    .then(r=>r.json())
    .then(r=>{
 
      dispatch({
        type:"atualizarDados",  
        payload:{status:!atualizarDados}
      })
      
      setTimeout(() => {  
        dispatch({
          type:"atualizarDados",  
          payload:{status:!atualizarDados}
        })
        setCarregando(false)
        window.location.reload()
      }, 5000);
    })
}

export const listarCampeonatoApi = (idTorneio?:string)=>{
    if (idTorneio) {
      
      return fetch(local+"torneioTipoDois/listarCampeonato/"+idTorneio,{
        headers:{
          "Content-Type":"application/json"
        },
      }).then(r=>r.json())
    }
}

export const deletarCampeonatoApi = (id:string | undefined)=>{
  return fetch(local+"torneioTipoDois/deletarCampeonato/"+id,{
    headers:{
      "Content-Type":"application/json"
    },
    method:"delete"
  }).then(r=>r.json())
}

export const getCampeonatoPorIdApi = async(id: string)=>{
  return fetch(local+"torneioTipoDois/getCampeonatoPorParticipant/",{
    headers:{
      "Content-Type":"application/json"
    },
    method:"post",
    body:JSON.stringify({id})
  }).then(r=>r.json())
}
export const atualizarRodadaApi = (id:string | undefined, golsMandante:number | undefined, golsVisitante:number | undefined, statusDaRodada?:string, golCasa?:any, golFora?:any)=>{
  return fetch(local+"torneioTipoDois/atualizarRodada/",{
    headers:{
      "Content-Type":"application/json"
    },
    method:"put",
    body:JSON.stringify({id, golsMandante, golsVisitante, statusDaRodada, golCasa, golFora})
  }).then(r=>r.json())
}
export const atualizarStatusDaRodadaApi = (id: string, statusDaRodada: string, correcao?:any, dispatch?:any, atualizarDados?:any, setCarregando?:any, idTorneio?:string)=>{
  fetch(local+"torneioTipoDois/alterarStatusDaRodada",{
    headers:{
      "Content-Type":"application/json"
    },
    method:"put",
    body:JSON.stringify({id, statusDaRodada, correcao, idTorneio})
  })
  .then(r=>r.json())
  .then((res)=>{
    if (res === "Esta rodada já foi desfeita por outro usuário!") {   
    }
    alert(res)
    setTimeout(() => {      
      dispatch({
        type:"atualizarDados",  
        payload:{status:!atualizarDados}
      })
      setCarregando(false)
    }, 1000);
  })
}

export const atualizarTabelaApi = (resultado:any, dispatch:any,atualizarDados:any, setCarregando:any, id:string | undefined, golsMandante:number | undefined, golsVisitante:number | undefined, rodada?:any, idTorneio?:string)=>{
  console.log(rodada)
  return fetch(local+"torneioTipoDois/atualizarTabela/",{
    headers:{
      "Content-Type":"application/json"
    },
    method:"put",
    body:JSON.stringify(
      {
        resultado,
        id,
        golsMandante,
        golsVisitante,
        rodada,
        idTorneio
      }
    )
  }).then(r=>r.json()).then(res=>{
    if (res === "Esta rodada já foi atualizada") {
      alert(res)
    }
    dispatch({
      type:"atualizarDados",  
      payload:{status:!atualizarDados}
    })
    setCarregando(false)
  })
}

export const listarTabelaApi = (idTorneio:string)=>{
  return fetch(local+"torneioTipoDois/listarTabela/"+idTorneio,{
    headers:{
      "Content-Type":"application/json"
    },
  }).then(r=>r.json())
}
