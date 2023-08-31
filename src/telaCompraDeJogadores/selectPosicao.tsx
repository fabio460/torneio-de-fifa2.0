import * as React from 'react';
import { Theme, useTheme, Palette } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { darkBackgroundBox } from '../temaDark';

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

const names = [
  'ATA',
  'PE',
  'PD',
  'ME',
  'MD',
  'MEI',
  'MC',
  'VOL',
  'ZAG',
  'LD',
  'LE',
  'GOL'
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectPosicao() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const dispatch = useDispatch()

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    dispatch({
      type:'posicao',
      payload:{posicao:value}
    })
  };
  const darkMode = useSelector((state:any)=>state.darkReducer.dark)

  return (
    <div style={{marginTop:"10px"}}>
      <FormControl sx={{ width: "100%", mb:1 }} size='small'>
        <InputLabel  id="demo-multiple-chip-label" sx={{bgcolor:!darkMode? 'ThreeDDarkShadow':"white", padding:"0px 6px", marginLeft:"-5px"}}>Posições</InputLabel>
        <Select
          sx={{bgcolor:!darkMode? darkBackgroundBox:'white'}}
         
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
