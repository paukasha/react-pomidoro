import React, {MouseEvent, useContext, useEffect, useRef, useState} from 'react';
import {blueGrey} from "@mui/material/colors";
import {Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Pause, PlayArrow, Stop} from "@mui/icons-material";
import PomodoroIconColor from "../icons/PomodoroIconСolor";
import {ITask, ITimer} from "../../interfaces";
import Countdown, {CountdownApi, CountdownTimeDelta} from "react-countdown";

import sound from './sound2.mp3'
import UseSound from "../../hooks/UseSound";
import {ModalContext, TasksContext} from "../../context/context";
import Timer from "../Timer";
import taskList from "../../pages/TaskList";

const date = Date.now()

const CurrentTask = () => {
    const [currentTask, setCurrentTask] = useState<ITask | null>(null),
        [timers, setTimers] = useState<ITimer[]>([]),
        [currentTimer, setCurrentTimer] = useState<ITimer | null>(null);

    const {tasksList, setTasksList} = useContext(TasksContext);

    const [toggle] = UseSound(sound)

    useEffect(() => {
        setTasksList(tasksList.filter(el => !el.completed))
        if (tasksList?.length) {
            setCurrentTask(tasksList[0])
            console.log(currentTask)
        }
    }, [tasksList])


    useEffect(() => {
        let localCurrentTimer = {...currentTask?.timers[0]}
        if (localCurrentTimer) {
            // setCurrentTimer({...localCurrentTimer, value: localCurrentTimer?.value && Number(localCurrentTimer?.value) * 1000})
        }
    }, [currentTask,])

    useEffect(() => {
        let localTimers = [...tasksList[0].timers]
        setTimers(localTimers)
    }, [])

    function updateTimer(timeDelta:  CountdownTimeDelta, completedOnStart: boolean) {

        // debugger
        let currentTimerIdx = timers.findIndex(el => el.id === currentTimer?.id)
        let nextTimer = timers.find((el, idx) => idx === Number(currentTimerIdx) + 1) as ITimer

        let tasks = tasksList?.map((el, idx) => {
            if (el.id === currentTask?.id) {
                return {
                    ...el,
                    timers: el.timers.map((timer, idx) => {
                        if (idx === currentTimerIdx) {
                            return {
                                ...timer,
                                date_end: Date.now()
                            }
                        }

                        if (nextTimer && timer.id === nextTimer.id) {
                            return {
                                ...timer,
                                date_start: Date.now()
                            }
                        }

                        return timer
                    })
                }
            }

            return el

        }) as ITask[]

        console.log('индекс тек таймера', currentTimerIdx)
        console.log('найденный следующий таймер', nextTimer)

        if (!nextTimer) {
            toggle()
            let currentTaskIdx = tasksList?.findIndex(el => el.id === currentTask?.id)!
            console.log('idx текущей задачи', currentTaskIdx)

            let tasks = tasksList?.map(el => {
                if (el.id === currentTask?.id) {
                    return {
                        ...el,
                        completed: true,
                        date_end: Date.now()
                    }
                }
                return el
            })
            let nextTask = tasksList?.find((el, idx) => idx === currentTaskIdx + 1) as ITask

            if (nextTask) {

                setCurrentTask(nextTask)
                setTasksList(tasks)
            } else {

            }
            return
        }

        // setCurrentTimer({...nextTimer, value: Number(nextTimer.value) * 1000, date_start: Date.now()})
        setTasksList(tasks)
    }




    return (
        <Box sx={{
            border: 1,
            borderStyle: 'solid',
            borderColor: blueGrey[500],
            height: 'auto',
            maxHeight: '100%',
            borderRadius: 2,
        }}>

            {tasksList ? <>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Typography>
                                    {currentTask?.name}
                                </Typography>
                            </Box>

                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {currentTask?.descr}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Box sx={{padding: 2}}>
                        {/*<Box>*/}
                        {/*    Осталось*/}
                        {/*    <IconButton onClick={addTomato}>*/}
                        {/*        <PomodoroIconColor/>*/}
                        {/*    </IconButton>*/}
                        {/*</Box>*/}

                        <Timer timer={currentTask?.timers[0]}
                                               updateTimer={updateTimer}

                        />
                    </Box>
                </> :
                <>
                    <div>Ничего не добавлено</div>
                </>
            }
        </Box>
    );
};

export default CurrentTask;

