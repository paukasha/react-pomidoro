import React, {useEffect, useState} from 'react';
import './index.css'
import Header from "./components/Header";
import {Container} from '@mui/material';
import {Routes, Route, Link} from "react-router-dom";

import Main from './pages/Main'
import Settings from './pages/Settings'
import Statistics from './pages/Statistics'
import Instruction from './pages/Instruction'
import Footer from "./components/Footer/Footer";
import {ISetting, ITask, ITimerState} from "./interfaces";
import useLocalStorageState from "use-local-storage-state";
import {settingsDefaultValue} from "./utils/dicts";
import {ModalContext, TasksContext, SettingsContext, TimerStateContext, CurrentTimerContext} from "./context/context";
import Modal from "./components/Modal";

function App() {
    const [tasksList, setTasksList] = useLocalStorageState<ITask[]>('tasksList', {defaultValue: []}),
        tasksListValue = {tasksList, setTasksList},
        [settings, setSettings] = useLocalStorageState<ISetting[]>('settings', {defaultValue: settingsDefaultValue}),
        settingsValue = {settings, setSettings},
        [isModalOpen, setIsModalOpen] = useState(false),
        modalValue = {isModalOpen, setIsModalOpen},
        [timerState, setTimerState] = useLocalStorageState<ITimerState>('timerState', {
            defaultValue: {
                isPaused: false,
                isStopped: false,
                isStarted: false,
            }
        }),
        timerStateValue = {timerState, setTimerState},
        [currentTimer, setCurrentTimer] = useLocalStorageState('currentTimer', {
            defaultValue: {}
        }),
        currentTimerValue = {currentTimer, setCurrentTimer};

    return (
        <ModalContext.Provider value={modalValue}>
            <TasksContext.Provider value={tasksListValue}>
                <SettingsContext.Provider value={settingsValue}>
                    <TimerStateContext.Provider value={timerStateValue}>
                        <CurrentTimerContext.Provider value={currentTimerValue}>
                            <div className="App">
                                <Header/>
                                <Container maxWidth='xl' sx={{flexGrow: 1}}>
                                    <Routes>
                                        <Route path="/react-pomidoro/" element={<Main/>}/>
                                        <Route path="/react-pomidoro/settings" element={<Settings/>}/>
                                        <Route path="/react-pomidoro/statistics" element={<Statistics/>}/>
                                        <Route path="/react-pomidoro/instructions" element={<Instruction/>}/>
                                    </Routes>
                                </Container>
                                <Footer/>
                                {isModalOpen && <Modal/>}
                            </div>
                        </CurrentTimerContext.Provider>
                    </TimerStateContext.Provider>
                </SettingsContext.Provider>
            </TasksContext.Provider>
        </ModalContext.Provider>

    );
}

export default App;

//
// useEffect(() => {
//   taskNameRef?.current?.focus();
//   // if (taskNameRef?.current) {
//   //   taskNameRef.current.value = task.taskName
//   // }
//   // if (taskDescrRef?.current) {
//   //   taskDescrRef.current.value = task.taskDescr
//   // }
// }, []);
