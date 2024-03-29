import { jogadoresType } from "../types"
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

export const adicionarParticipantesoApi = async(
        nome:string,
        idTorneio:string,
        saldo:number,
        time:string,
        emblemaDoTime:string | undefined,
        listaDeJogadores:jogadoresType[] | undefined = []
    )=>{
    const f = await fetch(linkLocal+"participantes",{
        headers:{
            "Content-Type":"application/json",
        },
        method:"post",
        body:JSON.stringify({
            nome,
            idTorneio,
            saldo,
            time,
            emblemaDoTime,
            listaDeJogadores
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

export const transferenciaMonetariaApi = async(idDoRecebidor:string ,idDoPagador:string,valor:number)=>{
    const f = await fetch(linkLocal+"participantes/transferenciasMonetarias",{
        headers:{
            "Content-Type":"application/json",
        },
        method:"post",
        body:JSON.stringify({
            idDoRecebidor, idDoPagador, valor 
        })
    })
    .then(res=>res.json())
    return f
}