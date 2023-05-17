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

export const pagarFolhasApi = async(pagadores:pagadoresType)=>{
    const f = await fetch(linkLocal+"pagamentos/pagarFolha/",{
        headers:{
            "Content-Type":"application/json",
        },
        method:"put",
        body:JSON.stringify({
            pagadores  
        })
    })
    .then(res=>res.json())
    return f
}