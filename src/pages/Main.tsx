import React, {useState} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Item from '@mui/material/Unstable_Grid2';
import {Container, Typography,} from "@mui/material";
import TaskList from "./TaskList";
import CurrentTask from "../components/CurrentTask/CurrentTask";
import {ISetting, ITask} from "../store";
import useLocalStorageState from 'use-local-storage-state'
import Modal from "../components/Modal";
import Form from "../components/Form";
import {settingsDefaultValue} from "../utils/dicts";

const Main = () => {
    const [tasksList, setTasksList] = useLocalStorageState<ITask[]>('tasksList', {defaultValue: []}),
        tasksListValue = {tasksList, setTasksList},
        [settings, setSettings] = useLocalStorageState<ISetting[]>('settings', {defaultValue: settingsDefaultValue}),
        settingsValue = {settings, setSettings},
        [isModalOpen, setIsModalOpen] = useState(false),
        modalValue = {isModalOpen, setIsModalOpen};

    return (

                    <Container maxWidth='xl'
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
