import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { tabelaDeResultadosType } from '../types';

type dataType = {
  name:string,
  Sofreu:number
}
export default function EstatisticaAssistencia({lista}:{lista:tabelaDeResultadosType[] | undefined, idDoTorneioSelecionado:string}) {
   
    let aux:dataType[] = []
    let res = lista?.map(e=>{
     return e.resultados.map(r=>{
       return aux.push({name:r.usuario, Sofreu:r.golsTomados})
        
      })
    })
  
    const somaPorNome:any = {};

    aux.forEach((produto) => {
        const { name, Sofreu } = produto;
        if (somaPorNome[name] === undefined) {
            somaPorNome[name] = Sofreu;
        } else {
            somaPorNome[name] += Sofreu;
        }
    });

    let arr1 = JSON.stringify(somaPorNome)?.split('{')[1]?.split("}")[0]?.split(",");
    let dadoFinal = arr1.map(e=>{
      return {
        name:e?.split('"')[1]?.split('"')[0],
        Sofreu:parseInt(e?.split(":")[1])
      }
    })
   
    
    let dadosOrdenados = dadoFinal.sort((a,b)=>{
      return a.Sofreu > b.Sofreu ? 1 : a.Sofreu < b.Sofreu ? -1 :0
    })
    
    return (
      <div className='cardEstatistica'>
        <h5 style={{textAlign:"center"}}>Defeza mais vazada</h5>
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
            <Area type="monotone" dataKey="Sofreu" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
}