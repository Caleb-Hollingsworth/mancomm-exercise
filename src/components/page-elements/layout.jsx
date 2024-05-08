/* eslint-disable react/prop-types */
import { Box, Grid, Stack, useTheme } from '@mui/material';
import useBreakpoint from '../../hooks/use-breakpoint';


const Layout = ({ navigation, body }) => {
    const theme = useTheme();
    const { size, mobile } = useBreakpoint();
    console.log('size', size)
    return (
        <Box height='100vh' width='100vw'>
            <Grid container columns={12} m={0}>
                {!mobile && (
                    <>
                        <Grid item xs={.5} height='100vh'>
                            {navigation}
                        </Grid>
                        <Grid item xs={11.5} height='100vh' pl={6} bgcolor={theme?.palette?.primary?.main}>
                            {body}
                        </Grid>
                    </>
                )}
                {mobile && (
                    <Grid item height='100vh' xs={12} bgcolor={theme?.palette?.primary?.main}>
                        <Stack alignItems='center'>
                            {navigation}
                            {body}
                        </Stack>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default Layout;