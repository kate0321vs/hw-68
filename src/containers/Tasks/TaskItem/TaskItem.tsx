import { Button, Card, CardContent, Checkbox, Grid, Typography } from '@mui/material';

interface Props {
  title: string;
  status: boolean;
  onChangeStatus: () => void;
  statusLoader: boolean;
  onDelete: () => void;
}

const TaskItem: React.FC<Props> = ({title, status, onChangeStatus, onDelete}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        mt: 2,
        border: '1px solid lightgray',
        borderRadius: '10px',
      }}
    >
      <Checkbox color="success" checked={status} onChange={onChangeStatus}/>
      <CardContent sx={{flexGrow: 1}}>
           <Typography variant="body1" color="textSecondary">
             {title}
           </Typography>
          <Typography variant="body2" color={status ? 'textSecondary' : 'textPrimary'}>
            {status ? 'done' : 'in progress'}
          </Typography>
      </CardContent>

      <Grid>
        <Button
          size="small"
          color="error"
          onClick={onDelete}
          loadingPosition="start"
          variant="contained"
        >
          Delete
        </Button>
      </Grid>

    </Card>
  );
};

export default TaskItem;