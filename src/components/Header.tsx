import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  AppBar, Box,
  Button, Container, IconButton,
  Toolbar, Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PomodoroIcon from "./icons/PomodoroIcon";

import { ColorModeContext } from "../context/context";

const Header = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", alignItems: "center", padding: 0 }}>
          <Box
            component="a"
            href="/"
            color="inherit"
            sx={{ display: "flex", alignItems: "center", mr: 4 }}
          >
            <IconButton color="inherit">
              <PomodoroIcon />
            </IconButton>
            <Typography>pomodoro_box</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{ color: "white", display: "block" }}
            >
              Главная
            </Button>

            <Button
              sx={{ color: "white", display: "block" }}
              component={RouterLink}
              to="/settings"
            >
              Настройки
            </Button>

            <Button
              sx={{ color: "white", display: "block" }}
              component={RouterLink}
              to="/statistics"
            >
              Статистика
            </Button>

            <Button
              sx={{ color: "white", display: "block" }}
              component={RouterLink}
              to="/instructions"
            >
              Инструкции
            </Button>
          </Box>
          <IconButton
            sx={{ ml: "auto" }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
