import { Box, Grid, Stack } from '@mui/material';
import Chart from '../chart/chart';
import Sidebar from '../sidebar/sidebar';
import Widgets from '../widgets/widgets';
import useBreakpoint from '../../hooks/use-breakpoint';

const Content = () => {
    const { mobile } = useBreakpoint();
    return (
        <Grid container columns={12} height='100%'>
            <Grid item xs={mobile ? 12 : 8.5} pr={!mobile ? 6 : 0} position='relative' height='100%'>
                <Stack justifyContent='space-between' alignItems='center' spacing={6}>
                    {!mobile && (
                        <Widgets />
                    )}
                    <Chart />
                </Stack>
                <Stack fontSize='.9em' position='absolute' bottom={4} alignItems='center' justifyContent='flex-end' right={0} left={0}>
                    <Box>Created by Caleb Hollingsworth</Box>
                    <Box>Weather Data provided by weatherapi.com</Box>
                </Stack>
            </Grid>
            {!mobile && (
                <Grid item xs={mobile ? 12 : 3.5}>
                    <Sidebar />
                </Grid>
            )}
        </Grid>
    );
};

export default Content;