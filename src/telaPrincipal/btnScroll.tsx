import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ModalConfirmaPagamentoFolha from './modais/modalConfirPagFolha';
import ModalConfirmarPagamentoPremiacao from './modais/modalConfirmarPagPrem';
import { useSelector } from 'react-redux';


export default function BtnScroll({usuario}:any) {
   
    const actions = [
      { icon: <ModalConfirmaPagamentoFolha icone={true}/>, name: 'Pagar folha', color:'white', bgColor:'#9c27b0',desable:true },
      { icon: <ModalConfirmarPagamentoPremiacao icone={true} usuario={usuario} />, name: 'Pagar prêmios', color:'white', bgColor:'#2e7d32' },
    //   { icon: <PrintIcon />, name: 'Print' },
    //   { icon: <ShareIcon />, name: 'Share' },
    ];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const speedStyle = { 
    position: 'absolute',
     bottom: 16, right: 25,
     "@media(max-width : 700px)":{
       bottom: 5, right: 5,
       width:"60px",
       marginTop:"0px"
     }
    }
  return (
    <Box sx={{ height: 320, width:300,transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={speedStyle}
        icon={<EmojiEventsIcon/>}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
            sx={{background:action.bgColor, color:action.color}}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
