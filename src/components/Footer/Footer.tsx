import React from 'react';
import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import PomodoroIcon from "../icons/PomodoroIcon";
import {Link as RouterLink} from "react-router-dom";

const Footer = () => {
  return (
    <AppBar position='static'>
      <Container maxWidth='xl' >
        <Toolbar  sx={{display: 'flex',
                        alignItems: 'center',
                        padding: 0,
                        justifyContent: 'center'
        }}>
          <Box component='a'
               href='/'
               color='inherit'
               sx={{display: 'flex', alignItems: 'center', mr: 2}}>
            <IconButton color='inherit'>
              <PomodoroIcon />
            </IconButton>
            <Typography  >
              pomodoro_box
            </Typography>

          </Box>

          <Box >
            <Typography >
              &#9400; 2022 by Darya Pavlenko
            </Typography>
          </Box>

        </Toolbar>
      </Container>
    </AppBar >
  );
};

export default Footer;
