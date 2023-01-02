import React, {ChangeEvent, useContext, useState} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Item from '@mui/material/Unstable_Grid2';
import {Button, Container, TextField, Typography,} from "@mui/material";
import TaskList from "./TaskList";
import CurrentTask from "../components/CurrentTask/CurrentTask";
import {generateRandomString} from "../utils/generateRandom";
import {ITask} from "../store";
import {TasksListContext} from '../context/context';
import useLocalStorageState from 'use-local-storage-state'
import Countdown from "react-countdown";

const Main = () => {
  // const {tasksList2} = useContext(TasksListContext);
     let [task, setTask] = useState<ITask>({name: '', descr: '', id: '', tomato: 1}),
    [error, setError]=useState({helperText: '', isError: false});

  let [tasksList, setTasksList] = useLocalStorageState<ITask[]>('tasksList', {
    defaultValue: []
  })
  function addTask() {
    if (task.name === '') {
      setError({helperText: 'Обязательное поле', isError: true})
      return
    }




    setTasksList([...tasksList, {
      ...task,
      id: generateRandomString(),
      tomato: 1,
      timers: [{
        id: generateRandomString(),
        type: 'task',
        time: 5000
      }]
    }])



    // tasksList.push({
    //   ...task, id: generateRandomString(), tomato: 1, timers: [{
    //     id: generateRandomString(),
    //     type: 'task',
    //     time: '05:00'
    //   }]
    // })
    // localStorage.setItem('tasksList', JSON.stringify(tasksList))
    setTask({name: '', descr: '', id: '', tomato: 1})
    setError({helperText: '', isError: false})
  }

  function handleTaskNameChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value) {
      setError({helperText: '', isError: false})
    }
    setTask({...task, name: event.target.value})
  }

  function handleTaskDescrChange(event: ChangeEvent<HTMLInputElement>) {
    setTask({...task, descr: event.target.value})
  }

  return (
    <Container maxWidth='xl'
               sx={{mt: 5,}} >
      <Grid container
            alignItems="start"
            columnSpacing={4}
      >
        <Grid xs={6}
              container
              rowSpacing={4}
        >
          <Item xs={8} >
            <Typography variant='h5' >
              Добавьте задачу
            </Typography >
          </Item >

          <Item xs={12}
                sx={{border: '1px solid transparent'}} >
            <TextField label="Введите название задачи"
                       variant='standard'
                       fullWidth
                       error={error.isError}
                       helperText={error.helperText}
                       value={task.name}
                       onChange={handleTaskNameChange}
            />
          </Item >

          <Item xs={12} >
            <TextField label="Введите описание задачи"
                       variant='standard'
                       fullWidth
                       value={task.descr}
                       onChange={handleTaskDescrChange}
            />

          </Item >

          <Item xs={8} >
            <Button variant='contained'
                    onClick={addTask}
            >
              <Typography >
                Добавить
              </Typography >
            </Button >
          </Item >

          <Item xs={12} >
            {/*<CurrentTask />*/}
            <Countdown date={Date.now() + 5000}
                       autoStart={false}
                       renderer={(props) => (
                           <CurrentTask />
                       )


                       }
            ></Countdown>

          </Item >
        </Grid >
        <Grid xs={6}
              container
              rowSpacing={4} >
          <Item xs={12} >
            <Typography variant='h5'
                        mb={4} >
              Список задач
            </Typography >
          <TaskList />
          </Item >
        </Grid >
      </Grid >
    </Container >
  );
};

export default Main;
