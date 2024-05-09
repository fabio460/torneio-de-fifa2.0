import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Regras.css"
import { artilheiro, assistencia, campeao, empates, gols, quartoColocado, terceiroArtilheiro, terceiroAssistencia, terceiroColocado, viceArtilheiro, viceAssistencia, viceCampeao, vitoria } from '../valoresDosPremios'
import { formatoMonetario } from '../metodosUteis'

export default function Regras() {
  const [carregando, setCarregando] = useState(true)
  const regrasImportantes = [
    "Jogadores com valor ZERO no mercado valem 900,00",
    "Negociações de empréstimos ou compras seram feitas apenas no final com inicio de uma temporada(torneio)",
    "Jogador com custo ZERO não são negociáveis"
  ]

  const [dados, setDados] = useState<string[]>([])
  useEffect(()=>{
    setTimeout(() => {
        let regras = [
          "Campeâo - "+formatoMonetario(campeao),
          "Vice Campeão - " + formatoMonetario(viceCampeao),
          "Terceiro colocado - " + formatoMonetario(terceiroColocado),
          "Quarto lugar - " + formatoMonetario(quartoColocado),
          "Artilheiro - " + formatoMonetario(artilheiro),
          "Assistência - " + formatoMonetario(assistencia),
          "Vice-Artilheiro - " + formatoMonetario(viceArtilheiro),
          "Vice-Assistente - " + formatoMonetario(viceAssistencia),
          "3º Artilheiro - " + formatoMonetario(terceiroArtilheiro),
          "3° Assistente" + formatoMonetario(terceiroAssistencia),
          "GOL - " + formatoMonetario(gols),
          "Vitória - " + formatoMonetario(vitoria),
          "Empate - " + formatoMonetario(empates),
          "Dispensar jogador - Receba 40% do valor pago pelo jogador abaixo de 89 de overall e 60% acima.",
          "Prêmio bugado ouro - Cupom 50% na compra de jogador",
          "Prêmio bugado prata - Cupom 40% na compra de jogador",
          "Prêmio bugado bronze - Cupom 25% na compra de jogador",
          "Bugado ouro - Combinação única de lider, artilheiro e vice-artilheiro(sem ninguem empatado)",
          "Bugado prata - 3 partidas sem tomar gols",
          "Bugado bronze - 3 hash-trick consecutivos"
        ]
      
      setDados(regras)
      setCarregando(false)
    }, 1500);
  },[])
  
  return (
    <div className='RegrasContainer'>
      <h1>Regras</h1>
      <h5>Gerais</h5>
      <ol>
        {
          carregando ? <div>Carregando dados...</div>: 
          dados.map(item=>{
            return <li>{item}</li>
          })
        }
      </ol>
      <h5>Importantes</h5>
      <ol>
        {regrasImportantes.map(item=>{
          return <li>{item}</li>
        })}
      </ol>
      <Link to={"/"}>Voltar ao menu principal</Link>
    </div>
  )
}