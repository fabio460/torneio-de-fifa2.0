import { linkLocal } from "./link"

export const listarTorneiosApi = async()=>{
    const f = await fetch(linkLocal+"torneio/",{
        headers:{
            "Content-Type":"application/json",
        },
        method:"get"
    })
    .then(res=>res.json())
    return f
}

export const getTorneioPorIdApi = async(id:string | undefined)=>{
    const f = await fetch(linkLocal+"torneio/"+id,{
        headers:{
            "Content-Type":"application/json",
        },
        method:"get"
    })
    .then(res=>res.json())
    return f
}

export const criarTorneioApi = async(nome:string, idUsuario:string)=>{
    const f = await fetch(linkLocal+"torneio",{
        headers:{
            "Content-Type":"application/json",
        },
        method:"post",
        body:JSON.stringify({
            nome,idUsuario
        })
    })
    .then(res=>res.json())
    return f
}

export const deletarTorneioApi = async(id:string)=>{
    const f = await fetch(linkLocal+"torneio/"+id,{
        headers:{
            "Content-Type":"application/json",
        },
        method:"delete"
    })
    .then(res=>res.json())
    return f
}

export const atualizaTorneioApi = async(id:string ,nome:string,idUsuario:string)=>{
    const f = await fetch(linkLocal+"torneio/"+id,{
        headers:{
            "Content-Type":"application/json",
        },
        method:"put",
        body:JSON.stringify({
            nome,idUsuario
        })
    })
    .then(res=>res.json())
    return f
}