import React, { useEffect,useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { statisticasTypes } from '../types';
import { removerDuplicataArrayDeObjetos } from '../metodosUteis';


export default function EstatisticaAssistencia({estatistica}:{estatistica:statisticasTypes[] | undefined}) {
  const [dados, setDados] = useState([])
  const [limiteDeItens, setLimiteDeItens] = useState(5)
  async function getEstatistica() {
      const e = estatistica
      const nomesComRepeticoes = e?.map(item=>{
          return item.melhorAssistente
      }) 
      const u = removerDuplicataArrayDeObjetos(nomesComRepeticoes)
      const usuarios = u?.filter((e:any)=>{
          if (e !== "") {
              return e
          }
      })

   
      let aux:any = []
      usuarios?.filter((usuario:any, key:any)=>{
          let cont = 0          
            nomesComRepeticoes?.filter((item)=>{ 
              if (item === usuario) {
                cont+=1;
              }
            })
            aux.push({name:usuario, Artilharias:cont})
      })
      const ordenada = aux.sort((a:any,b:any)=>{
          return a.Artilharias > b.Artilharias ? -1 : a.Artilharias < b.Artilharias ? 1 : 0
      })
      const primeiros = ordenada?.filter((elem:any, key:any)=>{
          if (key < limiteDeItens) {    
              return elem
          }
      })
      setDados(primeiros.reverse())
  }
  useEffect(()=>{
    getEstatistica()
  },[estatistica])  


    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={dados}
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
          <Area type="monotone" dataKey="Artilharias" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>
      </ResponsiveContainer>
    );
}