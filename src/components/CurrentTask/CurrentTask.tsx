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

const date = Date.now()

const CurrentTask = React.memo(() => {
    const [currentTask, setCurrentTask] = useState<ITask | null>(null),
        [timers, setTimers] = useState<ITimer[]>([]),
        [currentTimer, setCurrentTimer] = useState<ITimer | any>(null);



    const {isModalOpen, setIsModalOpen} = useContext(ModalContext);
    const {tasksList, setTasksList} = useContext(TasksContext);

    const [toggle] = UseSound(sound)

    let countdownApi: CountdownApi | null = null;



    useEffect(() => {
        console.log('use1')
        if (tasksList?.length) {
            setCurrentTask(tasksList[0])
        }
    }, [])

    useEffect(() => {
        console.log(currentTimer)
    }, [currentTimer])

    useEffect(() => {
        console.log('use2')
        let localCurrentTimer = {...currentTask?.timers[0]}
        if (localCurrentTimer) {
            setCurrentTimer({...localCurrentTimer, value: localCurrentTimer?.value && Number(localCurrentTimer?.value) * 1000})
        }



    }, [currentTask,])

    useEffect(() => {
        console.log('use13')
        let localTimers = [...tasksList[0].timers]
        setTimers(localTimers)
    }, [])

    let countdownRef = useRef((countdown: Countdown | null): void => {
        if (countdown) {
            countdownApi = countdown.getApi();
        }
    }) as any
    let [paused, setPaused] = useState(null)


    function toggleTimer() {
        // if (countdownRef?.current?.isStopped()) {
        //     // setCurrentTimer({...currentTimer, date_start: Date.now()})
            countdownRef?.current?.start()
        // }
        // if (countdownRef?.current?.isStarted()) {
        //     countdownRef?.current?.pause()
        // }
        // if (countdownRef?.current?.isPaused()) {
        //     countdownRef?.current?.start()
        // }
    }
    const [asd, setAsd] = useState(false)
    function stopTimer(e: React.MouseEvent<HTMLButtonElement>) {
       countdownRef?.current?.stop()

        console.log('true')
         setIsModalOpen(true)

        setAsd(!asd)
    }

    function addTomato() {
        // setCurrentTask({...currentTask, })
    }

    function execute() {
        setIsModalOpen(false)
        // if (radioValue === 'completed') {
        // //     найти следующую задачу установить текущую как вполненная
        //     console.log('completed')
        //     return
        // }

        // countdownRef?.current?.stop()
        //     начинаме задачу занового => останавливаем таймер
    }


    function goToNextTimer(timeDelta:  CountdownTimeDelta, completedOnStart: boolean) {
        console.log('aeyrwbz onComplete')

        console.log('timeDelta', timeDelta, )
        console.log('completedOnStart', completedOnStart)

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
                countdownRef?.current?.stop()
                setCurrentTask(nextTask)
                setTasksList(tasks)
            } else {

            }
            return
        }

        setCurrentTimer({...nextTimer, value: Number(nextTimer.value) * 1000, date_start: Date.now()})
        setTasksList(tasks)



        let tim = 0
        window.clearTimeout(tim)
        tim = window.setTimeout(() => {
            // let tim2 = 0
            // tim2 = window.setTimeout(() => {
            //
            //     // setTasksList(tasks)
            //
            //     window.clearTimeout(tim2)
            //
            // }, 0)


            // setCurrentTimer({...nextTimer, date_start: Date.now()})
            console.log('текущий таймер ', currentTimer)

            countdownRef?.current?.start()

            window.clearTimeout(tim)

        }, 1000)
    }

    function show(e: CountdownTimeDelta) {
        console.log(e)

        // setIsModalOpen(true)
    }

    function handleStop(timeDelta:  CountdownTimeDelta) {
        console.log(timeDelta)
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

            <div>{currentTimer?.value}</div>

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

                        {currentTimer ? <Timer /> : 'Добавьте задачу'}
                    </Box>
                </> :
                <>
                    <div>Ничего не добавлено</div>
                </>
            }
        </Box>
    );
});

export default CurrentTask;

