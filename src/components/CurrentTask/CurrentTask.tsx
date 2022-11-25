import React, {MouseEvent, SetStateAction, useContext, useEffect, useState} from 'react';
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
import {ITask} from "../../store";
import dayjs from "dayjs";
import {TasksListContext} from "../../context/context";


const CurrentTask = () => {
  const {tasksList, setTasksList} = useContext(TasksListContext);

  const [currentTask, setCurrentTask] = useState<ITask>(tasksList[0]),
    [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    setCurrentTask(tasksList[0])
  }, [tasksList])

  let [hour, setHour] = useState(''),
    [minute, setMinute] = useState(''),
    [second, setSecond] = useState('');


  const [timerTime, setTimerTime] = useState<SetStateAction<any> | string | number | Date | null | undefined>(dayjs().set('hour', 0).set('minute', 5).set('second', 0)),
    [pause, setPause] = useState(false);


  function tick() {
    setTimerTime(dayjs(timerTime).subtract(1, 'second'))
    setMinute(dayjs(timerTime).format('mm'))
    setSecond(dayjs(timerTime).format('ss'))
  }

  function startTimer  ()  {
    setPause(true)
  }

  function stopTimer() {
    setPause(false)
    setTimerTime(dayjs().set('hour', 0).set('minute', Number(minute)).set('second', Number(second)))
  }

  function deleteTask(e: MouseEvent<HTMLButtonElement>) {
    setIsModalOpen(false)
    setTasksList(tasksList.filter((el: ITask) => el?.id! !== currentTask.id))
    localStorage.setItem('tasksList', JSON.stringify(tasksList.filter((el: ITask) => el?.id! !== currentTask.id)))
  }

  useEffect(() => {
    let timerId: any = 0;
    if (pause) {
      timerId = setInterval(() => {
        tick()
      }, 1000);
    }

    return function cleanup() {
      clearInterval(timerId);
    };
  }, [pause, tick, timerTime])


  function addTomato() {
    setCurrentTask({...currentTask, tomato: currentTask?.tomato + 1})
  }

  function closeModal() {
    setIsModalOpen(false)
  }
  function openModal (e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
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
    }} >


      {tasksList ? <>
          <Accordion >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} >
                <Typography >
                  {currentTask.name}
                </Typography >

                <IconButton onClick={openModal} >
                  <DeleteForever />
                </IconButton >
              </Box >

            </AccordionSummary >
            <AccordionDetails >
              <Typography >
                {currentTask.descr}
              </Typography >
            </AccordionDetails >
          </Accordion >

          <Box sx={{padding: 2}} >
            <Box >
              Осталось {currentTask.tomato}
              <IconButton onClick={addTomato} >
                <PomodoroIconColor />
              </IconButton >

            </Box >

            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }} >

              <Typography variant='h1' >
                {minute}:{second}
              </Typography >

              {/* TODO stop если нажат плэй иначе не показываем*/}
              <Box >
                <IconButton size='large'
                            onClick={stopTimer}
                >
                  <Stop fontSize='large' />
                </IconButton >

                <IconButton size='large'
                            onClick={startTimer} >
                  <PlayArrow fontSize='large' />
                </IconButton >
              </Box >
            </Box >
          </Box >
        </> :
        <>
          <div >Ничего не добавлено</div >
        </>
      }

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" >
          Удалить задачу?
        </DialogTitle >

        <DialogActions >
          <Button onClick={deleteTask}>Удалить</Button >
          <Button onClick={closeModal}
                  autoFocus >
            Я передумал(а)
          </Button >
        </DialogActions >
      </Dialog >
    </Box >
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
