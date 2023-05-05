import { linkLocal } from "./link"

export const loginApi = async(email:string, senha:string)=>{
    const f = await fetch(linkLocal+"autenticacao/logar",{
        headers:{
            "Content-Type":"application/json",
        },
        method:"post",
        body:JSON.stringify({
            email,senha
        })
    })
    .then(res=>res.json())
    return f
}

export const getUsuarioPorIdApi = async(id:string)=>{
    const f = await fetch(linkLocal+"usuario/"+id,{
        headers:{
            "Content-Type":"application/json",
        },
        method:"get"
    })
    .then(res=>res.json())
    return f
}

export const cadastrarUsuarioApi = async(email:string, senha:string, nome:string)=>{
    
    const f = await fetch(linkLocal+"usuario/cadastrar",{
        headers:{
            "Content-Type":"application/json",
        },
        method:"post",
        body:JSON.stringify({
            nome,email,senha
        })
    })
    .then(res=>res.json())
    return f
}

export const deletarUsuarioApi = async(id:string)=>{
    const f = await fetch(linkLocal+"usuario/"+id,{
        headers:{
            "Content-Type":"application/json",
        },
        method:"delete"
    })
    .then(res=>res.json())
    return f
}

export const atualizarUsuarioApi = async(id:string ,email:string,nome:string, senha:string)=>{
    const f = await fetch(linkLocal+"usuario/"+id,{
        headers:{
            "Content-Type":"application/json",
        },
        method:"put",
        body:JSON.stringify({
            email,senha,nome
        })
    })
    .then(res=>res.json())
    return f
}