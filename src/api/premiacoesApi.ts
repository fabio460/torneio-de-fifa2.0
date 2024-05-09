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
    artilheiro?:number, 
    viceArtilheiro?:number,
    terceiroArtilheiro?:number,
    quartoAtilheiro?:number,
    defezaMenosVazada?:number,
    defezaSegundaMenosVazada?:number,
    defezaTerceiraMenosVazada?:number,
    defezaQuartaMenosVazada?:number,
    empates?:number,
    vitoria?:number,
    gols?:number,
)=>{
    console.log({viceArtilheiro, terceiroColocado})
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
            artilheiro, 
            defezaMenosVazada,
            defezaQuartaMenosVazada,
            defezaSegundaMenosVazada,
            defezaTerceiraMenosVazada,
            empates,
            gols,
            quartoAtilheiro,
            terceiroArtilheiro,
            viceArtilheiro,
            vitoria
        })
    })
    .then(res=>{
        alert("Dados atualizados com sucesso!")
        window.location.reload()
    })
    return f
}