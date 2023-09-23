import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Icon_1_blue.svg/512px-Icon_1_blue.svg.png')`,
        borderRadius:"50%",
        backgroundPosition:"center",
        backgroundSize: "cover"
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      
      backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/0/0f/Icon_2_%28set_f%29.png')`,
      borderRadius:"50%",
      backgroundPosition:"center",
      backgroundSize: "cover"    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));


export default function SwitchSelecioarTipoDeTorneio() {
    const tipoDeTorneio = useSelector((state:any)=>state.selectFormatoDaCompeticaoReducer.tipo);
  const [state, setState] = React.useState(tipoDeTorneio === "1"?true:false)  
  const dispatch = useDispatch()
  const selectType = ()=>{
     setState(!state)
     dispatch({
        type:"selectFormatoDaCompeticao",
        payload:{tipo:state?"2":"1"}
     })
     localStorage.setItem("tipoDeTorneio",state?"2":"1")
  }  

  return (
    <FormGroup>
      <FormControlLabel
        onChange={selectType}
        control={<MaterialUISwitch sx={{ m: 0 }} checked={state} />}
        label={`Formato ${tipoDeTorneio}`}
      />
 
    </FormGroup>
  );
}
