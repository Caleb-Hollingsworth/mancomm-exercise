/* eslint-disable react/prop-types */
import { Box, Grid, useTheme, } from '@mui/material';


const Layout = ({ navigation, body }) => {
    const theme = useTheme();
    return (
        <Box height='100vh' width='100vw'>
            <Grid container columns={12} m={0} >
                <Grid item xs={.5} height='100vh'>
                    {navigation}
                </Grid>
                <Grid item xs={11.5} height='100vh' pl={4} bgcolor={theme?.palette?.primary?.main}>
                    {body}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Layout;