import React, {useContext} from "react";
import ReactDOM from "react-dom";
import Countdown, {CountdownTimeDelta} from "react-countdown";
import { useState, useEffect } from "react";
import {ITimer} from "../interfaces";
import {CurrentTimerContext, TimerStateContext} from "../context/context";

// Random component
const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ hours,formatted, minutes, seconds, completed, api }: any) => {
    if (completed) {
        // Render a complete state
        return <Completionist />;
    } else {
        // Render a countdown
        return (
            <div>
                <span>
        {formatted.minutes}:{formatted.seconds}
      </span>
                <button onClick={() => api.start()}>start</button>
                <button onClick={() => api.stop()}>stop</button>
                <button onClick={() => api.pause()}>pause</button>
            </div>

        );
    }
};

const getLocalStorageValue = (s: string) => localStorage.getItem(s);

const Timer = ({timer, updateTimer}: ITimer | any) => {
    const {currentTimer, setCurrentTimer} = useContext(CurrentTimerContext)
    const {timerState, setTimerState} = useContext(TimerStateContext)
    const {isStarted, isPaused, isStopped, endDate} = timerState

    const [date, setData] = useState(
        { date: Date.now(), } //10 seconds
    );

    // const date = {date: Date.now()}


    // let wantedDelay = 15000;//10 ms это всегда currentTimer.value



    useEffect(() => {
        // console.log('use effect timer currentimer')
        console.log('устанавливать паузу при обновлении')
        console.log('!isStarted',!isStarted)
        if (!isStarted && !isPaused) {
            console.log('abrakadabra')
            if (timer != null || timer != undefined) {
                setCurrentTimer({...timer, delay: timer.value * 1000})
            }
        }

    }, [timer])

    //[START] componentDidMount
    //Code runs only one time after each reloading
    useEffect(() => {

        const savedDate = getLocalStorageValue("end_date");
        if (savedDate != null && !isNaN(Number(savedDate))) {
            const currentTime = Date.now();
            let delta = parseInt(savedDate, 10) - currentTime;
            if (isPaused) {
                delta = timerState.delay
            }
            if (delta > currentTimer.value * 1000) {
                console.log('if')
                if (localStorage.getItem("end_date")!.length > 0)
                    localStorage.removeItem("end_date");
            } else {
                setData({ date: currentTime, });
                setCurrentTimer({...currentTimer, delay: delta})
            }
        }
    }, []);


    const autoStartHandler = isStarted && !isPaused ? true : false

    function onStop() {
        setTimerState({...timerState, isStarted: false})
    }

    function onTick(delta:  CountdownTimeDelta) {
    }

    function onPause (timeDelta: CountdownTimeDelta) {
        console.log('onPause', timeDelta)
        setTimerState({...timerState, isPaused: true, isStarted: false, delay: timeDelta.total })
    }


    return (
        <div>
            <Countdown
                date={date.date + currentTimer.delay}
                renderer={renderer}
                autoStart={autoStartHandler}
                onStop={() => onStop()}
                onPause={(timeDelta) => onPause(timeDelta)}
                onTick={(timeDelta) => onTick(timeDelta)}
                onStart={(delta) => {
                    if (localStorage.getItem("end_date") == null) {
                        localStorage.setItem("end_date", JSON.stringify(date.date + currentTimer.delay));
                        setTimerState({...timerState, isStarted: true, isPaused: false})
                    } else {
                        setTimerState({...timerState, isPaused: false})
                    }


                }}
                onComplete={() => {
                    if (localStorage.getItem("end_date") != null) {
                        localStorage.removeItem("end_date");
                        setTimerState({...timerState, isStarted: false, isPaused: false})
                }

                }}
            />
        </div>
    );
};

export default Timer