import { listarPremiacoesApi } from "./api/premiacoesApi";

export let campeao = 30000;
export let viceCampeao = 15000;
export let terceiroColocado = 7500;
export let quartoColocado = 3500;
export let artilheiro = 15000;
export let viceArtilheiro = 7500;
export let terceiroArtilheiro = 3500;
export let quartoAtilheiro = 1000;
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
export let defezaQuartaMenosVazada = 1000;

export let  premiacoesApi = listarPremiacoesApi()
async function getPremiacoes() {
    const res = await listarPremiacoesApi()
    campeao = res[0].campeao
    viceCampeao = res[0].viceCampeao
    defezaMenosVazada = res[0].defezaMenosVazada
    defezaQuartaMenosVazada = res[0].defezaQuartaMenosVazada
    defezaSegundaMenosVazada = res[0].defezaSegundaMenosVazada
    defezaTerceiraMenosVazada = res[0].defezaTerceiraMenosVazada
    empates = res[0].empates
    gols = res[0].gols
    quartoAssistencia = res[0].quartoAssistencia
    quartoAtilheiro = res[0].quartoAtilheiro
    quartoColocado = res[0].quartoColocado
    terceiroArtilheiro = res[0].terceiroArtilheiro
    terceiroAssistencia = res[0].terceiroAssistencia
    terceiroColocado = res[0].terceiroColocado
    viceArtilheiro = res[0].viceArtilheiro
    viceAssistencia = res[0].viceAssistencia
    vitoria = res[0].vitoria
    artilheiro = res[0].artilheiro
    assistencia = res[0].assistencia
    return res
}
getPremiacoes()