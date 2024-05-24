import { listarPremiacoesApi } from "./api/premiacoesApi";

export let campeao = 30000;
export let viceCampeao = 15000;
export let terceiroColocado = 7500;
export let quartoColocado = 3500;
export let quintoColocado = 1500;
export let artilheiro = 15000;
export let viceArtilheiro = 7500;
export let terceiroArtilheiro = 3500;
export let quartoAtilheiro = 2000;
export let quintoArtilheiro = 0;
export let gols = 50;
export let vitoria = 1500;
export let empates = 750;
export let assistencia = 15000;
export let viceAssistencia = 7500;
export let terceiroAssistencia = 3500;
export let quartoAssistencia = 1000;
export let defezaMenosVazada = 15000;
export let defezaSegundaMenosVazada = 7500;
export let defezaTerceiraMenosVazada = 3500;
export let defezaQuartaMenosVazada = 2000;
export let defezaQuintaMenosVazada = 1000

export let  premiacoesApi = listarPremiacoesApi()
async function getPremiacoes() {
    const res = await listarPremiacoesApi()
    campeao = res[0].campeao
    viceCampeao = res[0].viceCampeao
    terceiroColocado = res[0].terceiroColocado
    quartoColocado = res[0].quartoColocado
    quintoColocado = res[0].quintoColocado
    defezaMenosVazada = res[0].defezaMenosVazada
    defezaSegundaMenosVazada = res[0].defezaSegundaMenosVazada
    defezaTerceiraMenosVazada = res[0].defezaTerceiraMenosVazada
    defezaQuartaMenosVazada = res[0].defezaQuartaMenosVazada
    defezaQuintaMenosVazada = res[0].defezaQuintaMenosVazada
    artilheiro = res[0].artilheiro
    viceArtilheiro = res[0].viceArtilheiro
    terceiroArtilheiro = res[0].terceiroArtilheiro
    quartoAtilheiro = res[0].quartoAtilheiro
    quintoArtilheiro = res[0].quintoArtilheiro
    vitoria = res[0].vitoria
    empates = res[0].empates
    gols = res[0].gols
    return res
}
getPremiacoes()