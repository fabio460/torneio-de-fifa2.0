import { linkLocal } from "./link"

export const listarPosicoesApi = async()=>{
    const f = await fetch(linkLocal+"posicoes/",{
        headers:{
            "Content-Type":"application/json",
        },
        method:"get"
    })
    .then(res=>res.json())
    return f
}

export const getPosicoesPorIdApi = async(id:string)=>{
    const f = await fetch(linkLocal+"posicoes/"+id,{
        headers:{
            "Content-Type":"application/json",
        },
        method:"get"
    })
    .then(res=>res.json())
    return f
}

export const atualizarOuCriarPosicoesApi = async(idDoJogador:string ,x:number, y:number)=>{
    const f = await fetch(linkLocal+"posicoes/",{
        headers:{
            "Content-Type":"application/json",
        },
        method:"put",
        body:JSON.stringify({
            idDoJogador, x, y
        })
    })
    .then(res=>res.json())
    return f
}