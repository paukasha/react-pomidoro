import React from 'react';
import {ITask} from '../store/'

interface TasksListContextData {
  tasksList: ITask[],
  setTasksList: (el: any) => void
}

export const TasksListContext = React.createContext<TasksListContextData>({
  tasksList: [],
  setTasksList: (el: any) => {
    return el
  }
});
