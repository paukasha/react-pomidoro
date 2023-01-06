import React, {ChangeEvent, useContext, useEffect, useRef, useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {ISetting, ITask} from "../store";
import {generateRandomString} from "../utils/generateRandom";
import useLocalStorageState from "use-local-storage-state";
import {TasksContext} from "../context/context";

const Form = () => {
    const nameTaskRef = useRef<HTMLInputElement>(null),
        [task, setTask] = useState({name: '', descr: '', id: ''}),
        descrTaskRef = useRef<HTMLInputElement>(null),
        [error, setError] = useState({helperText: '', isError: false});

    const {tasksList, setTasksList} = useContext(TasksContext)

    useEffect(() => {
        if (nameTaskRef.current) nameTaskRef.current.focus()
    }, [])

    function handleTaskNameChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.value) {
            setError({helperText: '', isError: false})
        }
        setTask({...task, name: event.target.value})
    }

    function handleTaskDescrChange(event: ChangeEvent<HTMLInputElement>) {
        setTask({...task, descr: event.target.value})
    }

    const changeFocus: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
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
    let [settings, setSettings] = useLocalStorageState<ISetting[]>('settings')

    function addTask() {
        if (task.name === '') {
            setError({helperText: 'Обязательное поле', isError: true})
            return
        }

        let tomatosSetting = settings?.find(el => el.sysName === 'tomatos') as ISetting,
            bigBreak = settings?.find(el => el.sysName === 'bigBreakDuration') as ISetting,
            smallBreak = settings?.find(el => el.sysName === 'smallBreakDuration') as ISetting,
            tomatoDuration = settings?.find(el => el.sysName === 'tomatoDuration');

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
                if (i % 2) {
                    if ((i + 1) % (8) === 0) {
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

        setTask({name: '', descr: '', id: '',})
        setError({helperText: '', isError: false})
    }

    return (
        <Box sx={{display: 'grid', rowGap: 4}}>
            <Typography variant='h5'>
                Добавьте задачу
            </Typography>

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

            <TextField label="Введите описание задачи"
                       variant='standard'
                       inputRef={descrTaskRef}
                       fullWidth
                       value={task.descr}
                       onChange={handleTaskDescrChange}
                       onKeyDown={handleAddTask}
            />

            <Button variant='contained'
                    onClick={addTask}
            >
                <Typography>
                    Добавить
                </Typography>
            </Button>
        </Box>
    );
};

export default Form;