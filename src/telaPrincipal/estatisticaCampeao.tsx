import React, { useEffect,useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { statisticasTypes } from '../types';
import { removerDuplicataArrayDeObjetos } from '../metodosUteis';
import { useSelector } from 'react-redux';


export default function EstatisticaCampeao({estatistica}:{estatistica:statisticasTypes[] | undefined}) {
  const torneioReducer = useSelector((state:any)=>state.torneioReducer.torneio)
  const [dados, setDados] = useState([])
  const [limiteDeItens, setLimiteDeItens] = useState(5)
  async function getEstatistica() {
      const e = estatistica
      
      const nomesComRepeticoes = e?.map(item=>{
          return item.vencedor
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
            aux.push({name:usuario, Campeao:cont})
      })
      const ordenada = aux.sort((a:any,b:any)=>{
          return a.Campeao > b.Campeao ? -1 : a.Campeao < b.Campeao ? 1 : 0
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
  },[torneioReducer,estatistica])  


    return (
      <div>
        <h5 style={{textAlign:"center"}}>Meiores Vencedores</h5>
        <ResponsiveContainer width="100%" height="90%">
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
            <Area type="monotone" dataKey="" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="Campeao" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
}