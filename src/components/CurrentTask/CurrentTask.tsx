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
    DialogTitle,
    IconButton,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {DeleteForever, PlayArrow, Stop} from "@mui/icons-material";
import PomodoroIconColor from "../icons/PomodoroIconСolor";
import {ITask, ITimer} from "../../store";
import useLocalStorageState from "use-local-storage-state";
import Countdown, {CountdownApi} from "react-countdown";

// import audio from './sound2.mp3'

import sound from './sound2.mp3'

const CurrentTask = () => {
    const [tasksList, setTasksList] = useLocalStorageState<ITask[]>('tasksList');

    // const [playing, toggle] = useAudio( 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');

    const [audio] = useState(new Audio(sound));
    // audio.load()
    const [playing, setPlaying] = useState(false);

    const toggle = () => {
        console.log(';l')
        setPlaying(!playing)
    };

    useEffect(() => {
            playing ? audio.play(): audio.pause();
        },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);


    const [currentTask, setCurrentTask] = useState<ITask | null>(null),
        [isModalOpen, setIsModalOpen] = useState(false),
        [timers, setTimers] = useState<ITimer[]>([]),
        [currentTimer, setCurrentTimer] = useState<ITimer | any>(null);

    let countdownApi: CountdownApi | null = null;

    let countdownRef = useRef((countdown: Countdown | null): void => {
        if (countdown) {
            countdownApi = countdown.getApi();
        }
    }) as any

    useEffect(() => {
        if (tasksList?.length) {
            setCurrentTask(tasksList[0])
        }
    }, [])

    useEffect(() => {
        let localTimers = [...tasksList![0].timers]
        setTimers(localTimers)

        let localCurrentTimer = {...tasksList![0].timers[0]!,}
        setCurrentTimer({...localCurrentTimer})

    }, [currentTask, tasksList])

    function deleteTask(e: MouseEvent<HTMLButtonElement>) {
        setIsModalOpen(false)
        setTasksList(tasksList!.filter((el: ITask) => el?.id! !== currentTask!.id))
        localStorage.setItem('tasksList', JSON.stringify(tasksList!.filter((el: ITask) => el?.id! !== currentTask!.id)))
    }

    function start() {
        countdownRef?.current?.start()

        setCurrentTimer({...currentTimer, date_start: Date.now()})
    }

    function pause(timerProps: any) {
        timerProps.pause()
    }

    function addTomato() {
        // setCurrentTask({...currentTask, })
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    function openModal(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        setIsModalOpen(true)
    }


    function goToNextTask() {
        let currentTimerIdx = timers.findIndex(el => el.id === currentTimer?.id)
        let nextTimer = timers.find((el, idx) => idx === Number(currentTimerIdx) + 1) as ITimer

        let tasks = tasksList?.map((el, idx) => {
            if (el.id === currentTask?.id) {
                return {
                    ...el,
                    timers: el.timers.map(timer => {
                        if (timer.id === currentTimer.id) {
                            return {
                                ...timer,
                                date_end: Date.now()
                            }
                        }

                        if (timer.id === nextTimer.id) {
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

        setTasksList(tasks)

        if (!nextTimer) {
            countdownRef?.current?.stop()
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
            })
            let nextTask = tasksList?.find((el, idx) => idx === currentTaskIdx + 1) as ITask
            setCurrentTask(nextTask)
            return
        }


        let tim = 0
        window.clearTimeout(tim)
        tim = window.setTimeout(() => {
            setCurrentTimer({...nextTimer, date_start: Date.now()})
            // window.setTimeout(() => {
                countdownRef?.current?.start()

                // window.clearTimeout(tim)

            // },1000)

            window.clearTimeout(tim)

        },1000)


        //
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


            <button onClick={toggle}>play</button>

            {tasksList ? <>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Typography>
                                    {currentTask?.name}
                                </Typography>

                                <IconButton onClick={openModal}>
                                    <DeleteForever/>
                                </IconButton>
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
                            ref={countdownRef}
                            onComplete={goToNextTask}
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
                                                    onClick={() => pause(api)}
                                        >
                                            <Stop fontSize='large'/>
                                        </IconButton>

                                        <IconButton size='large'
                                                    onClick={() => start()}
                                        >
                                            <PlayArrow fontSize='large'/>
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

            <Dialog
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Удалить задачу?
                </DialogTitle>

                <DialogActions>
                    <Button onClick={deleteTask}>Удалить</Button>
                    <Button onClick={closeModal}
                            autoFocus>
                        Отмена
                    </Button>
                </DialogActions>
            </Dialog>
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
