import { Grid, Stack } from '@mui/material';
import Chart from '../chart/chart';
import Graph from '../graph/graph';
import Widgets from '../widgets/widgets';

const Content = () => {
    return (
        <Grid container columns={12} height='100%'>
            <Grid item xs={8}>
                <Stack>
                    <Chart />
                    <Widgets />
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Graph />
            </Grid>
        </Grid>
    );
};

export default Content;