import { Button, Card, CardContent, Checkbox, Grid, Typography } from '@mui/material';

interface Props {
  title: string;
  status: boolean;
}

const TaskItem: React.FC<Props> = ({title, status}) => {
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
      <Checkbox color="success" defaultChecked={false} />
      <CardContent sx={{flexGrow: 1}}>
           <Typography variant="body1" color="textSecondary">
             {title}
           </Typography>
          <Typography variant="body2" color={status ? 'success' : 'warning'}>
            {status ? 'done' : 'in progress'}
          </Typography>
      </CardContent>

      <Grid>
        <Button
          size="small"
          color="error"
          // onClick={}
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