import React, { useEffect,useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { resultadoType, statisticasTypes, tabelaDeResultadosType } from '../types';
import { removerDuplicataArrayDeObjetos } from '../metodosUteis';
import { useSelector } from 'react-redux';

type dadosType = {
  name:string,
  Venceu:string
}
export default function EstatisticaCampeao({lista, idDoTorneioSelecionado}:{ lista:tabelaDeResultadosType[], idDoTorneioSelecionado:string}) {
  const [dados, setDados] = useState<dadosType[]>([])  
  let aux = []
  useEffect(()=>{
    aux = []
    const cam = lista.map((e, key)=>{
      let res = e.resultados.filter(s=>{
        if (s.colocacao==="Campeão") {
          return s?.usuario
        }
      })
      return res[0]?.usuario
    }) 
    const inputArray = cam.reverse()
    const countObject:any = {};
    inputArray.forEach(element => {
      if (countObject[element] === undefined) {
        countObject[element] = 1;
      } else {
        countObject[element]++;
      }
    });
    for (const element in countObject) {
      aux.push({ name: element, Venceu: countObject[element] });
    }
    setDados(aux)
  },[lista, idDoTorneioSelecionado])
   
  const dadosOrdenados = dados.sort((a,b)=>{
    return a.Venceu > b.Venceu ? 1 : a.Venceu < b.Venceu ? -1 :0
  })
    
    return (
      <div className='cardEstatistica'>
        <h5 style={{textAlign:"center"}}>Vencedores</h5>
        <ResponsiveContainer width="100%" maxHeight={300}>
          <AreaChart
            width={500}
            height={400}
            data={dadosOrdenados}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="Venceu" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
}