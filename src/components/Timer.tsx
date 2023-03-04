import { Pause, PlayArrow, Stop } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import Countdown, {
    CountdownApi, CountdownTimeDelta
} from "react-countdown";
import {
    CurrentTaskContext,
    CurrentTimerContext,
    TimerStateContext
} from "../context/context";

const getLocalStorageValue = (s: string) => localStorage.getItem(s);

interface IUpdateTimer {
  updateTimer: () => void;
}

const Timer = ({ updateTimer }: IUpdateTimer) => {
  const { currentTimer, setCurrentTimer } = useContext(CurrentTimerContext);
  const { currentTask, setCurrentTask } = useContext(CurrentTaskContext);
  const { timerState, setTimerState } = useContext(TimerStateContext);
  const { isStarted, isPaused, isStopped, endDate } = timerState;
  const [date, setDate] = useState({ date: Date.now() });

  let countdownApi: CountdownApi | null = null;

  let countdownRef = useRef((countdown: Countdown | null): void => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  }) as any;

  useEffect(() => {
    // @ts-ignore
    const state = JSON.parse(getLocalStorageValue("state"));

    if (state?.status == "PAUSED") {
      setCurrentTimer({ ...currentTimer, delay: state.timeDelta.total });
    }

    if (state?.date != "" || state?.date != null) {
      if (state?.status == "STARTED") {
        console.log(state?.status == "STARTED");
        const currentTime = Date.now();
        let delta = parseInt(state?.date, 10) - Date.now();

        let x = currentTimer.delay;
        if (delta < 1000 || delta < 0) {
          delta = 1900;
          console.log("меньше тфсячи");
        }

        if (delta > x) {
          localStorage.setItem("state", JSON.stringify({ ...state, date: "" }));
        } else {
          console.log("else");
          setDate({ date: currentTime });
          setCurrentTimer({ ...currentTimer, delay: delta });
        }
      }
    }
  }, []);

  const autoStartHandler = (): boolean => {
    // @ts-ignore
    let state = JSON.parse(getLocalStorageValue("state"));
    if (!state) {
      return false;
    }
    return state?.status == "STARTED" ? true : false;
  };

  function onStop() {
    let newTimerState = {
      ...countdownRef?.current.state,
      date: countdownRef?.current.props.date,
    };
    localStorage.setItem("state", JSON.stringify(newTimerState));
  }

  function onPause(timeDelta: CountdownTimeDelta) {
    let newTimerState = {
      ...countdownRef?.current.state,
      date: countdownRef?.current.props.date,
    };
    localStorage.setItem("state", JSON.stringify(newTimerState));
  }

  const onStart = (delta: CountdownTimeDelta) => {
    // @ts-ignore
    let state = JSON.parse(getLocalStorageValue("state"));

    if (state?.date == "" || state?.date == null) {
      console.log(state?.date == "" || state?.date == null);
      let newTimerState = {
        ...countdownRef?.current.state,
        date: countdownRef?.current.props.date,
      };
      localStorage.setItem("state", JSON.stringify(newTimerState));
    }

    if (state?.status != "STARTED") {
      let newTimerState = {
        ...countdownRef?.current.state,
        date: countdownRef?.current.props.date,
      };
      localStorage.setItem("state", JSON.stringify(newTimerState));
    }
  };

  const onComplete = (timeDelta: CountdownTimeDelta, boolean: boolean) => {
    console.log("from completed", timeDelta);
    let asd = window.setTimeout(() => {
      updateTimer();
      setDate({ date: Date.now() });
      window.clearTimeout(asd);
    }, 1000);

    setDate({ date: Date.now() });
    setCurrentTimer({ ...currentTimer, delay: 0 });
    // @ts-ignore
    let state = JSON.parse(getLocalStorageValue("state"));

    localStorage.setItem(
      "state",
      JSON.stringify({
        ...state,
      })
    );
  };

  return (
    <div>
      <Countdown
        key={currentTimer.id}
        ref={countdownRef}
        date={date.date + currentTimer.delay}
        renderer={({ formatted, api }: any) => {
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h1">
                {formatted.minutes}:{formatted.seconds}
              </Typography>
              <Box>
                <IconButton size="large" onClick={(e) => api.stop()}>
                  <Stop fontSize="large" />
                </IconButton>

                {api.isStopped() || api.isPaused() ? (
                  <IconButton size="large" onClick={() => api.start()}>
                    <PlayArrow fontSize="large" />
                  </IconButton>
                ) : (
                  <IconButton size="large" onClick={() => api.pause()}>
                    <Pause fontSize="large" />
                  </IconButton>
                )}
              </Box>
            </Box>
          );
        }}
        autoStart={autoStartHandler()}
        onStop={() => onStop()}
        onPause={(timeDelta) => onPause(timeDelta)}
        onStart={(delta) => onStart(delta)}
        onComplete={(timeDelta, boolean) => onComplete(timeDelta, boolean)}
      />
    </div>
  );
};

export default Timer;
