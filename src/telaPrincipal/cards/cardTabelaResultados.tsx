import React,{useState, useEffect} from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { resultadoType } from '../../types';
import { formatoMonetario, getDataTorneio, getHoraTorneio } from '../../metodosUteis';
import { Avatar, IconButton } from '@mui/material';
import BtnDeleteTabelaResultados from '../campeonatoFormato_2/btnDeleteTabelaResultado';
import { useSelector } from 'react-redux';
export default function CardTabelaResultados({resultadosApi}:any) {
  
  const tor = useSelector((state:any)=>state.torneioReducer.torneio)
  const torneio = useSelector((state:any)=>state.usuarioReducer.usuario.torneio[tor])
  const [pagina, setPagina] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPagina(value);
  };
  let resultadoFilter = resultadosApi?.filter((e:any)=>{
    if (e?.idDoTorneio === torneio?.id) {
      return e
    }
  })

  const qtdPorPagina = 4
  let inicioDaPagina = qtdPorPagina*pagina - qtdPorPagina
  let finalDaPagina = qtdPorPagina*pagina - 1
  const resultadoOrdenadoPorColocacao = (array:[])=>{
     const res = array.sort((a:any,b:any)=>{
      return a.premioColocacao > b.premioColocacao ? -1 : a.premioColocacao < b.premioColocacao ? 1 : 0
     })
     return res
  }

  const paginado = resultadoFilter?.reverse().filter((elem:any, key:any)=>{
    if (key >= inicioDaPagina  && key < finalDaPagina) {
      return elem
    }
   })
  const tamanhoDoArray = resultadoFilter?.reverse().length
  const quantPagina = Math.round(Math.ceil(tamanhoDoArray/qtdPorPagina))
   
  return (
    <div>
        <h2 style={{textAlign:"center"}}>Torneios anteriores</h2>
        {
          tamanhoDoArray > 4 &&
          <div className='paginacao'>
            <Stack spacing={2}>
              <Pagination count={quantPagina} color="primary" page={pagina} onChange={handleChange}/>
            </Stack>
          </div>
        }
        {
          paginado.map((res:any, key:number)=>{
            return <div key={key} style={{padding:"30px opx"}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <div style={{marginTop:"30px"}}>Torneio encerrado em {getDataTorneio(res.data)} as {getHoraTorneio(res.data)}</div>
                  <BtnDeleteTabelaResultados tabela={res}/>
              </div>
              <TableContainer component={Paper} sx={{margin:"30px opx"}}>
                  <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                      <TableHead>
                      <TableRow>
                          <TableCell align='center' sx={{minWidth:"60px"}}>Usuário</TableCell>
                          <TableCell align="left" sx={{minWidth:"20px"}}>Pontos</TableCell>
                          <TableCell align="left" sx={{minWidth:"160px"}}>Colocação</TableCell>
                          <TableCell align="left"  sx={{minWidth:"160px"}}>Prêmio de campeão</TableCell>
                          <TableCell align="left"  sx={{minWidth:"160px"}}>Artilharia</TableCell>
                          <TableCell align="left"  sx={{minWidth:"160px"}}>Prêmio da artilharia</TableCell>
                          <TableCell align="left">Gols</TableCell>
                          <TableCell align="left" sx={{minWidth:"160px"}}>Prêmio dos gols</TableCell>
                          <TableCell align="left">Vitórias</TableCell>
                          <TableCell align="left" sx={{minWidth:"160px"}}>Prêmio das vitórias</TableCell>
                          <TableCell align="left">Empates</TableCell>
                          <TableCell align="left" sx={{minWidth:"180px"}}>Prêmio dos empates</TableCell>
                          <TableCell align="left">Total</TableCell>
                      </TableRow>
                      </TableHead>
                      <TableBody>
                        { resultadoOrdenadoPorColocacao(res.resultados)?.map((row:any, key:any) => (
                            <TableRow
                            key={key}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row"  sx={{display:"flex"}}>
                               <Avatar sx={{marginRight:1,width:"20px", height:"20px"}} src={row.avatar}/>
                                {row.usuario}
                            </TableCell>
                            <TableCell align="center" sx={{minWidth:"60px"}}>{row.vitorias*3 + row.empates}</TableCell>
                            <TableCell align="left">{row.colocacao}</TableCell>
                            <TableCell align="left">{formatoMonetario(row.premioColocacao)}</TableCell>
                            <TableCell align="left">{row.artilharia}</TableCell>
                            <TableCell align="left">{formatoMonetario(row.premioArtilharia)}</TableCell>
                            <TableCell align="center">{row.gols}</TableCell>
                            <TableCell align="left">{formatoMonetario(row.premioGols)}</TableCell>
                            <TableCell align="center">{row.vitorias}</TableCell>
                            <TableCell align="left">{formatoMonetario(row.premioVitorias)}</TableCell>
                            <TableCell align="center">{row.empates}</TableCell>
                            <TableCell align="left">{formatoMonetario(row.premioEmpates)}</TableCell>
                            <TableCell align="left">{formatoMonetario(row.total)}</TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                  </Table>
              </TableContainer>
            </div>
          })
        }
    </div>
  )
}
