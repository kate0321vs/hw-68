import { Button, Grid, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { TaskApi } from '../../types';
import ButtonSpinner from '../../UI/ButtonSpinner/ButtonSpinner.tsx';

interface Props {
  onSubmitAction: (newTask: TaskApi) => void;
  loading: boolean;
}

const initialState = {
  title: '',
  status: false,
}

const TaskForm: React.FC<Props> = ({onSubmitAction, loading = false}) => {
  const [form, setForm] = useState<TaskApi>(initialState);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitAction({...form, status: false});
    setForm(initialState);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }

  return (
    <form onSubmit={onSubmit} style={{marginBottom: '3rem'}}>
      <Typography variant="h4" sx={{flexGrow: 1, textAlign: 'center', mt: 3}}>
        Add task
      </Typography>

      <Grid container spacing={2} sx={{mx: 'auto', width: '50%', mt: 3}}>

        <Grid xs={12}>
          <TextField
            sx={{width: '100%', my: 3}}
            label="title"
            name="title"
            variant="outlined"
            onChange={onChange}
            value={form.title}
            required
          />
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{width: '100%'}}
          disabled={loading}
        >
          {loading ? <ButtonSpinner/> : null}
          <span>Add Task</span>
        </Button>
      </Grid>
    </form>
  );
};

export default TaskForm;