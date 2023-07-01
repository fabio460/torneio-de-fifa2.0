import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';

  interface Props {
    window?: () => Window;
    children: React.ReactElement;
  }
  
  export default function ScrollComponents(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });
  
    return (
      <Fade in={trigger}>
        <Box
          
          role="presentation"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          >
          {children}
        </Box>
      </Fade>
    );
  }