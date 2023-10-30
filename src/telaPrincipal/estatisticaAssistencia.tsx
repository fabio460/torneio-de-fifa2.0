import React, { useEffect,useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { statisticasTypes, tabelaDeResultadosType } from '../types';
import { removerDuplicataArrayDeObjetos } from '../metodosUteis';

type dataType = {
  name:string,
  Defesa:number
}
export default function EstatisticaAssistencia({lista, idDoTorneioSelecionado}:{lista:tabelaDeResultadosType[] | undefined, idDoTorneioSelecionado:string}) {
    const [dados, setDados] = useState<dataType[]>([])
    const data:dataType[] = [{name:"fabio", Defesa:3}]
   
    let aux:dataType[] = []
    let res = lista?.map(e=>{
     return e.resultados.map(r=>{
       return aux.push({name:r.usuario, Defesa:r.golsTomados})
        
      })
    })
  
    const somaPorNome:any = {};

    aux.forEach((produto) => {
        const { name, Defesa } = produto;
        if (somaPorNome[name] === undefined) {
            somaPorNome[name] = Defesa;
        } else {
            somaPorNome[name] += Defesa;
        }
    });

    let arr1 = JSON.stringify(somaPorNome).split('{')[1].split("}")[0].split(",");
    console.log(arr1)
    let dadoFinal = arr1.map(e=>{
      return {
        name:e.split('"')[1].split('"')[0],
        Defesa:parseInt(e.split(":")[1])
      }
    })
   
    
    let dadosOrdenados = dadoFinal.sort((a,b)=>{
      return a.Defesa > b.Defesa ? 1 : a.Defesa < b.Defesa ? -1 :0
    })
    console.log(dadosOrdenados)
    return (
      <div className='cardEstatistica'>
        <h5 style={{textAlign:"center"}}>Defesa mais vazada</h5>
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
            <Area type="monotone" dataKey="Defesa" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
}