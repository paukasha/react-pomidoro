import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Edit } from "@mui/icons-material";
import { ITask } from "../../../interfaces";
import React, { useContext, useState } from "react";
import { TasksContext } from "../../../context/context";

export const Task = (props: ITask) => {
  let { task } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasksList, setTasksList } = useContext(TasksContext);
  const [taskName, setTaskName] = useState(task.name);
  const [taskDescr, setTaskDescr] = useState(task.name);

  const editTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveTask = () => {
    let tasks = tasksList.map((el) => {
      if (el.id === task.id) {
        return {
          ...el,
          name: taskName,
          descr: taskDescr,
        };
      }

      return { ...el };
    });

    setTasksList(tasks);
    closeModal();
  };

  return (
    <Accordion key={task.id} sx={{ width: "100%" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id={task.name}
      >
        <div className="task">
          <Typography variant="caption" component="div">
            Название задачи
            <br />
            <Typography component="div" variant="h6">
              {task.name}
            </Typography>
          </Typography>
          <IconButton size="large" onClick={editTask}>
            <Edit />
          </IconButton>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <Typography variant="caption" component="div">
          Описание задачи
          <br />
          <Typography component="div" variant="h6">
            {task.descr}
          </Typography>
        </Typography>
      </AccordionDetails>

      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Редактирование задачи</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            defaultValue={taskName}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTaskName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Описание  задачи"
            defaultValue={taskDescr}
            onChange={(e) => setTaskDescr(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Отмена</Button>
          <Button onClick={saveTask}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </Accordion>
  );
};
