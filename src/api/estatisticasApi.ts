import { linkLocal } from "./link"


export const listarStatisticaApi = async(torneioId:string)=>{
    const f = await fetch(linkLocal+"estatistica/"+torneioId,{
        headers:{
            "Content-Type":"application/json",
        },
        method:"get"
    })
    .then(res=>res.json())
    return f
}

export const adicionarEstatisticaApi = async(artilheiros:string[], assistentes:string[], vencedor:string,torneioId:string | undefined)=>{
    
    const f = await fetch(linkLocal+"estatistica",{
        headers:{
            "Content-Type":"application/json",
        },
        method:"post",
        body:JSON.stringify({
            vencedor,artilheiros,assistentes,torneioId
        })
    })
    .then(res=>res.json())
    return 5
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

