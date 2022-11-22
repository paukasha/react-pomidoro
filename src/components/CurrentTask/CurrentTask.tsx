import React, {useEffect, useState} from 'react';
import {blueGrey} from "@mui/material/colors";
import {Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {DeleteForever, PlayArrow, Stop} from "@mui/icons-material";
import PomodoroIconColor from "../icons/PomodoroIconСolor";
import {useSelector} from "react-redux";
import {ITask, RootState} from "../../store";
import dayjs from "dayjs";


const CurrentTask = () => {
  // let tasksList = useSelector<RootState, ITask[]>(state => state.taskList);
  const tasksList: ITask[] = JSON.parse(localStorage.getItem('tasksList')!)
    let currentTask = tasksList ? tasksList[0] : {name: '', descr: '', id: ''};


  let [hour, setHour] = useState(''),
      [minute, setMinute] = useState(''),
      [second, setSecond] = useState('');


  let [timer, setTimer] = useState(0)





  let timerTime= dayjs().set('hour', 0).set('minute', 5).set('second', 0)

 const playTimer1 = () =>  {
    setInterval(() => {
      timerTime = dayjs(timerTime).subtract(1, 'second')
      console.log(dayjs(timerTime).format('mm:ss'))
      setMinute(dayjs(timerTime).format('mm'))
      setSecond(dayjs(timerTime).format('ss'))
    })

  }



  // let timer = setInterval(() => playTimer(), 1000)


  function resetTimer() {
    // clearInterval(playTimer)
  }

  // const timerId = setInterval(() => timer(), 1000);

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
          <AccordionSummary    expandIcon={<ExpandMoreIcon />}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Typography >
                {currentTask.name}
              </Typography>
              <IconButton>
                <DeleteForever />
              </IconButton>
            </Box>

          </AccordionSummary>
          <AccordionDetails>
            <Typography >
              {currentTask.descr}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ padding: 2}}>
          <Box>
            Осталось  {currentTask.tomato}
            <IconButton>
              <PomodoroIconColor />
            </IconButton>

          </Box>

          <Box sx={{display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'}}>
            <Typography variant='h1'>
              {minute}:{second}
            </Typography>

            {/* TODO stop если нажат плэй иначе не показываем*/}
            <Box>
              <IconButton size='large'
                         onClick={resetTimer}
              >
                <Stop fontSize='large' />
              </IconButton>

              <IconButton size='large'  onClick={()=>setTimer(playTimer1)}>
                <PlayArrow fontSize='large' />
              </IconButton>

            </Box>

          </Box>

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
