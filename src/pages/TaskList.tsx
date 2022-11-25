import React, {useContext, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useSelector} from "react-redux";
import {RootState, ITask} from "../store";
import {TasksListContext} from "../context/context";

//TODO добавить возможность реактирования задачи
const TaskList = () => {
const {tasksList} = useContext(TasksListContext)


  return (
    <>
      {tasksList.map((el: ITask) => {
            return (<Accordion key={el.id} sx={{width: '100%'}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id={el.name}
              >
                <Typography variant='caption' component='div'>
                  Название задачи
                  <br/>
                    <Typography component='div' variant='h6'>{el.name}</Typography>
                </Typography >


              </AccordionSummary>
              <AccordionDetails>
                <Typography variant='caption' component='div'>
                  Описание задачи
                  <br/>
                  <Typography component='div' variant='h6'> {el.descr}</Typography>
                </Typography >
              </AccordionDetails >

            </Accordion >)
          }
        )
      }

      </>
  );
};

export default TaskList;
