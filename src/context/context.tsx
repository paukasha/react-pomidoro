import React, {createContext} from "react";
import {ISetting, ITask} from "../store";


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

interface ISettingsType {
    settings: ISetting[],
    setSettings: React.Dispatch<React.SetStateAction<ISetting[]>>
}

export const SettingsContext = createContext<ISettingsType>({
    settings: [],
    setSettings: () => {}
})

