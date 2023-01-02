
import { ActionCreator, AnyAction } from 'redux';
import { Reducer } from 'redux';


export interface ITask {
  id?: string,
  name?: string,
  descr?: string,
  tomato: number,
  timers?: [
    { id: string,
      type: string,
      time: string | number,
      creationDate?: string
    }
  ]
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
