import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header";
import Modal from "./components/Modal";
import {
    ColorModeContext, CurrentTaskContext, CurrentTimerContext, ModalContext, SettingsContext, TasksContext, TimerStateContext
} from "./context/context";
import "./index.css";
import { ISetting, ITask, ITimerState } from "./interfaces";
import Instruction from "./pages/Instruction";
import Main from "./pages/Main";
import Settings from "./pages/Settings";
import Statistics from "./pages/Statistics";
import { settingsDefaultValue } from "./utils/dicts";

function App() {
  const [tasksList, setTasksList] = useLocalStorageState<ITask[]>("tasksList", {
      defaultValue: [],
    }),
    tasksListValue = { tasksList, setTasksList },
    [settings, setSettings] = useLocalStorageState<ISetting[]>("settings", {
      defaultValue: settingsDefaultValue,
    }),
    settingsValue = { settings, setSettings },
    [isModalOpen, setIsModalOpen] = useState(false),
    modalValue = { isModalOpen, setIsModalOpen },
    [timerState, setTimerState] = useLocalStorageState<ITimerState>(
      "timerState",
      {
        defaultValue: {
          isPaused: false,
          isStopped: false,
          isStarted: false,
        },
      }
    ),
    timerStateValue = { timerState, setTimerState },
    [currentTimer, setCurrentTimer] = useLocalStorageState("currentTimer", {
      defaultValue: {},
    }),
    currentTimerValue = { currentTimer, setCurrentTimer },
    [currentTask, setCurrentTask] = useLocalStorageState<ITask>("currentTask", {
      defaultValue: { timers: [] },
    }),
    currentTaskValue = { currentTask, setCurrentTask };

  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ModalContext.Provider value={modalValue}>
          <TasksContext.Provider value={tasksListValue}>
            <SettingsContext.Provider value={settingsValue}>
              <TimerStateContext.Provider value={timerStateValue}>
                <CurrentTaskContext.Provider value={currentTaskValue}>
                  <CurrentTimerContext.Provider value={currentTimerValue}>
                    <div className="App">
                      <Header />
                      <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
                        <Routes>
                          <Route path="" element={<Main />} />
                          <Route path="settings" element={<Settings />} />
                          <Route path="statistics" element={<Statistics />} />
                          <Route
                            path="instructions"
                            element={<Instruction />}
                          />
                        </Routes>
                      </Container>
                      <Footer />
                      {isModalOpen && <Modal />}
                    </div>
                  </CurrentTimerContext.Provider>
                </CurrentTaskContext.Provider>
              </TimerStateContext.Provider>
            </SettingsContext.Provider>
          </TasksContext.Provider>
        </ModalContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
