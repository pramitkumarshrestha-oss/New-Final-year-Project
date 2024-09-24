import * as React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import "../styles/AdminNavbar.css";

const theme = createTheme({
  palette: {
    background: {
      paper: '#121414',
    },
    text: {
      primary: '#A6E3E9',
      secondary: '#A6E3E9',
    },
    action: {
      active: '##A6E3E9',
    },
    success: {
      dark: '#009688',
    },
  },
});

export default function Card(props) {
  return (
    <ThemeProvider theme={theme}>
      <Box className='box'
        sx={{
          bgcolor: 'background.paper',
          position: 'relative',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          height: 120,
          display: 'grid',
          gridTemplateColumns: '75% 25%',
          backgroundImage: `url(https://source.unsplash.com/random/?${props.category})` ,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // backdropFilter: 'brightness(10%)'

          ":before": { backgroundColor: "#00000099", position: "absolute", content: "''", width: "100%", height: "100%" },
        }}
      >
        <Box sx={{  fontSize: 37,color:'#2AF598', zIndex: '1'}}>{props.title}</Box>
        <Box sx={{ fontSize: 50, fontWeight: 'medium', textAlign: 'center',color:'#2AF598', zIndex: '1' }}>
          {props.number}
        </Box>
        <Box
          sx={{
            display: 'inline',
            fontWeight: 'bold',
            mx: 0.5,
            fontSize: 14,
            color:'#2AF598',
            zIndex: '1'
          }}
        >
          {props.detail}
        </Box>
      </Box>
    </ThemeProvider>
  );
}