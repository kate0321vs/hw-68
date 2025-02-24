import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { ReactNode, useEffect } from 'react';
import { addTask, fetchTasks } from './TasksThunk.ts';
import TaskItem from './TaskItem/TaskItem.tsx';
import Spinner from '../../UI/Spinner/Spinner.tsx';
import { Container, Typography } from '@mui/material';
import TaskForm from '../../components/TaskForm/TaskForm.tsx';
import { TaskApi } from '../../types';

const Tasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks)
  const tasksLoading = useAppSelector((state) => state.tasks.fetchLoading)
  const formLoading = useAppSelector((state) => state.tasks.formLoading)

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);


  const onSubmitAction = (newTask: TaskApi) => {
    dispatch(addTask(newTask));
  };


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
     <TaskForm loading={formLoading} onSubmitAction={onSubmitAction}/>
      <Typography sx={{textAlign: 'center', my: 3}} variant='h4'>
        Todo list
      </Typography>
      {tasksList}
    </Container>
  );
};

export default Tasks;