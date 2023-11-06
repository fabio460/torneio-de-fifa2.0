import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { listarCampeonatoApi, listarTabelaApi } from '../../api/campeonatoApi';
import { useDispatch, useSelector } from 'react-redux';
import { campeonatoType, tabelaCampeonatoType } from '../../types';
import { Avatar, Button } from '@mui/material';
import CarregandoBtn from '../../carregandoBtn';
import Carregando from '../../carregando';
import { useNavigate } from 'react-router-dom';





export default function CardTabelaDeClassificacao() {
    const [loading, setloading] = React.useState(false)
    const [campeonato, setCampeonato] = React.useState<campeonatoType>()
    const atualizarDados = useSelector((state:any)=>state.atualizarDadosReducer.status)
    const [rows, setrows] = React.useState<tabelaCampeonatoType[]>([])
    const dispatch = useDispatch()
    async function getList(idTorneio:string) {
        setloading(true)
        const list = await listarCampeonatoApi()
        const tabela = await listarTabelaApi(idTorneio) || []
        setrows(tabela)
        const ultimoCampeonato =list && list[list?.length -1]
        setCampeonato(ultimoCampeonato)
        setloading(false)
    }
    const torneioAtual = useSelector((state:any)=>state.torneioReducer.torneio)
    let usuarioReducer = useSelector((state:any)=>state.usuarioReducer.usuario)
    let idTorneio = usuarioReducer.torneio[torneioAtual]?.id
    async function getTorneio() {
        const camp = await listarCampeonatoApi(idTorneio) || []
        //console.log(camp)
    }
    React.useEffect(()=>{
        getTorneio()
        getList(idTorneio)
    },[atualizarDados, torneioAtual])
    const atualizar = ()=>{
        dispatch({
            type:"atualizarDados",  
            payload:{status:!atualizarDados}
          })
    }
    //console.log(rows)
    const navigate = useNavigate()
    const getParticipante = (e:any)=>{
        localStorage.setItem('idDoElenco', e.idDoParticipante as string)
        navigate('/elenco')
    } 
    return (
        <div>
            <div style={{display:"flex",justifyContent:"flex-end"}}>
              <Button onClick={atualizar}>atualizar</Button>
            </div>
            {
                loading ?
                <div style={{display:"flex",justifyContent:"center", alignItems:"center", height:"10px"}}><Carregando/></div>:
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
                        <TableCell align="left" sx={{display:"flex", alignItems:"center"}}>
                            <Avatar onClick={()=> getParticipante(row)} sx={{marginRight:1,width:"25px", height:"25px", padding:"3px"}} src={row.avatar}/> {row.equipe}</TableCell>
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
            }
        </div>
    );
}
