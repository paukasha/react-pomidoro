import React, {useEffect} from 'react';
import './index.css'
import Header from "./components/Header";
import { Container } from '@mui/material';
import { Routes, Route, Link } from "react-router-dom";

import Main from './pages/Main'
import Settings from './pages/Settings'
import Statistics from './pages/Statistics'
import Instruction from './pages/Instruction'
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <div className="App">
      <Header />
      <Container maxWidth='xl' sx={{flexGrow:1}}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/instructions" element={<Instruction />} />
        </Routes>
      </Container>
      <Footer />
    </div>
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
