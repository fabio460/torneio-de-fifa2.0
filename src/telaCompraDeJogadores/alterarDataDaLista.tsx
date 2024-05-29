import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function AlterarDataDaLista() {
  const [age, setAge] = React.useState<string | null>(localStorage.getItem("versao") ? localStorage.getItem("versao") :"0");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    localStorage.setItem("versao",event.target.value as string)
    window.location.reload()
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      {/* <Button sx={{ display: 'block', mt: 2 }} onClick={handleOpen}>
        Open the select
      </Button> */}
      <FormControl sx={{ ml: 1, mt:0.5, minWidth: 120 }}>
        <Select
          size='small'
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          
          onChange={handleChange}
        >
    
          <MenuItem value={"1"}>Fifa 24 nov/2024</MenuItem>
          <MenuItem value={"0"}>Fifa 23 abr/2023</MenuItem>
          
        </Select>
      </FormControl>
    </div>
  );
}
