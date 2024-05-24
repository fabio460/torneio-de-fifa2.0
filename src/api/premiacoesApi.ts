import { stringify } from "querystring"
import { linkLocal } from "./link"

export const listarPremiacoesApi = async()=>{
    const f = await fetch(linkLocal+"premiacoes/listar",{
        headers:{
            "Content-Type":"application/json",
        },
        method:"get"
    })
    .then(res=>res.json())
    return f
}

export const atualizarPremiacoesApi = async(
    id :string,
    campeao:number,
    viceCampeao?:number, 
    terceiroColocado?:number,
    quartoColocado?:number,
    quintoColocado?:number,
    artilheiro?:number, 
    viceArtilheiro?:number,
    terceiroArtilheiro?:number,
    quartoAtilheiro?:number,
    quintoArtilheiro?:number,
    defezaMenosVazada?:number,
    defezaSegundaMenosVazada?:number,
    defezaTerceiraMenosVazada?:number,
    defezaQuartaMenosVazada?:number,
    defezaQuintaMenosVazada?:number,
    empates?:number,
    vitoria?:number,
    gols?:number,
)=>{
    const f = await fetch(linkLocal+"premiacoes/alterar",{
        headers:{
            "Content-Type":"application/json",
        },
        method:"put",
        body:JSON.stringify({
            id,
            campeao,
            viceCampeao,
            terceiroColocado,
            quartoColocado, 
            quintoColocado,
            artilheiro, 
            viceArtilheiro,
            terceiroArtilheiro,
            quartoAtilheiro,
            quintoArtilheiro,
            defezaMenosVazada,
            defezaSegundaMenosVazada,
            defezaTerceiraMenosVazada,
            defezaQuartaMenosVazada,
            defezaQuintaMenosVazada,
            empates,
            gols,
            vitoria
        })
    })
    .then(res=>{
        alert("Dados atualizados com sucesso!")
        window.location.reload()
    })
    return f
}