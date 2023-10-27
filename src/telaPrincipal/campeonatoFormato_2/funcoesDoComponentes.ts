import { useDispatch } from "react-redux";
import { atualizarTabelaApi } from "../../api/campeonatoApi";
import { golsType, tabelaCampeonatoType } from "../../types";
import { artilheiro, campeao, empates, gols, quartoAtilheiro, quartoColocado, terceiroArtilheiro, terceiroColocado, viceArtilheiro, viceCampeao, vitoria } from "../../valoresDosPremios";

export function calculaDadosDaTabela(golCasa:any , golFora:any) {
   
    const resultado = [
        {
            id:golCasa.time[0].id,
            idDoParticipante:golCasa.time[0].idParticipante,
            vitorias:golCasa.gol > golFora.gol ? 1 : 0,
            derrota:golFora.gol > golCasa.gol ? 1 : 0,
            empates:golCasa.gol === golFora.gol ? 1 : 0,
            golsPro:golCasa.gol,
            golsContra:golFora.gol,
            jogos:1,
            pontos:golCasa.gol > golFora.gol ? 3 : golCasa.gol === golFora.gol ? 1 : 0,
            saldoDeGol:golCasa.gol - golFora.gol,

        },
        {
            id:golFora.time[0].id,
            idDoParticipante:golFora.time[0].idParticipante,
            vitorias:golFora.gol > golCasa.gol ? 1:0,
            derrota:golCasa.gol > golFora.gol ? 1: 0,
            empates:golCasa.gol === golFora.gol ? 1 : 0,
            golsPro:golFora.gol,
            golsContra:golCasa.gol,
            jogos:1,
            pontos:golFora.gol > golCasa.gol ? 3 : golFora.gol === golCasa.gol ? 1 : 0,
            saldoDeGol:golFora.gol - golCasa.gol,
        },
    ]
    return resultado
}

export const calculoDasPremiacoesDaTabela = (tabela:any)=>{

  function getPostArtilheiro(gols:number) {
    const arrGols = tabela.map((e:any)=>{
      return e.golsPro
    })
    const arrSemDupl = [... new Set(arrGols.sort().reverse())]
    const posicao = arrSemDupl.indexOf(gols);
    return posicao === 0 ? "Artilheiro" : posicao === 1 ? "Vice-Artilheiro": posicao === 2 ? "Terceiro artilheiro": "Quarto artilheiro"
  }
  function unirObjetosIguais(array:any) {
    const resultado:any = {};
    for (const objeto of array) {
      const chave = objeto.golsPro;
      if (!resultado[chave]) {
        resultado[chave] = { golsPro: chave, Ids: [] };
      }
      resultado[chave].Ids.push(objeto.idDoParticipante);
    }
    return Object.values(resultado);
  }
  
  const objetosUnidos = unirObjetosIguais(tabela);
  
  const listaPremios = objetosUnidos.map((e:any, key)=>{
    return e.Ids
  })
  const lista = listaPremios.reverse()

  function getArtilheiro(id:string) {   
      for (let i = 0; i < lista.length; i++) {
        if (lista[i].includes(id)) {
            return artilheiro
        }else{
            if (lista[i+1].includes(id)) {
                return viceArtilheiro
            }else{
                if (lista[i+2].includes(id)) {
                    return terceiroArtilheiro
                }else{
                    if (lista[i+3].includes(id)) {
                        return quartoAtilheiro
                    }else{
                        return 0
                    }
                }
            }
        }
        
      }
  }
    
    return tabela.map((j:any, key:number)=>{
        const Colocacao = key === 0 ? campeao : key === 1 ? viceCampeao : key === 2 ? terceiroColocado : quartoColocado
        const Gols = j.golsPro * gols
        const Vitorias = j.vitorias * vitoria
        const Empates = j.empates * empates
        const Artilharia = getArtilheiro(j.idDoParticipante) || 0
        const Campeoes = key === 0 ? "Campeão": key === 1 ? "Vice-Campeão": key === 2 ? "Terceiro colocado": "Quarto lugar"
        const PosArtilharia = getPostArtilheiro(j.golsPro)
        const quantVitorias = j.vitorias
        const quantGols = j.golsPro
        const quantEmpates = j.empates
        
        return {
          idParticipante:j.idDoParticipante,
          premio: Artilharia + Colocacao + Gols + Vitorias + Empates,
          beneficiado:j,
          Artilharia,
          PremioColocacao:Colocacao,
          Gols,
          Vitorias,
          Empates,
          Campeoes,
          PosArtilharia,
          quantVitorias,
          quantGols,
          quantEmpates
        }
      })
}

