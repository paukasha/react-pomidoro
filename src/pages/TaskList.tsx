import React, {useContext} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ITask} from "../store";
import {TasksContext} from "../context/context";

const TaskList = () => {
    const {tasksList, setTasksList} = useContext(TasksContext)
    return (
        <>
            {tasksList.length ? tasksList.filter(el => !el.completed).map((el: ITask) => {
                    return (<Accordion key={el.id} sx={{width: '100%'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id={el.name}
                        >
                            <Typography variant='caption' component='div'>
                                Название задачи
                                <br/>
                                <Typography component='div' variant='h6'>{el.name}</Typography>
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Typography variant='caption' component='div'>
                                Описание задачи
                                <br/>
                                <Typography component='div' variant='h6'> {el.descr}</Typography>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>)
                }
            ) : <h2>Задачи не добавлены</h2>
            }

        </>
    );
};

export default TaskList;
