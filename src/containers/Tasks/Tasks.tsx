import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { ReactNode, useEffect } from 'react';
import { fetchTasks } from './TasksThunk.ts';
import TaskItem from './TaskItem/TaskItem.tsx';
import Spinner from '../../UI/Spinner/Spinner.tsx';
import { Container, Typography } from '@mui/material';

const Tasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks)
  const tasksLoading = useAppSelector((state) => state.tasks.fetchLoading)

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  let tasksList: ReactNode = <Spinner/>;


    if (!tasksLoading) {
      tasksList = tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          status={task.status}
          // onDeleteClick={() => onDeleteClick(dish.id)}
        />
      ));
    }

  return (
    <Container>
      <Typography sx={{textAlign: 'center', my: 3}} variant='h4'>
        Todo list
      </Typography>
      {tasksList}
    </Container>
  );
};

export default Tasks;