import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import {blueGrey} from "@mui/material/colors";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle, FormControl, FormControlLabel, FormLabel,
    IconButton, Radio, RadioGroup,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {DeleteForever, PlayArrow, Stop, Pause} from "@mui/icons-material";
import PomodoroIconColor from "../icons/PomodoroIconСolor";
import {ITask, ITimer} from "../../store";
import useLocalStorageState from "use-local-storage-state";
import Countdown, {CountdownApi} from "react-countdown";

import sound from './sound2.mp3'
import UseSound from "../../hooks/UseSound";

import Modal from "../Modal";

const CurrentTask = () => {
    const [tasksList, setTasksList] = useLocalStorageState<ITask[]>('tasksList');
    const [currentTask, setCurrentTask] = useState<ITask | null>(null),
        [isModalOpen, setIsModalOpen] = useState(false),
        [timers, setTimers] = useState<ITimer[]>([]),
        [currentTimer, setCurrentTimer] = useState<ITimer | any>(null);

    const component = React.useMemo( () => <Countdown/>, [] );

    // const [radioValue, setRadioValue] = React.useState('completed');
    //
    // const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setRadioValue((event.target as HTMLInputElement).value);
    // };

    const [toggle] = UseSound(sound)

    let countdownApi: CountdownApi | null = null;

    useEffect(() => {
        console.log('use1')
        if (tasksList?.length) {
            setCurrentTask(tasksList[0])
        }
    }, [])

    useEffect(() => {
        console.log('use2')
        let localCurrentTimer = {...tasksList![0].timers[0]!}
        setCurrentTimer({...localCurrentTimer})

    }, [])

    useEffect(() => {
        console.log('use13')
        let localTimers = [...tasksList![0].timers]
        setTimers(localTimers)
    }, [tasksList])

    let countdownRef = useRef((countdown: Countdown | null): void => {
        if (countdown) {
            countdownApi = countdown.getApi();
        }
    }) as any


    function toggleTimer() {
        if (countdownRef?.current?.isStopped()) {
            setCurrentTimer({...currentTimer, date_start: Date.now()})
            countdownRef?.current?.start()
        }
        if (countdownRef?.current?.isStarted()) {
            countdownRef?.current?.pause()
        }
        if (countdownRef?.current?.isPaused()){
            countdownRef?.current?.start()
        }
    }

     function stopTimer(e: React.MouseEvent<HTMLButtonElement>) {
            countdownRef?.current?.stop()

         console.log('true')
         setIsModalOpen(true)
    }

    function addTomato() {
        // setCurrentTask({...currentTask, })
    }

    function closeModal() {
        setIsModalOpen(false)
    }

     function openModal(e: MouseEvent<HTMLButtonElement>) {

         setIsModalOpen(true)
    }

     function execute () {
         setIsModalOpen(false)
        // if (radioValue === 'completed') {
        // //     найти следующую задачу установить текущую как вполненная
        //     console.log('completed')
        //     return
        // }

        // countdownRef?.current?.stop()
    //     начинаме задачу занового => останавливаем таймер
    }


    function goToNextTimer() {
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


        let tim = 0
        window.clearTimeout(tim)
        tim = window.setTimeout(() => {
            let tim2 = 0
            tim2 = window.setTimeout(() => {

                // setTasksList(tasks)

                window.clearTimeout(tim2)

            },0)


            setCurrentTimer({...nextTimer, date_start: Date.now()})

            countdownRef?.current?.start()

            window.clearTimeout(tim)

        },1000)
    }

    function show() {
        console.log(';ontick')
        setIsModalOpen(true)
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
                        <Box>
                            Осталось
                            <IconButton onClick={addTomato}>
                                <PomodoroIconColor/>
                            </IconButton>
                        </Box>

                        {currentTimer && <Countdown
                            date={Date.now() + Number(currentTimer.value) * 1000}
                            autoStart={false}

                            onStop={() => show()}
                            ref={countdownRef}
                            onComplete={goToNextTimer}
                            renderer={({formatted, api}) => (<Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Typography variant='h1'>
                                        {formatted.minutes}:{formatted.seconds}

                                    </Typography>
                                    <Box>
                                        <IconButton size='large'
                                                    onClick={(e) => stopTimer(e)}
                                        >
                                            <Stop fontSize='large'/>
                                        </IconButton>

                                        <IconButton size='large'
                                                    onClick={() => toggleTimer()}
                                        >
                                            {api.isStopped() || api.isPaused() ? <PlayArrow fontSize='large'/> :  <Pause fontSize='large'/>}
                                        </IconButton>
                                    </Box>
                                </Box>
                            )}></Countdown>}
                    </Box>
                </> :
                <>
                    <div>Ничего не добавлено</div>
                </>
            }
            {isModalOpen && <Modal closeModal={closeModal}

                                   execute={execute}
                                 />}
        </Box>
    );
};

export default CurrentTask;

//     общее время затраченное на задачу например
//       задача из 6 помидорок по 5 минут = 30мин +
//       после окончания помидорки перерыв - 1 минута
//       после окончания каждй четвертой перерыв 2 минуты
//       то есть 30+3 = 33минуты
//       33+2=35 минут и
//       35+1+1=37 минут - типа общее время вместе с перерывами
//
//       остановить таймер
//       пропустить таймер
//
//       можно удалить помидорку - пересчитываем таймер - запускаем заново
//       удалить задачу - удаляем все таймеры задачи - переходим к следующей если есть
//
//
//
//       после удачного хзавершения всех помидорок перехдим к следующей задаче
//       и ждем включения таймера
