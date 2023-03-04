import {
    Container,
    FormControl,
    InputLabel,
    MenuItem, Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import { default as Grid, default as Item } from "@mui/material/Unstable_Grid2";
import { useContext, useState } from "react";
import CurrentTask from "../components/CurrentTask/CurrentTask";
import Form from "../components/Form";
import Modal from "../components/Modal";
import TaskList from "../components/TasksList/TaskList";
import { TasksContext } from "../context/context";

const Main = () => {
  const { tasksList, setTasksList } = useContext(TasksContext),
    [isModalOpen, setIsModalOpen] = useState(false),
    [sort, setSort] = useState<string>('По алфавиту');

    const handleChange = (event: SelectChangeEvent) => {
        console.log('eventTarget')
        setSort(event.target.value);
      };

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Grid container alignItems="start" columnSpacing={4}>
        <Grid xs={6} container rowSpacing={4}>
          <Item xs={12}>
            <Form />
          </Item>

          <Item xs={12}>{tasksList.length && <CurrentTask />}</Item>
        </Grid>

        <Grid xs={6} container rowSpacing={4}>
          <Item xs={12}>
            <div className="tasks__list-header">
              <Typography variant="h5">Список задач</Typography>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Сортировать по
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={sort}
                  onChange={handleChange}
                  
                >
                  <MenuItem value='По алфавиту'>По алфавиту</MenuItem>
                  <MenuItem value='Дате создания'>По дате создания</MenuItem>
                </Select>
              </FormControl>
            </div>

            <TaskList sort={sort} />
          </Item>
        </Grid>
        {isModalOpen && <Modal />}
      </Grid>
    </Container>
  );
};

export default Main;
