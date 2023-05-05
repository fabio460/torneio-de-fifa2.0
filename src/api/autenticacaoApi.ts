import { linkLocal } from "./link"

const jwt = localStorage.getItem('jwt') || ""
const jwtArray = jwt.split(`"`)

export const autozidacaoApi = async()=>{
    const f = await fetch(linkLocal+"autenticacao/verificarLogado",{
        headers:{
            "Content-Type":"application/json",
            "x-access-token":jwtArray[1]
        }
    })
    .then(res=>res.json())
    return f                     
}