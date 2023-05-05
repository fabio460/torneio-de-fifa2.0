import React, { useEffect, useState } from 'react'
import "./compraDeJogadores.css"
import Jogadores from './Jogadores'
import { useNavigate } from 'react-router-dom'
import { listarJogadoresApi } from '../api/jogadoresApi'
import { jogadoresType, participantesType } from '../types'
import { getParticipantesPorIdApi } from '../api/participantesApi'
export default function TelaCompraDeJogadores(){
    const h = useNavigate()
    const [elenco, setElenco] = useState<participantesType>()
    const idElenco = localStorage.getItem('idDoElenco') || ''
    async function getElenco() {
        const e = await getParticipantesPorIdApi(idElenco)
        setElenco(e)
    }
    useEffect(()=>{
       getElenco()
    },[])
    return (
        <div>
            {elenco?.nome}
            <div onClick={()=>h('/elenco')} className='itemMenu'>Elenco</div>
            <Jogadores/>
        </div>
    )
}