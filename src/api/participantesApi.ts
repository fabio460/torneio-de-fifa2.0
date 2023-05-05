import { linkLocal } from "./link"

export const listarParticipantesApi = async()=>{
    const f = await fetch(linkLocal+"participantes/",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then(res=>res.json())
    return f
}

export const getParticipantesPorIdApi = async(id:string)=>{
    const f = await fetch(linkLocal+"participantes/"+id,{
        headers:{
            "Content-Type":"application/json",
        },
        method:"get"
    })
    .then(res=>res.json())
    return f
}

export const adicionarParticipantesoApi = async(nome:string, idTorneio:string)=>{
    const f = await fetch(linkLocal+"participantes",{
        headers:{
            "Content-Type":"application/json",
        },
        method:"post",
        body:JSON.stringify({
            nome,idTorneio
        })
    })
    .then(res=>res.json())
    return f
}

export const deletarParticipantesApi = async(id:string)=>{
    const f = await fetch(linkLocal+"participantes/"+id,{
        headers:{
            "Content-Type":"application/json",
        },
        method:"delete"
    })
    .then(res=>res.json())
    return f
}

export const atualizarParticipantesApi = async(id:string ,nome:string,saldo:number, time:string)=>{
    const f = await fetch(linkLocal+"participantes/"+id,{
        headers:{
            "Content-Type":"application/json",
        },
        method:"put",
        body:JSON.stringify({
            nome,
            saldo,
            time,  
        })
    })
    .then(res=>res.json())
    return f
}