
import { ActionCreator, AnyAction } from 'redux';
import { Reducer } from 'redux';


export interface ITask {
  id?: string,
  name: string,
  descr?: string,
  tomatos?: any,
  timers: ITimer[],
  completed?: boolean
}

export interface ITimer extends ISetting  {
  id?: string,
  creation_date: string
}



export interface ISetting {
  sysName: string,
  text: string,
  value: number | boolean,
  error: boolean
}

export type RootState = {
  commentText: string;
  taskList: ITask[]
}

const initialState = {
  commentText: 'Hello, Skillbox',
  taskList: []
}
const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const updateComment: ActionCreator<AnyAction> = (text) => ({
  type: UPDATE_COMMENT,
  text,
})

const UPDATE_TASK_LIST = 'UPDATE_TASK_LIST';
export const updateTaskList: ActionCreator<AnyAction> = (task) => ({
  type: UPDATE_TASK_LIST,
 task
})

export const rootReducer: Reducer<RootState> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {
        ...state,
        commentText: action.text,
      }

    case UPDATE_TASK_LIST:
      return {
      ...state,
        taskList: [...state.taskList, action.task]
    }

    default:
      return state;
  }

}
