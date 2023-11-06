import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { resultadoType } from '../../types';
import { formatoMonetario } from '../../metodosUteis';
import { Avatar } from '@mui/material';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

export default function TabelaPremios({resultados}:{resultados:resultadoType[]}) {
  return (
    <div>
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          <h1>Vencedor</h1>
          <Avatar src={resultados[0]?.beneficiado.avatar} sx={{width:"110px", height:"110px", padding:"12px"}}/>
          {resultados[0]?.beneficiado.equipe}
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1050 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell  sx={{minWidth:"160px"}}>Usuário</TableCell>
              <TableCell align="left" sx={{minWidth:"160px"}}>Colocação</TableCell>
              <TableCell align="left"  sx={{minWidth:"160px"}}>Prêmio de campeão</TableCell>
              <TableCell align="left"  sx={{minWidth:"160px"}}>Artilharia</TableCell>
              <TableCell align="left"  sx={{minWidth:"160px"}}>Prêmio da artilharia</TableCell>
              <TableCell align="left">Vitórias</TableCell>
              <TableCell align="left" sx={{minWidth:"160px"}}>Prêmio das vitórias</TableCell>
              <TableCell align="left">Empates</TableCell>
              <TableCell align="left" sx={{minWidth:"180px"}}>Prêmio dos empates</TableCell>
              <TableCell align="left">Gols</TableCell>
              <TableCell align="left" sx={{minWidth:"160px"}}>Prêmio dos gols</TableCell>
              <TableCell align="left">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultados?.map((row, key) => (
              <TableRow
                key={key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.beneficiado.equipe}
                </TableCell>
                <TableCell align="left">{row.Campeoes}</TableCell>
                <TableCell align="left">{formatoMonetario(row.PremioColocacao)}</TableCell>
                <TableCell align="left">{row.PosArtilharia}</TableCell>
                <TableCell align="left">{formatoMonetario(row.Artilharia)}</TableCell>
                <TableCell align="center">{row.quantVitorias}</TableCell>
                <TableCell align="left">{formatoMonetario(row.Vitorias)}</TableCell>
                <TableCell align="center">{row.quantEmpates}</TableCell>
                <TableCell align="left">{formatoMonetario(row.Empates)}</TableCell>
                <TableCell align="center">{row.quantGols}</TableCell>
                <TableCell align="left">{formatoMonetario(row.Gols)}</TableCell>
                <TableCell align="left">{formatoMonetario(row.premio)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
