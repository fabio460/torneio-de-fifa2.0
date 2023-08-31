import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { usuarioLogadoType } from '../types';
import { useDispatch } from 'react-redux';
import { darkBackgroundBox, colorDark, dark } from '../temaDark';

export default function SelectTorneio() {
  const dispatch = useDispatch()
  const [age, setAge] = React.useState('0');
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
    localStorage.setItem('selectTorneio',event.target.value)
    dispatch({
      type:"arrayPremiadosReducer",
      payload:{premiados:[]}
    })
  };
  React.useEffect(()=>{
    if (localStorage.getItem('selectTorneio')) {
      setAge(localStorage.getItem('selectTorneio')?.toString() || "0")
    }
  },[])
  const usuario:usuarioLogadoType = useSelector((state:any)=>state.usuarioReducer.usuario)
  dispatch({
    type:"torneio",
    payload:{torneio:age}
  })
  const darkMode = useSelector((state:any)=>state.darkReducer.dark)

  return (
    <div style={{background:dark ? 'inherit':"", color: !darkMode ? colorDark:"" }}>
        <FormControl sx={{ m: 0, minWidth: 200, width:'100%',height:'41px',background:"inherit" }} size="small">
        <InputLabel id="demo-select-small-label" sx={{color: !darkMode ? colorDark:""}}>Torneio</InputLabel>
        <Select
            sx={{width:"100%", background: !darkMode ? darkBackgroundBox:"", color: !darkMode ? colorDark:""}}
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={age}
            label="Age"
            onChange={handleChange}
        >
            {
                usuario.torneio?.map((elem, key)=>{
                    return  <MenuItem sx={{ background: !darkMode ? 'inherit':""}} key={key} value={key}>{elem.nome}</MenuItem>
                })
            }
        </Select>
        </FormControl>
    </div>
  );
}
