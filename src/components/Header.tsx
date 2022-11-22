import React from 'react';
import {ShoppingBasket,} from "@mui/icons-material";
import {AppBar, Link , IconButton, Toolbar, Container, Typography, Box, Button} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PomodoroIcon from "./icons/PomodoroIcon";
import {Link as RouterLink } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position='static'>
      <Container maxWidth='xl' >
        <Toolbar  sx={{display: 'flex', alignItems: 'center', padding: 0}}>
          <Box component='a' href='/' color='inherit'  sx={{display: 'flex', alignItems: 'center', mr: 4}}>
            <IconButton color='inherit'>
              <PomodoroIcon />
            </IconButton>
            <Typography  >
              pomodoro_box
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button   component={RouterLink}
                      to="/"
                      sx={{  color: 'white', display: 'block' }} >
              Главная
            </Button>

            <Button sx={{  color: 'white', display: 'block' }}
                      component={RouterLink}
                      to="/settings" >
                Настройки
            </Button>

            <Button sx={{  color: 'white', display: 'block' }}
                    component={RouterLink}
                    to="/statistics" >
              Статистика
            </Button>

            <Button sx={{  color: 'white', display: 'block' }}
                    component={RouterLink}
                    to="/instructions" >
              Инструкции
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
};

export default Header;
