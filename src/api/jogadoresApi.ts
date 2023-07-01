
import { jogadoresType } from "../types"
import { linkLocal } from "./link"

export const listarJogadoresApi = async()=>{
    const f = await fetch(linkLocal+"jogadores",{
        headers:{
            'Content-Type':'application/json'
        },
    })
    .then(res=>res.json())
    return f
}

export const listaJogadoresPorTorneioApi = async(idTorneio:string)=>{
    
    const f = await fetch(linkLocal+"jogadores/porTorneio",{
        headers:{
            'Content-Type':'application/json'
        },
        method:'post',
        body:JSON.stringify({
            idTorneio
        })
    })
    .then(res=>res.json())
    return f
}

export const comprarJogadoresApi = async(idParticipante:string, jogador:jogadoresType)=>{
    
    const f = await fetch(linkLocal+"jogadores",{
        headers:{
            'Content-Type':'application/json'
        },
        method:'post',
        body:JSON.stringify({
            idParticipante, jogador
        })
    })
    .then(res=>res.json())
    return f
}

export const removerJogadoresApi = async(listaDeIds:string[], saldoAtualizado:number, idParticipante:string | undefined)=>{
    const f = await fetch(linkLocal+"jogadores",{
        headers:{
            'Content-Type':'application/json'
        },
        method:'delete',
        body:JSON.stringify({
            listaDeIds,saldoAtualizado,idParticipante
        })
    })
    .then(res=>res.json())
    return f
}


export const transferenciaDeJogadoresApi = async(
        idDoProprietario:string | undefined,
        idDoComprador:string,
        idsDosJogadoresSelecionados:(string | undefined)[] | undefined, 
        valorDaNegociacao:number | undefined
    )=>{
    const f = await fetch(linkLocal+"jogadores/transferencia",{
        headers:{
            'Content-Type':'application/json'
        },
        method:'put',
        body:JSON.stringify({
            idDoProprietario,
            idDoComprador,
            idsDosJogadoresSelecionados,
            valorDaNegociacao
        })
    })
    .then(res=>res.json())
    return f
}