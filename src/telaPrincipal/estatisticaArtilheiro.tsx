import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { tabelaDeResultadosType } from '../types';

type dadosType = {
  name:string,
  Fez:number
}
export default function EstatisticaArtilheiros({lista}:{lista:tabelaDeResultadosType[], idDoTorneioSelecionado:string}) {

  let aux:dadosType[] = []
  let res = lista?.map(e=>{
   return e.resultados.map(r=>{
     return aux.push({name:r.usuario, Fez:r.gols})
      
    })
  })

  const somaPorNome:any = {};

  aux.forEach((produto) => {
      const { name, Fez } = produto;
      if (somaPorNome[name] === undefined) {
          somaPorNome[name] = Fez;
      } else {
          somaPorNome[name] += Fez;
      }
  });

  let arr1 = JSON.stringify(somaPorNome)?.split('{')[1]?.split("}")[0]?.split(",");
  let dadoFinal = arr1.map(e=>{
    return {
      name:e?.split('"')[1]?.split('"')[0],
      Fez:parseInt(e?.split(":")[1])
    }
  })
 
  
  let dadosOrdenados = dadoFinal.sort((a,b)=>{
    return a.Fez > b.Fez ? 1 : a.Fez < b.Fez ? -1 :0
  })
  return (
    <div className='cardEstatistica'>
      <h5 style={{textAlign:"center"}}>Melhor ataque</h5>
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
          <Area type="monotone" dataKey="Fez" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

}