import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useSelector } from 'react-redux';
import { darkBackgroundContainer } from '../temaDark';
export default function Footer() {
    const linlStyle ={
        margin:"5px"
    }
    const darkMode = useSelector((state:any)=>state.darkReducer.dark)

  return (
    <div style={{paddingTop:"50px" ,width:"100%" ,minWidth: 275,minHeight:"100px" , background:darkMode?darkBackgroundContainer :"#f5f5f5" }}>
        <CardContent >
            <div style={{display:'flex',justifyContent:"center"}}>
                <Link sx={linlStyle} color="inherit" href="https://www.linkedin.com/in/fabio-oliveira-b2589163/">
                    <LinkedInIcon/>
                </Link>{' '}
                <Link sx={linlStyle} color="inherit" href="https://github.com/jazzfabios460">
                    <GitHubIcon/>
                </Link>{' '}
                <Link sx={linlStyle} color="inherit" href="https://www.facebook.com/dasilvadeoliveirafabio">
                    <FacebookIcon/>
                </Link>{' '}
                <Link sx={linlStyle} color="inherit" href="https://www.instagram.com/dasilvadeoliveirafabio/">
                    <InstagramIcon/>
                </Link>{' '}
            </div>
            <Typography variant="body2" color="text.secondary" align="center" >
                {'Criado por © '}
                <Link color="inherit" href="https://github.com/jazzfabios460/sistema-de-transferencia-monetaria">
                    Fabio Oliveira
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </CardContent>
    </div>
  )
}