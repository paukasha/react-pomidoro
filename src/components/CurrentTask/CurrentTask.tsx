import React, { useContext, useEffect, useState } from "react";
import { blueGrey } from "@mui/material/colors";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ITask, ITimer } from "../../interfaces";
import Countdown, { CountdownTimeDelta } from "react-countdown";
import sound from "./sound2.mp3";
import UseSound from "../../hooks/UseSound";
import {
  CurrentTaskContext,
  CurrentTimerContext,
  TasksContext,
  TimerStateContext,
} from "../../context/context";
import Timer from "../Timer";

const getLocalStorageValue = (s: string) => localStorage.getItem(s);

const CurrentTask = () => {
  const { currentTask, setCurrentTask } = useContext(CurrentTaskContext),
    [timers, setTimers] = useState<ITimer[]>([]),
    { currentTimer, setCurrentTimer } = useContext(CurrentTimerContext);

  const { tasksList, setTasksList } = useContext(TasksContext);

  const [toggle] = UseSound(sound);

  useEffect(() => {
    setTasksList(tasksList.filter((el) => !el.completed));
    if (tasksList?.length) {
      setCurrentTask(tasksList[0]);
    }
  }, [tasksList]);

  // удалять state по завершению всех таймеров и перехода к след задаче
  // обновлять текущий таймер после обновления задачи

  useEffect(() => {
    if (currentTask) {
      let localTimers = currentTask?.timers as ITimer[];
      setTimers(localTimers);
    }
  }, [currentTask]);

  function updateTimer() {
    let currentTimerIdx = timers.findIndex((el) => el.id === currentTimer?.id);
    let nextTimer = timers.find(
      (el, idx) => idx === Number(currentTimerIdx) + 1
    ) as ITimer;

    let tasks = tasksList?.map((el, idx) => {
      if (el.id === currentTask?.id) {
        return {
          ...el,
          timers: el.timers?.map((timer, idx) => {
            if (idx === currentTimerIdx) {
              return {
                ...timer,
                date_end: Date.now(),
              };
            }

            if (nextTimer && timer.id === nextTimer.id) {
              return {
                ...timer,
                date_start: Date.now(),
              };
            }

            return timer;
          })!,
        };
      }

      return el;
    }) as ITask[];

    if (!nextTimer) {
      toggle();
      let currentTaskIdx = tasksList?.findIndex(
        (el) => el.id === currentTask?.id
      )!;

      let tasks = tasksList?.map((el) => {
        if (el.id === currentTask?.id) {
          return {
            ...el,
            completed: true,
            date_end: Date.now(),
          };
        }
        return el;
      });
      let nextTask = tasksList?.find(
        (el, idx) => idx === currentTaskIdx + 1
      ) as ITask;

      if (nextTask) {
        setCurrentTask(nextTask);
        setTasksList(tasks);
      } else {
      }
      return;
    }

    setCurrentTimer({
      ...nextTimer,
      value: Number(nextTimer.value) * 1000,
      date_start: Date.now(),
    });
    setTasksList(tasks);
  }

  useEffect(() => {
    if (Object.keys(currentTimer).length === 0 && currentTask?.timers?.length) {
      setCurrentTimer({ ...currentTask?.timers[0] });
    }
  }, [currentTask]);

  return (
    <Box
      sx={{
        border: 1,
        borderStyle: "solid",
        borderColor: blueGrey[500],
        height: "auto",
        maxHeight: "100%",
        borderRadius: 2,
      }}
    >
      <>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>{currentTask?.name}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{currentTask?.descr}</Typography>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ padding: 2 }}>
          {/*<Box>*/}
          {/*    Осталось*/}
          {/*    <IconButton onClick={addTomato}>*/}
          {/*        <PomodoroIconColor/>*/}
          {/*    </IconButton>*/}
          {/*</Box>*/}

          <Timer updateTimer={updateTimer} />
        </Box>
      </>
    </Box>
  );
};

export default CurrentTask;
