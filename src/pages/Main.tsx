import React, {ChangeEvent, useContext, useEffect, useRef, useState} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Item from '@mui/material/Unstable_Grid2';
import {Button, Container, TextField, Typography,} from "@mui/material";
import TaskList from "./TaskList";
import CurrentTask from "../components/CurrentTask/CurrentTask";
import {generateRandomString} from "../utils/generateRandom";
import {ISetting, ITask} from "../store";
import {TasksListContext} from '../context/context';
import useLocalStorageState from 'use-local-storage-state'
import Countdown from "react-countdown";

const Main = () => {
     let [task, setTask] = useState({name: '', descr: '', id: ''}),
    [error, setError]=useState({helperText: '', isError: false});

  let [tasksList, setTasksList] = useLocalStorageState<ITask[]>('tasksList', {
    defaultValue: []
  })


  const nameTaskRef = useRef<HTMLInputElement>(null),
      descrTaskRef = useRef<HTMLInputElement>(null);


  let [settings, setSettings] = useLocalStorageState<ISetting[]>('settings')
  function addTask() {
    if (task.name === '') {
      setError({helperText: 'Обязательное поле', isError: true})
      return
    }

    let tomatosSetting  = settings?.find(el => el.sysName === 'tomatos') as ISetting,
        bigBreak = settings?.find(el => el.sysName === 'bigBreakDuration') as ISetting,
        smallBreak  = settings?.find(el => el.sysName === 'smallBreakDuration') as ISetting,
        tomatoDuration = settings?.find(el => el.sysName === 'tomatoDuration') ;

    let timers = []

    //  дефолт значение - большой перерыв каждые 4 помидора то есть
    //  каждый восьмой жлемент будет большой перерыв

    let num: number = Number(tomatosSetting?.value) * 2
    if (tomatosSetting) {
      for (let i = 0; i < num; i++) {
        let object = {
            id: generateRandomString(),
            creation_date: new Date(),
            ...tomatoDuration
        }

          // после каждого второго перерыв мал
          if (i%2) {
            if ((i+1)%(8) === 0 ) {
              object = {
                ...object,
                ...bigBreak

              }
            } else {
              object = {
                ...object,
                ...smallBreak
              }

            }
        }
          timers.push(object)
      }
    }

    setTasksList([...tasksList, {
      ...task,
      completed: false,
      id: generateRandomString(),
      tomatos: tomatosSetting?.value,
      timers: [...timers]
    }] as ITask[])

    setTask({name: '', descr: '', id: '', })
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

  const changeFocus: React.KeyboardEventHandler<HTMLDivElement> =  (e) => {
    console.log(e)
      if (e.key === 'Enter') {
        const target = e.target as HTMLInputElement;
        if (!target.value) {
          setError({helperText: 'Обязательное поле', isError: true})
          return
        }
        if (descrTaskRef.current) descrTaskRef.current.focus()
      }
  }


  const handleAddTask: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }







  useEffect(() => {
    if (nameTaskRef.current) nameTaskRef.current.focus()
  }, [])

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
                       inputRef={nameTaskRef}
                       fullWidth
                       error={error.isError}
                       helperText={error.helperText}
                       value={task.name}
                       onChange={handleTaskNameChange}
                       onKeyDown={changeFocus}
            />
          </Item >

          <Item xs={12} >
            <TextField label="Введите описание задачи"
                       variant='standard'
                       inputRef={descrTaskRef}
                       fullWidth
                       value={task.descr}
                       onChange={handleTaskDescrChange}
                       onKeyDown={handleAddTask}
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
            {/*<Countdown date={Date.now() + 5000}*/}
            {/*           autoStart={false}*/}
            {/*           renderer={(props) => (*/}

            {tasksList.length &&  <CurrentTask />}


                       {/*)}*/}
            {/*></Countdown>*/}

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
