import React, {ChangeEvent, useEffect, useState} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Item from '@mui/material/Unstable_Grid2';
import {Button, Container, TextField, Typography,} from "@mui/material";
import TaskList from "./TaskList";
import {useDispatch} from "react-redux";
import CurrentTask from "../components/CurrentTask/CurrentTask";
import {generateRandomString} from "../utils/generateRandom";
import {ITask} from "../store";
import dayjs from "dayjs";

const Main = () => {
  const dispatch = useDispatch();

  let [tasksList, setTasksList] = useState<ITask[]>([]),
    [task, setTask] = useState<ITask>({name: '', descr: '', id: ''});

  useEffect(() => {
    let tasks: ITask[] = JSON.parse(localStorage.getItem('tasksList')!)
    console.log(tasks)
    if (tasks) {
      setTasksList(tasks)
    }
  }, [])

  function addTask() {
    let tasks = localStorage.getItem('tasksList')
    tasksList.push({
      ...task, id: generateRandomString(), tomato: 1, timers: [{
        id: generateRandomString(),
        type: 'task',
        time: '05:00'
      }]
    })
    localStorage.setItem('tasksList', JSON.stringify(tasksList))
    setTask({name: '', descr: '', id: ''})
  }

  function handleTaskNameChange(event: ChangeEvent<HTMLInputElement>) {
    setTask({...task, name: event.target.value})
  }

  function handleTaskDescrChange(event: ChangeEvent<HTMLInputElement>) {
    setTask({...task, descr: event.target.value})
  }






  useEffect(() => {
    // const timerId = setInterval(() => timer(), 1000);
    // return () => clearInterval(timerId);
  });







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
            <CurrentTask />


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
