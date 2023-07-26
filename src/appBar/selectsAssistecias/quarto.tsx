import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { checkedType, chekedType, jogadoresType } from '../../types';
import { quartoAssistencia } from '../../valoresDosPremios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type propsType = {
    handleChangePrimeiro?:any,
    participantes:chekedType[],
    setQuarto?:any
}

export default function Quarto({handleChangePrimeiro, participantes, setQuarto}:propsType) {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
      const {
          target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  let jogadoresSelecionados:any[] = [] 
  participantes.map(p=>{
    p.participante.jogadores.map(j=>{
        jogadoresSelecionados.push(j)
    })
  })
  function getParticipante(id:string) {    
    let Participante = participantes.filter(p=>{
      if (p.participante.id === id) {
        return p
      }
    }) 
    return Participante[0]
  }
  let listaResponse:any = []
  let listFilter = jogadoresSelecionados.filter(p=>{
    if (personName.includes(p.nome)) {
        listaResponse.push({
          jogador:p, 
          participante:getParticipante(p.idParticipante),
          dadosDaApi:{
            idParticipante:p.idParticipante,
            premio:quartoAssistencia
          }
        })
        return p
    }
  })
   
  React.useEffect(()=>{
      setQuarto(listaResponse) 
  },[personName])   
  return (
    <div>
      <FormControl className='modalColocacaoForms' sx={{marginBottom:1, marginTop:2}} size="small">
        <InputLabel id="demo-multiple-checkbox-label">Quarto lugar</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Primeiro lugar" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {
            participantes.map((p) => (
              p.participante.jogadores.map(j=>(
                <MenuItem key={j.nome} value={j.nome}>
                <Checkbox checked={personName.indexOf(j.nome) > -1} />
                <ListItemText primary={j.nome+" ("+p.participante.nome+")"} />
                </MenuItem>     
              ))
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
}