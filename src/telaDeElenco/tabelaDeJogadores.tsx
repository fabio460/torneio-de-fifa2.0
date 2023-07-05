import React,{useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { checkedType, jogadoresType, participantesType } from '../types';
import { formatoMonetario } from '../metodosUteis';
import { Avatar } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { Button } from 'react-bootstrap';
import ModalTransferenciaDeJogador from './modais/modalTransferenciaDeJogador';
import ModalDespensarJogador from './modais/modalDespensarJogador';
import { listarParticipantesApi } from '../api/participantesApi';
import { getTorneioPorIdApi } from '../api/torneioApi';
import { traduzirPosicao } from '../telaCompraDeJogadores/Jogadores/metodosUteis';
import { Link } from 'react-router-dom';
import ScrollComponents from '../ScrollComponent';


export default function TabelaDeJogadores({jogadores, elenco}:{
     jogadores:jogadoresType[] | undefined,
     elenco:participantesType | undefined
    }) {
    const [checked, setChecked] = React.useState<checkedType>();
    const [checkedList, setCheckedList] = useState<checkedType[]>([])
    const [participantes, setParticipantes] = useState()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, selecionado:boolean) => {
        let jogador = JSON.parse(event.target.id)
        setChecked({jogador,selecionado})
    };

    const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>, data:boolean)=>{
       
    }
    
    function handleSelected() {
        if (checked?.selecionado) {
            setCheckedList([...checkedList,checked])
        }else{
            let checkados:checkedType[] = checkedList.filter(c=>{
                if (checked?.jogador.id !== c.jogador.id) {
                    return c
                }
            })
            setCheckedList(checkados)
        }
    }  
    async function getTorneio() {
       const part = await getTorneioPorIdApi(elenco?.idTorneio)
       setParticipantes(part)
    }

    useEffect(() => {
       getTorneio()
    }, [])
    useEffect(() => {
        handleSelected()
    }, [checked])
    
    const somaDosValores = ()=>{
        return checkedList.reduce((acc:any, valor:checkedType)=>{
           return acc + parseFloat(valor.jogador.valorDoJogador || '')*(
            parseInt(valor.jogador.overall) < 90 ? 0.4 : 0.6
           )
        },0)
    }
  return (
    <div>
        {
            elenco?.saldo && elenco?.saldo < 0 ?
            <div style={{textAlign:"center",margin:"20px 0px", color:"#ef5350"}}>
                Saldo negativo {formatoMonetario(elenco?.saldo)}
                <div>voçê precisa dispensar jogadores para participar novamente!</div>    
            </div>:
            <div style={{textAlign:"center",margin:"20px 0px", color:"#4caf50"}}>Saldo {formatoMonetario(elenco?.saldo)}</div>
        }
        <div className='tabelaDeJogadoresBtnContainer'>
            {
                checkedList.length > 0 && 
                <div className='tabelaDeJogadoresBtnGrupo'>                 
                   <ModalDespensarJogador listaDeSelecionados={checkedList} elenco={elenco}/> 
                   <ModalTransferenciaDeJogador listaDeSelecionados={checkedList} elenco={elenco} torneio={participantes}/>
                </div>
            }
        </div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>
                    <Checkbox
                        onChange={handleChangeAll}
                        inputProps={{ 'aria-label': 'controlled' }}
                        />
                </TableCell>
                
                <TableCell> </TableCell>
                <TableCell>Nome</TableCell>
                <TableCell >Overall</TableCell>
                <TableCell >Valor do jogador</TableCell>
                <TableCell >Posição</TableCell>
                <TableCell >Time de origem</TableCell>
                <TableCell >Link do Só fifa</TableCell>
                <TableCell >Nacionalidade</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {jogadores?.map((jog) => (
                <TableRow
                key={jog.nome}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row" >
                        <Checkbox
                            id={JSON.stringify(jog)}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />  
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Avatar src={jog.imagemDoJogador} alt='sem imagem'/>
                    </TableCell>  
                    
                    <TableCell component="th" scope="row">
                        {jog.nome}
                    </TableCell>
                    <TableCell >{jog.overall}</TableCell>
                    <TableCell >{formatoMonetario(parseFloat(jog?.valorDoJogador || ''))}</TableCell>
                    <TableCell >{traduzirPosicao(jog.posicao)}</TableCell>
                    <TableCell>
                        <div style={{display:"flex", alignItems:"center"}}>
                          <Avatar src={jog.escudoDoTime} sx={{width:"20px",height:"20px", marginRight:1}}/>{jog.time}
                        </div>
                    </TableCell>
                    <TableCell ><Link to={jog.linkSoFifa}>{jog.nome}</Link></TableCell>
                    <TableCell>
                        <div style={{display:"flex", alignItems:"center"}}>
                          <Avatar src={jog.imagemDaNacionalidade} sx={{width:"20px",height:"20px", marginRight:1}}/>{jog.nacionalidade}
                        </div>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        <ScrollComponents>
            <div className='tabelaDeJogadoresBtnContainer'>
                {
                    checkedList.length > 0 && 
                    <div className='tabelaDeJogadoresBtnGrupo'>                 
                        <ModalDespensarJogador listaDeSelecionados={checkedList} elenco={elenco}/> 
                        <ModalTransferenciaDeJogador listaDeSelecionados={checkedList} elenco={elenco} torneio={participantes}/>
                    </div>
                }
            </div>
        </ScrollComponents>
    </div>
  );
}
