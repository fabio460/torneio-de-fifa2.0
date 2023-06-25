import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { chekedType } from '../../types';

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
    handleChangePrimeiro:any,
    participantes:chekedType[],
    setPrimeiro?:any
}

export default function Primeiro({handleChangePrimeiro, participantes, setPrimeiro}:propsType) {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
      const {
          target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  let listFilter = participantes.filter(p=>{
      if (personName.includes(p.participante.nome)) {
          return p
        }
  })
   console.log(listFilter)
    
  return (
    <div>
      <FormControl className='modalColocacaoForms' sx={{marginBottom:1, marginTop:2}} size="small">
        <InputLabel id="demo-multiple-checkbox-label">Primeiro lugar</InputLabel>
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
          {participantes.map((p) => (

            <MenuItem key={p.participante.nome} value={p.participante.nome}>
              <Checkbox checked={personName.indexOf(p.participante.nome) > -1} />
              <ListItemText primary={p.participante.nome+"-"} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}