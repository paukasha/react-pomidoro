import { Container, Typography } from "@mui/material";
import { default as Grid, default as Item } from '@mui/material/Unstable_Grid2';
import { useContext, useState } from 'react';
import CurrentTask from "../components/CurrentTask/CurrentTask";
import Form from "../components/Form";
import Modal from "../components/Modal";
import TaskList from "../components/TasksList/TaskList";
import { TasksContext } from "../context/context";

const Main = () => {
      const {tasksList, setTasksList} = useContext(TasksContext),
        [isModalOpen, setIsModalOpen] = useState(false);

    return (<Container maxWidth='xl'
                       sx={{mt: 5,}}>
            <Grid container
                  alignItems="start"
                  columnSpacing={4}
            >
                <Grid xs={6}
                      container
                      rowSpacing={4}
                >
                    <Item xs={12}>
                        <Form/>
                    </Item>

                    <Item xs={12}>
                        {tasksList.length && <CurrentTask/>}
                    </Item>
                </Grid>

                <Grid xs={6}
                      container
                      rowSpacing={4}>
                    <Item xs={12}>
                        <Typography variant='h5'
                                    mb={4}>
                            Список задач
                        </Typography>
                        <TaskList/>
                    </Item>
                </Grid>
                {isModalOpen && <Modal/>}
            </Grid>
        </Container>
    );
};

export default Main;
