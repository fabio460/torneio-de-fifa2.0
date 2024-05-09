import * as React from 'react'; 
import MenuIcon from '@mui/icons-material/Menu';
import "./appBar.css";
import ModalColocacao from './modais/modalColocacao';
import ModalArtilharia from './modais/modalArtilharia';
import ModalAssistencia from './modais/modalAssistencia';
import ModalDadosDoJogo from './modais/modalDadosDoJogo';
import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import ModalDeletarPerfil from './modais/modalDeletarPerfil';
import SwitchesDeletarParticipantes from './switchDeletarParticipantes';
import icone from '../icone_fifa.png';
import { useNavigate } from 'react-router-dom';
import { usuarioLogado } from '../metodosUteis';
import SelectDarkMode from './selectDarkMode';
import { useSelector } from 'react-redux';
import ModalAtualizarPremiacoes from './modais/modalAtualizarPremiacoes';

const deslogar = ()=>{
  localStorage.removeItem('jwt')
  window.location.reload()
}
const pages = [
  <ModalColocacao />,
  <ModalArtilharia/>,
  <ModalAssistencia/>,
  <ModalDadosDoJogo/>, 
];


function ResponsiveAppBar() {
  const h = useNavigate()
  const tipoDeTorneio = useSelector((state:any)=>state.selectFormatoDaCompeticaoReducer.tipo);

  const settings = [
    <div>{usuarioLogado.nome}</div>,
    <div onClick={()=>h("/valores")}>Regras gerais</div>,
    <div><ModalAtualizarPremiacoes /></div>,
    <div><SwitchesDeletarParticipantes/></div> , 
    <div><ModalDeletarPerfil/></div>, 
    <div onClick={deslogar}>Deslogar</div>,
  ];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
      <AppBar position="fixed" >
        <div className='appBarContainer' >
          <Toolbar disableGutters >
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
              <img src={icone} style={{width:"40px"}}/>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Recanto
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {
                  tipoDeTorneio === "1" ?
                  pages.map((page, key) => (
                    <MenuItem key={key} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))
                  :
                  <div></div>
                }
              </Menu>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
              {/* <img src={icone} style={{width:"40px"}}/> */}
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {
                tipoDeTorneio === "1" ?
                pages.map((page, key) => (
                  <Button
                    key={key}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                )) 
                :
                <div></div>
              }
            </Box>
            <SelectDarkMode/>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Opções">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg">{usuarioLogado.nome[0].toUpperCase()}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, key) => (
                  <MenuItem onClick={handleCloseUserMenu} key={key}>
                    <Typography component='div' textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </div>
      </AppBar>
  );
}
export default ResponsiveAppBar;
