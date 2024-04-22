import { useDispatch } from "react-redux";
import { atualizarTabelaApi } from "../../api/campeonatoApi";
import { golsType, resultadoType, tabelaCampeonatoType, tabelaType } from "../../types";
import { artilheiro, campeao, defezaMenosVazada, defezaQuartaMenosVazada, defezaSegundaMenosVazada, defezaTerceiraMenosVazada, empates, gols, quartoAtilheiro, quartoColocado, terceiroArtilheiro, terceiroColocado, viceArtilheiro, viceCampeao, vitoria } from "../../valoresDosPremios";
import { type } from "os";


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

export const calculoDasPremiacoesDaTabela = (tabela:tabelaType[], dataDeInicio?:string | undefined)=>{

  function MenosVazada(golsSofridos:number) {
    const arrGols = tabela.map((e)=>{
      return e.golsContra
    })
    const arrSemDupl = [... new Set(arrGols.sort((a, b) => b - a))]
    const posicao = arrSemDupl.indexOf(golsSofridos);
    return posicao === (arrSemDupl.length -1) ? "Menos-Vazada" : posicao === (arrSemDupl.length -2) ? "Segundo-Menos-Vazada": posicao === (arrSemDupl.length -3) ? "Terceiro-Menos-Vazada": posicao === (arrSemDupl.length -4) ? "Quarto-Menos-Vazada" : "Sem premiação"

  }
  function getPostArtilheiro(gols:number) {
    const arrGols = tabela.map((e)=>{
      return e.golsPro
    })
    const arrSemDupl = [... new Set(arrGols.sort((a, b) => b - a))]
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
    
    return tabela.map((j, key:number)=>{
        const Colocacao = key === 0 ? campeao : key === 1 ? viceCampeao : key === 2 ? terceiroColocado : key === 3 ?quartoColocado : 0
        const Gols = j.golsPro * gols
        const Vitorias = j.vitorias * vitoria
        const Empates = j.empates * empates
        const Artilharia = getArtilheiro(j.idDoParticipante) || 0
        const Campeoes = key === 0 ? "Campeão": key === 1 ? "Vice-Campeão": key === 2 ? "Terceiro colocado": key === 3 ? "Quarto lugar" : "Fora do G4"
        const PosArtilharia = getPostArtilheiro(j.golsPro)
        const quantVitorias = j.vitorias
        const quantGols = j.golsPro
        const quantEmpates = j.empates
        const posicaoDefezaMenosVazada = MenosVazada(j.golsContra)
        const premioDefezaMenosVazada = MenosVazada(j.golsContra) === "Menos-Vazada"? defezaMenosVazada: MenosVazada(j.golsContra) === "Segundo-Menos-Vazada"? defezaSegundaMenosVazada : MenosVazada(j.golsContra) === "Terceiro-Menos-Vazada" ? defezaTerceiraMenosVazada  : MenosVazada(j.golsContra) === "Quarto-Menos-Vazada" ? defezaQuartaMenosVazada : 0
        
        return {
          idParticipante:j.idDoParticipante,
          premio: Artilharia + Colocacao + Gols + Vitorias + Empates + premioDefezaMenosVazada,
          dataDeInicio,
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
          quantEmpates,
          posicaoDefezaMenosVazada,
          premioDefezaMenosVazada
        }
      })
}

