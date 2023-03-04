import { useContext } from 'react';
import { TasksContext } from "../../context/context";
import { ITask } from "../../interfaces";
import { Task } from './Task/Task';

const TaskList = () => {
    const {tasksList, setTasksList} = useContext(TasksContext)
    return (
        <>
            {tasksList.length ? tasksList.filter(el => !el.completed).map((el: ITask) => {
                    return <Task task={el} key={el.id}/>
                }
            ) : <h2>Задачи не добавлены</h2>
            }

        </>
    );
};

export default TaskList;
