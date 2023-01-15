import React, {createContext} from "react";
import {ISetting, ITask, ITimer, ITimerState} from "../interfaces";


interface IModalContext {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const ModalContext = createContext<IModalContext>({
    isModalOpen: false,
    setIsModalOpen: () => {}
});


interface ITasksContext {
    tasksList: ITask[],
    setTasksList: React.Dispatch<React.SetStateAction<ITask[]>>
}

export const TasksContext = createContext<ITasksContext>({
    tasksList: [],
    setTasksList: () => {}
})

interface ISettingsContext {
    settings: ISetting[],
    setSettings: React.Dispatch<React.SetStateAction<ISetting[]>>
}

export const SettingsContext = createContext<ISettingsContext>({
    settings: [],
    setSettings: () => {}
})


interface ITimerStateContext {
    timerState: ITimerState | any,
    setTimerState: React.Dispatch<React.SetStateAction<ITimerState>>
}

export const TimerStateContext = createContext<ITimerStateContext>({
    timerState: {},
    setTimerState: () => {}
})

interface ICurrentTimerContext {
    currentTimer: ITimer,
    setCurrentTimer: React.Dispatch<React.SetStateAction<ITimer>>
}

export const CurrentTimerContext = createContext<ICurrentTimerContext>({
    currentTimer: {},
    setCurrentTimer: () => {}
})

