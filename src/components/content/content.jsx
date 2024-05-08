import { Grid, Stack } from '@mui/material';
import Chart from '../chart/chart';
import Graph from '../graph/graph';
import Widgets from '../widgets/widgets';
import useBreakpoint from '../../hooks/use-breakpoint';

const Content = () => {
    const { mobile } = useBreakpoint();
    return (
        <Grid container columns={12} height='100%'>
            <Grid item xs={mobile ? 12 : 8.5} pr={!mobile ? 6 : 0}>
                <Stack justifyContent='space-between' alignItems='center' spacing={6}>
                    {!mobile && (
                        <Widgets />
                    )}
                    <Chart />
                </Stack>
            </Grid>
            {!mobile && (
                <Grid item xs={mobile ? 12 : 3.5}>
                    <Graph />
                </Grid>
            )}
        </Grid>
    );
};

export default Content;