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
import {ISetting, ITask} from "./interfaces";
import useLocalStorageState from "use-local-storage-state";
import {settingsDefaultValue} from "./utils/dicts";
import {ModalContext, TasksContext, SettingsContext} from "./context/context";
import Modal from "./components/Modal";

function App() {
    const [tasksList, setTasksList] = useLocalStorageState<ITask[]>('tasksList', {defaultValue: []}),
        tasksListValue = {tasksList, setTasksList},
        [settings, setSettings] = useLocalStorageState<ISetting[]>('settings', {defaultValue: settingsDefaultValue}),
        settingsValue = {settings, setSettings},
        [isModalOpen, setIsModalOpen] = useState(false),
        modalValue = {isModalOpen, setIsModalOpen};

    return (
        <ModalContext.Provider value={modalValue}>
            <TasksContext.Provider value={tasksListValue}>
                <SettingsContext.Provider value={settingsValue}>
                    <div className="App">
                        <Header/>
                        <Container maxWidth='xl' sx={{flexGrow: 1}}>
                            <Routes>
                                <Route path="/" element={<Main/>}/>
                                <Route path="/settings" element={<Settings/>}/>
                                <Route path="/statistics" element={<Statistics/>}/>
                                <Route path="/instructions" element={<Instruction/>}/>
                            </Routes>
                        </Container>
                        <Footer/>
                        {isModalOpen && <Modal/>}
                    </div>
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
