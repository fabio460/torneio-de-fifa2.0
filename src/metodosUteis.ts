import { getUsuarioPorIdApi } from "./api/usuarioApi"
import { jogadoresType, usuarioLogadoType } from "./types"

export const idDoUsuarioLogado = localStorage.getItem('idDoUsuarioLogado') || ''

export const usuarioLogado = localStorage.getItem('usuarioLogado') !== "undefined" && JSON.parse(localStorage.getItem('usuarioLogado') || '')

export const usuario = async () => {
    return await getUsuarioPorIdApi(idDoUsuarioLogado)
}

export function formatoMonetario(valor:any){
    return valor?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}

export function calculaFolha(arrayDeJogadore:jogadoresType[]) {
  const saldo = arrayDeJogadore.reduce((acc, jogador)=>{
    return acc + parseFloat(jogador.valorDoJogador || '')
  },0)*0.03
  return formatoMonetario(saldo)
}

 export function removeNome(nome:string) {
     let nomeBruto = nome.split(" ")
     let nomeTratado = ""
     nomeBruto.filter((e:string)=>{
       if (
         e === "ZAG" || e === "VOL" || e === "MC" || e === "ATA" || e === "ME" || e === "MD" ||
         e === "MEI" || e === "GOL" || e === "SA" || e === "LD" || e === "LE" ||
         e === "PE" || e === "PD" || e === "MAE" || e  === "MAD" || e === "ADD" 
         || e === "ADE"
       ) {
         nomeTratado = nomeTratado + " " + e
       }
     })
     return nomeTratado
   }
