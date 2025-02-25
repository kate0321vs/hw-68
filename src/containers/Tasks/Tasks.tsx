import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { ReactNode, useEffect } from 'react';
import { addTask, deleteFetch, fetchTasks, statusFetch } from './TasksThunk.ts';
import TaskItem from './TaskItem/TaskItem.tsx';
import Spinner from '../../UI/Spinner/Spinner.tsx';
import { Container, Typography } from '@mui/material';
import TaskForm from '../../components/TaskForm/TaskForm.tsx';
import { Task, TaskApi } from '../../types';

const Tasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks)
  const tasksLoading = useAppSelector((state) => state.tasks.fetchLoading)
  const formLoading = useAppSelector((state) => state.tasks.formLoading)
  const statusLoading = useAppSelector((state) => state.tasks.statusLoading)
  const deleteLoading = useAppSelector((state) => state.tasks.deleteLoading)

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);


  const onSubmitAction = (newTask: TaskApi) => {
    dispatch(addTask(newTask));
  };

  const ChangeStatus = (newTask: Task) => {
     dispatch(statusFetch(newTask));
  };

  const deleteTask = (task: Task) => {
    dispatch(deleteFetch(task));
  }

  let tasksList: ReactNode = <Spinner/>;


    if (!tasksLoading) {
      if (tasks.length > 0) {
      tasksList = tasks.map((task) => (
       <TaskItem
          key={task.id}
          title={task.title}
          status={task.status}
          onChangeStatus={() => ChangeStatus(task)}
          statusLoader={statusLoading}
          onDelete={() => deleteTask(task)}
          deleteLoading={deleteLoading}
        />
      ));
      } else {
        tasksList = (<p>No tasks yet</p>)
      }
    }

  return (
    <Container>
     <TaskForm loading={formLoading} onSubmitAction={onSubmitAction}/>
      <hr/>
      <Typography sx={{textAlign: 'center', my: 5}} variant='h4'>
        Todo list
      </Typography>
      {tasksList}
    </Container>
  );
};

export default Tasks;