import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { listarCampeonatoApi, listarTabelaApi } from '../../api/campeonatoApi';
import { useSelector } from 'react-redux';
import { campeonatoType, tabelaCampeonatoType } from '../../types';





export default function CardTabelaDeClassificacao() {
    const [campeonato, setCampeonato] = React.useState<campeonatoType>()
    const atualizarDados = useSelector((state:any)=>state.atualizarDadosReducer.status)
    const [rows, setrows] = React.useState<tabelaCampeonatoType[]>([])
    async function getList(idTorneio:string) {
        const list = await listarCampeonatoApi()
        const tabela = await listarTabelaApi(idTorneio) || []
        setrows(tabela)
        const ultimoCampeonato =list && list[list?.length -1]
        setCampeonato(ultimoCampeonato)
    }
    const torneioAtual = useSelector((state:any)=>state.torneioReducer.torneio)
    let usuarioReducer = useSelector((state:any)=>state.usuarioReducer.usuario)
    let idTorneio = usuarioReducer.torneio[torneioAtual]?.id
    React.useEffect(()=>{
        getList(idTorneio)
    },[atualizarDados, torneioAtual])
    
    return (
        <div>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 150 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell align="left">Equipe</TableCell>
                    <TableCell align="left">P</TableCell>
                    <TableCell align="left">J</TableCell>
                    <TableCell align="left">V</TableCell>
                    <TableCell align="left">E</TableCell>
                    <TableCell align="left">D</TableCell>
                    <TableCell align="left">GP</TableCell>
                    <TableCell align="left">GC</TableCell>
                    <TableCell align="left">SG</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows?.map((row) => (
                    <TableRow
                    key={row.equipe}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="left">{row.equipe}</TableCell>
                    <TableCell align="left">{row.pontos}</TableCell>
                    <TableCell align="left">{row.jogos}</TableCell>
                    <TableCell align="left">{row.vitorias}</TableCell>
                    <TableCell align="left">{row.empates}</TableCell>
                    <TableCell align="left">{row.derrota}</TableCell>
                    <TableCell align="left">{row.golsPro}</TableCell>
                    <TableCell align="left">{row.golsContra}</TableCell>
                    <TableCell align="left">{row.saldoDeGol}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
}
