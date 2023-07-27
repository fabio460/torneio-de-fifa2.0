import React, { PureComponent, useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { statisticasTypes } from '../types';
import { artilheiro } from '../valoresDosPremios';
import { removerDuplicataArrayDeObjetos } from '../metodosUteis';

export default function EstatisticaArtilheiros({estatistica}:{estatistica:statisticasTypes[] | undefined}) {
     
      let lista:any = []
      estatistica?.map((e:any)=>{
        e.artilheiros.map((a:any)=>{
          lista.push(a)
        })
      })
      const occurrences = lista.reduce((acc:any, curr:any) => {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
      }, {});
      
      let str = JSON.stringify(occurrences)
      let list:any = str.split("{")[1].split("}")[0].split(",")
      let data:any=[]
      list.map((e:any)=>{
        data.push({
          name:e.split(":")[0],
          Artilharias:parseInt(e.split(":")[1])
        })
      })
    
    return (
      <div>
        <h5 style={{textAlign:"center"}}>Maiores Artilheiros</h5>
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
            <Area type="monotone" dataKey="Artilharias" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );

}