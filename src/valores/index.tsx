import React, { useEffect, useState } from 'react'
import { Link, useNavigation, useNavigate } from 'react-router-dom'
import "./Regras.css"
import { artilheiro, assistencia, quintoArtilheiro,campeao, empates, gols, quartoAtilheiro, quartoColocado, quintoColocado, terceiroArtilheiro, terceiroAssistencia, terceiroColocado, viceArtilheiro, viceAssistencia, viceCampeao, vitoria, defezaMenosVazada, defezaQuintaMenosVazada, defezaSegundaMenosVazada, defezaTerceiraMenosVazada, defezaQuartaMenosVazada } from '../valoresDosPremios'
import { formatoMonetario } from '../metodosUteis'
import ModalAtualizarPremiacoes from '../appBar/modais/modalAtualizarPremiacoes'
import { IconButton, MenuItem } from '@mui/material'
import ReplyIcon from '@mui/icons-material/Reply';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import SelectDarkMode from '../appBar/selectDarkMode'

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
          "Quinto lugar - " + formatoMonetario(quintoColocado),
          "Artilheiro - " + formatoMonetario(artilheiro),
          "Vice-Artilheiro - " + formatoMonetario(viceArtilheiro),
          "3º Artilheiro - " + formatoMonetario(terceiroArtilheiro),
          "4º Artilheiro - " + formatoMonetario(quartoAtilheiro),
          "5º Artilheiro - " + formatoMonetario(quintoArtilheiro),
          "Defeza menos vazada - " + formatoMonetario(defezaMenosVazada),
          "Defeza segunda menos vazada - " + formatoMonetario(defezaSegundaMenosVazada),
          "Defeza terceira menos vazada - " + formatoMonetario(defezaTerceiraMenosVazada),
          "Defeza quarta menos vazada - " + formatoMonetario(defezaQuartaMenosVazada),
          "Defeza quinta menos vazada" + formatoMonetario(defezaQuintaMenosVazada),
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
  const h = useNavigate()
  const voltarAoMenuPrincial = ()=>{
     h("/")
  }
  return (
    <div className='RegrasContainer'>
      <h1 style={{display:"flex", justifyContent:"space-between"}}>
        Regras
        <div style={{display:"flex"}}>
          <SelectDarkMode/>
          <MenuItem>
            <ModalAtualizarPremiacoes />
          </MenuItem>
          <IconButton onClick={voltarAoMenuPrincial}>
            <ReplyIcon/>
          </IconButton>
        </div>
      </h1>
      <h5>Gerais</h5>
      <ol>
        {
          carregando ? 
          <CarregandoContainer/>
          : 
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

function CarregandoContainer() {
  return(
    <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <h2>Buscando dados ...</h2>
      <LinearProgress color="primary" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
  </Stack>
  )
}