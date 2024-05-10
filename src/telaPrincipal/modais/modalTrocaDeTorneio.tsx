import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CachedIcon from '@mui/icons-material/Cached';
import { blue } from '@mui/material/colors';
import { IconButton, Tooltip } from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { participantesType, torneioType } from '../../types';
import torneioReducer from '../../redux/torneioReducer';
import { listarTorneiosApi, trocaDeTorneioApi } from '../../api/torneioApi';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Carregando from '../../carregando';
const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}


export default function ModalTrocaDeTorneio({participante}:{participante:participantesType}) {
    function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;
    const [carregando, setCarregando] = React.useState(false)
    const [carregandoLista, setCarregandoLista] = React.useState(true)

    const [listaDeTorneios, setListaDeTorneios] = React.useState<torneioType[]>([])
    const handleClose = () => {
    onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
       const idDoTorneio = value
       const idDoParticipante = participante.id 
       setCarregando(true)
       trocaDeTorneioApi(idDoTorneio, idDoParticipante)
       //onClose(value);
    };
    React.useEffect(()=>{
       async function getTorneio(){
          const res = await listarTorneiosApi()
          setListaDeTorneios(res)
          setCarregandoLista(false)
       }
       getTorneio()
    },[])
    return (
    <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <h4>Mudança de torneio</h4>
            <Avatar src={participante.emblemaDoTime}/>
            {participante.nome} - {participante.torneio.nome}
        </DialogTitle>
        <List sx={{ pt: 0 }}>
            {
                carregandoLista ? <Carregando/>:
                carregando ?
                <div>
                    <h5 style={{textAlign:"center"}}>Trocando torneio</h5>
                    <h5 style={{textAlign:"center"}}>Aguarde...</h5>
                    <Box sx={{ width: '100%' }}>
                      <LinearProgress />
                    </Box>
                </div> 
                :
                listaDeTorneios.map((torneio,key) => (
                    torneio.nome !== participante.torneio.nome && <div>       
                        <ListItem disableGutters key={key}>
                        <ListItemButton onClick={() => handleListItemClick(torneio.id)}>
                            <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                {torneio.nome[0]}
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={torneio.nome} />
                        </ListItemButton>
                        </ListItem>
                    </div>
                )
            )}
        </List>
    </Dialog>
    );
    }
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Tooltip title="Mudança de torneio">
        <IconButton onClick={handleClickOpen}>
            <CachedIcon/>
        </IconButton>
      </Tooltip>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
