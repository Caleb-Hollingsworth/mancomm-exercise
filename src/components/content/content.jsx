import { Grid, Stack } from '@mui/material';
import Chart from '../chart/chart';
import Graph from '../graph/graph';
import Widgets from '../widgets/widgets';

const Content = () => {
    return (
        <Grid container columns={12} height='100%'>
            <Grid item xs={8.5} pr={6}>
                <Stack justifyContent='space-between' spacing={6}>
                    <Widgets />
                    <Chart />
                </Stack>
            </Grid>
            <Grid item xs={3.5}>
                <Graph />
            </Grid>
        </Grid>
    );
};

export default Content;