import React, { useEffect,useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { statisticasTypes, tabelaDeResultadosType } from '../types';
import { removerDuplicataArrayDeObjetos } from '../metodosUteis';

type dataType = {
  name:string,
  Defesa:number
}
export default function EstatisticaAssistencia({lista, idDoTorneioSelecionado}:{lista:tabelaDeResultadosType[] | undefined, idDoTorneioSelecionado:string}) {
    const [dados, setDados] = useState([])
    const data:dataType[] = [{name:"fabio", Defesa:3}]
   
  
    return (
      <div className='cardEstatistica'>
        <h5 style={{textAlign:"center"}}>Melhores Assistentes</h5>
        <ResponsiveContainer width="100%" maxHeight={300}>
          <AreaChart
            width={500}
            height={400}
            data={data}
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