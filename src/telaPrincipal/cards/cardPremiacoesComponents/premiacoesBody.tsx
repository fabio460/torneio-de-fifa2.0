import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { artilheirosTypeReducer, assistentesTypeReducer, dadosDoJogoType, selecionadosType } from '../../../types';
import Colocacao from './colocacao';
import Artilheiros from './artilheiros';
import Assistentes from './assistentes';
import GolsVitEmpates from './golsVitEmpates';

export default function PremiacoesBody() {
    const premiados = useSelector((state:any)=>state.arrayPremiadosReducer.premiados)
    if (premiados.length === 0) {
        return <div className='naoHaDados'>
            Insira os dados das premiações!
        </div>
    }else{
        return (
            <div>  
                <Colocacao/>
                <Artilheiros/>   
                <Assistentes/>
                <GolsVitEmpates/>       
            </div>
        );
    }
}
