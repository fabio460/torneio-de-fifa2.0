import { getUsuarioPorIdApi } from "./api/usuarioApi"
import { listaDeJogadores } from "./listaDeJogadoresCompleta"
import { jogadoresType, timesType, usuarioLogadoType } from "./types"

export const idDoUsuarioLogado = localStorage.getItem('idDoUsuarioLogado') || ''

export const usuarioLogado = (localStorage.getItem('usuarioLogado') !== "undefined" && localStorage.getItem('usuarioLogado') ) && JSON?.parse(localStorage.getItem('usuarioLogado') || '')

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

   export const tratarValorDoJogador = (valor:string | undefined)=>{
       let valorArray = valor?.split('.') || ''
       return valorArray[0]
   }

   export const traduzirParaInglesArrayDePosicoes = (array:string[])=>{
      let arrAux = []
      arrAux = array.map((p, key)=>{
        switch (p) {
          case 'GOL':
              return 'GK'
          case 'ZAG':
              return 'CB'
          case 'LD':
              return 'RB'
          case 'LE':
              return 'LB'
          case 'VOL':
              return 'CDM'
          case 'MC':
              return 'CM'
          case 'MD':
              return 'RM'
          case 'ME':
              return 'LM'
          case 'MEI':
              return 'CAM'
          case 'PE':
              return 'LW'
          case 'PD':
              return 'RW'
          case 'SA':
              return 'CF'
          case 'ATA':
              return 'ST'    
          default:
              return ''
        }
       })     
      return arrAux
   }
   
export function refinaPosicao(jogadores:jogadoresType[] | undefined) {
    jogadores = jogadores?.sort((a:jogadoresType,b:jogadoresType)=>{
      return a.overall < b.overall ? 1 : a.overall > b.overall ? -1 : 0
    })

    const ATA = jogadores?.find(e=>{
      if (e.posicao.split(',')[0] === 'ST' || e.posicao.split(',')[0] === 'CF') {
        return e
      }
    })
    const PE = jogadores?.find(e=>{
      if (e.posicao.split(',')[0] === 'LW' || e.posicao.split(',')[0] === 'LM') {
        return e
      }
    })    
    const PD = jogadores?.find(e=>{
      if (e.posicao.split(',')[0] === 'RW' || e.posicao.split(',')[0] === 'RM') {
        return e
      }
    })
    const MEI = jogadores?.find(e=>{
      if (e.posicao.split(',')[0] === 'CM' || e.posicao.split(',')[0] === 'CAM') {
        return e
      }
    })
    const MEI2 = jogadores?.reverse()?.find(e=>{
      if (e.posicao.split(',')[0] === 'CM' || e.posicao.split(',')[0] === 'CAM') {
        return e
      }
    })
    const VOL = jogadores?.find(e=>{
      if (e.posicao.split(',')[0] === 'CDM') {
        return e
      }
    })
    const LE = jogadores?.find(e=>{
      if (e.posicao.split(',')[0] === 'LB') {
        return e
      }
    })
    const LD = jogadores?.find(e=>{
      if (e.posicao.split(',')[0] === 'RB') {
        return e
      }
    })
  
    const ZAG = jogadores?.find(e=>{
      if (e.posicao.split(',')[0] === 'CB') {
        return e
      }
    })
    const ZAG2 = jogadores?.reverse()?.find(e=>{
      if (e.posicao.split(',')[0] === 'CB') {
        return e
      }
    })
    const GOL = jogadores?.find(e=>{
      if (e.posicao.split(',')[0] === 'GK') {
        return e
      }
    })
    
    let titulares:any = []
    titulares.push(ATA)
    titulares.push(PE)
    titulares.push(PD)  
    titulares.push(MEI)
    titulares.push(MEI2)
    titulares.push(VOL)
    titulares.push(LE)
    titulares.push(LD)
    titulares.push(ZAG)
    titulares.push(ZAG2)
    titulares.push(GOL)
    let reservas:any = jogadores?.filter(e=>{
      if (!titulares?.includes(e)) {
        return e
      }
    })
    return [...removerDuplicataArrayDeObjetos(titulares), ...reservas]
  }


  export function removerDuplicataArrayDeObjetos(arrayDeObjetos:any){
    let arrayDeObjetos2 = arrayDeObjetos.filter((value:any, index:any, array:any) => array.indexOf(value) === index);
    const parsed_array = arrayDeObjetos?.map((val:any)=>{
      return JSON?.stringify(val)
    })
    return parsed_array?.filter((value:any, ind:any)=> 
     parsed_array.indexOf(value) == ind)
    .map((val:any)=>{ return val && JSON?.parse(val)})
  }
  export const getTimes = ()=>{
    let arrayTimes = listaDeJogadores.map((j:jogadoresType, key:number)=>{
      if(key < listaDeJogadores.length){
        return j.time+"-"+j.escudoDoTime
      }
    })
    const timesName = [... new Set(arrayTimes)]

    return timesName.map((t, key)=>{
        return {
          label: t?.split("-")[0],
          escudo: t?.split("-")[1],
          key
        }
    })
  }
  export function getTimeName() {
    let arrayTimes:any = listaDeJogadores.map((j:jogadoresType, key:number)=>{
      if(key < listaDeJogadores.length){
        return {label:j.time}
      }
    })
    const timesName = removerDuplicataArrayDeObjetos(arrayTimes)
    return timesName
  }
  export function getJogadoresPorTime(time:string) {
    if(time){
      let jogadores = listaDeJogadores.filter((j:jogadoresType, key)=>{
         if (j.time === time) {
            return j
         }
      })
      return jogadores;
    }else{
      return []
    }
  }
  export function getEmblemaDoTime(time:string) {
    if(time){
      let emblema = listaDeJogadores.find((j:jogadoresType, key)=>{
         if (j.time === time) {
            return j
         }
      })
      return emblema?.escudoDoTime;
    }else{
      return ""
    }
  }