import { useContext, useEffect } from "react";
import { TasksContext } from "../../context/context";
import { ITask } from "../../interfaces";
import { Task } from "./Task/Task";
import dayjs from "dayjs";

interface Isort {
  sort: string;
}

const TaskList = ({ sort }: Isort) => {
  const { tasksList, setTasksList } = useContext(TasksContext);

  useEffect(() => {
    if (sort === "По алфавиту") {
      setTasksList(tasksList.sort((a, b) => (a.name! < b.name! ? -1 : 1)));
    }

    if (sort === "Дате создания") {
      setTasksList(
        tasksList.sort(
          (a, b) =>
            dayjs(b.creationDate).valueOf()! - dayjs(a.creationDate).valueOf()!
        )
      );
    }
  }, [sort, tasksList]);

  return (
    <>
      {tasksList.length ? (
        tasksList
          .filter((el) => !el.completed)
          .map((el: ITask) => {
            return <Task task={el} key={el.id} />;
          })
      ) : (
        <h2>Задачи не добавлены</h2>
      )}
    </>
  );
};

export default TaskList;
