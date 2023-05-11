import { linkLocal } from "./link"


export const listarStatisticaApi = async()=>{
    const f = await fetch(linkLocal+"estatistica/",{
        headers:{
            "Content-Type":"application/json",
        },
        method:"get"
    })
    .then(res=>res.json())
    return f
}

export const adicionarEstatisticaApi = async(artilheiro:string, melhorAssistente:string, vencedor:string)=>{
    
    const f = await fetch(linkLocal+"estatistica",{
        headers:{
            "Content-Type":"application/json",
        },
        method:"post",
        body:JSON.stringify({
            vencedor,melhorAssistente,artilheiro
        })
    })
    .then(res=>res.json())
    return f
}

export const removerHistoricoEstatisticoApi = async()=>{
    const f = await fetch(linkLocal+"estatistica",{
        headers:{
            "Content-Type":"application/json",
        },
        method:"delete"
    })
    .then(res=>res.json())
    return f
}

