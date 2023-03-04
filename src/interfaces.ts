export interface ITask {
  id?: string,
  name?: string,
  descr?: string,
  tomatos?: any,
  timers?: ITimer[],
  completed?: boolean,
  [key: string]: any
}

export interface ITimer   {
  id?: string,
  creation_date?: string,
  date_start?: string | number,
  [key: string]: any
}

export interface ISetting {
  sysName: string,
  text: string,
  value: number | boolean,
  error: boolean
}

export interface ITimerState  {
  isPaused: boolean,
  isStopped: boolean,
  isStarted: boolean,
}
