import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useDispatch } from 'react-redux';
type propType = {
    setListaFiltradaDeJogadores?:any
}
export default function BuscaDeJogadoresDaLista({setListaFiltradaDeJogadores}:propType) {
    const dispatch = useDispatch()
    function onFocus(e:any) {
        dispatch({
            type:"onFocus",
            payload:{focus:true}
        })
    }
    function onBlur() {
        dispatch({
            type:"onFocus",
            payload:{focus:false}
        })
    }
    return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, mb:2 }}
    >

      <InputBase
        onChange={e=>setListaFiltradaDeJogadores(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        sx={{ ml: 1, flex: 1 }}
        placeholder="pesquisar..."
        inputProps={{ 'aria-label': 'search google maps' }}
      />

    </Paper>
  );
}
