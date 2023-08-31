import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { artilheirosTypeReducer, assistentesTypeReducer, dadosDoJogoType, jogadoresType, selecionadosType, usuarioLogadoType } from '../../types';
import { pagarFolhasApi, pagarPremiacoesApi } from '../../api/pagamentosApi';
import { adicionarEstatisticaApi } from '../../api/estatisticasApi';
import CarregandoBtn from '../../carregandoBtn';
import { torneioType } from '../../types';
import ModalConfirmarPagamentoPremiacao from '../modais/modalConfirmarPagPrem';
import ModalConfirmaPagamentoFolha from '../modais/modalConfirPagFolha';
import PremiacoesBody from './cardPremiacoesComponents/premiacoesBody';
import { darkBackgroundBox, colorDark, dark } from '../../temaDark';

export default function CradPremiacoes({usuario}:{usuario:usuarioLogadoType | undefined}) {
  const darkMode = useSelector((state:any)=>state.darkReducer.dark)

  return (
    <Card sx={{background:!darkMode ? darkBackgroundBox:"", color: !darkMode ? colorDark:"", minWidth: 275, display:"flex", flexDirection:"column", justifyContent:"space-between" }} >
      <CardContent  className='cardPremiacoesContainer'>
         <PremiacoesBody/>
      </CardContent>
      <CardActions sx={{}}>
        <div className='btnPagamentos'>
            <ModalConfirmarPagamentoPremiacao
               usuario={usuario}
               icone={false}
            />
            <ModalConfirmaPagamentoFolha icone={false}/>
        </div>
      </CardActions>
    </Card>
  );
}
