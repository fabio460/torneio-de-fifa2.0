import React from 'react'
import { Link } from 'react-router-dom'
import "./Regras.css"
export default function Regras() {
  const regras = [
    "Campeâo - 30.000,00",
    "Vice Campeão - 15.000,00",
    "Terceiro colocado - 7.500,00",
    "Quarto lugar - 3.500,00",
    "Artilh/Assist: 15,000,00",
    "Vice-Artilh/Assist: 7,500,00",
    "3º Artilh/Assist: 3,500,00",
    "GOL: 50,00 (cada)",
    "Vitória: 1.500,00",
    "Empate: 750,00",
    "Dispensar jogador - Receba 40% do valor pago pelo jogador abaixo de 89 de overall e 60% acima.",
    "Prêmio bugado ouro - Cupom 50% na compra de jogador",
    "Prêmio bugado prata - Cupom 40% na compra de jogador",
    "Prêmio bugado bronze - Cupom 25% na compra de jogador",
    "Bugado ouro - Combinação única de lider, artilheiro e vice-artilheiro(sem ninguem empatado)",
    "Bugado prata - 3 partidas sem tomar gols",
    "Bugado bronze - 3 hash-trick consecutivos"
  ]

  const regrasImportantes = [
    "Jogadores com valor ZERO no mercado valem 900,00",
    "Negociações de empréstimos ou compras seram feitas apenas no final com inicio de uma temporada(torneio)",
    "Jogador com custo ZERO não são negociáveis"
  ]

    
  let pessoas = [
    {
      nome:"fabio",
      idade:5
    },
    {
      nome:"ana",
      idade:10
    },
    {
      nome:"carlos",
      idade:8
    }
  ]

//   function ordena(array, por) {
//     array.map((a,b)=>{
//        return    
//     })
//   }
//   let p = pessoas.sort((a,b)=> {
//     return a.idade < b.idade ? -1 : a.idade > b.idade ? 1 : 0;
//   });
// console.log(p) 
  return (
    <div className='RegrasContainer'>
      <h1>Regras</h1>
      <h5>Gerais</h5>
      <ol>
        {regras.map(item=>{
          return <li>{item}</li>
        })}
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