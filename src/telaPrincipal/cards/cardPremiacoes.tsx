import React,{useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useSelector } from 'react-redux';
import { usuarioLogadoType } from '../../types';
import ModalConfirmarPagamentoPremiacao from '../modais/modalConfirmarPagPrem';
import ModalConfirmaPagamentoFolha from '../modais/modalConfirPagFolha';
import PremiacoesBody from './cardPremiacoesComponents/premiacoesBody';
import { darkBackgroundBox, colorDark, dark } from '../../temaDark';
import SwitchSelecioarTipoDeTorneio from './cardPremiacoesComponents/switchtSelecionarTipoDeTorneio';
import CampeonatoFormato_2 from '../campeonatoFormato_2';
import BtnActions from '../campeonatoFormato_2/btnActions';

export default function CradPremiacoes({usuario}:{usuario:usuarioLogadoType | undefined}) {
  const darkMode = useSelector((state:any)=>state.darkReducer.dark)
  const tipoDeTorneio = useSelector((state:any)=>state.selectFormatoDaCompeticaoReducer.tipo);
  
  return (
    <Card sx={{ minWidth: 275, display:"flex", flexDirection:"column", justifyContent:"space-between", border:"solid 1px black" }} >
      <div style={{display:"flex", justifyContent:"flex-end", marginTop:"10px"}}>
          <SwitchSelecioarTipoDeTorneio/>
      </div>
      <div>
        <CardContent  className='cardPremiacoesContainer'>
          {
            tipoDeTorneio && tipoDeTorneio === "1"?
            <PremiacoesBody/>
            :
            <CampeonatoFormato_2/>
          }
        </CardContent>
        <CardActions  sx={{display:"flex"}}>
          <div className='BtnsCardCampeonato2'>
            {
              tipoDeTorneio && tipoDeTorneio === "2"?
              <div>
                <BtnActions  usuario={usuario}/>
              </div>:
            <div className='btnPagamentos'>
                <ModalConfirmarPagamentoPremiacao usuario={usuario} icone={false}/>
                <ModalConfirmaPagamentoFolha icone={false}/>
            </div>
            }
          </div>
        </CardActions>
      </div>
    </Card>
  );
}
