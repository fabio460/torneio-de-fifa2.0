import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import { jogadoresType } from '../../types';
export default function Paginacao({setPagina, pagina, itensPorPagina}:any) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPagina(value)
  };
  var lista:jogadoresType[] = useSelector((state:any)=>state.campoDeBuscaReducer.lista)
  let tamanhoDaLista = lista?.length
  if (Math.ceil(tamanhoDaLista/itensPorPagina) > tamanhoDaLista) {
    setPagina(1)
  }
  
  return (
    <Stack spacing={2} >
      <Pagination color='primary' sx={{display:"flex", justifyContent:"center", marginBottom:"20px"}} count={Math.ceil(tamanhoDaLista/itensPorPagina)} page={pagina} onChange={handleChange} />
    </Stack>
  );
}