import { linkLocal } from "./link"
import {pagadoresType, premiadosType} from '../types'
export const pagarPremiacoesApi = async(premiados:premiadosType)=>{
    const f = await fetch(linkLocal+"pagamentos/pagarPremiacao/",{
        headers:{
            "Content-Type":"application/json",
        },
        method:"put",
        body:JSON.stringify({
            premiados  
        })
    })
    .then(res=>res.json())
    return f
}

export const pagarFolhasApi = async(pagadores:pagadoresType,id:string)=>{
    const f = await fetch(linkLocal+"pagamentos/pagarFolha/"+id,{
        headers:{
            "Content-Type":"application/json",
        },
        method:"put",
        body:JSON.stringify({
            pagadores,id  
        })
    })
    .then(res=>res.json())
    return f
}