
import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

type propType = {
    mensagem?:string,
    mensagem2?:string,
    mensagem3?:string
}
export default function CarregandoBtnLento({mensagem, mensagem2, mensagem3}:propType) {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 1100);
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  return <div >
    <div style={{display:"flex", justifyContent:"center"}}>
    <CircularProgressWithLabel value={progress} />

    </div>
    {
        progress < 50 ?

        <h4>{mensagem}</h4>
        :
        progress < 70 ?
        <h4>{mensagem2}</h4>
        :
        <h4>{mensagem3}</h4>
    }
  </div>
}
