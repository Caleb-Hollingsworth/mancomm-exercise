import { Stack } from '@mui/material';
import { TitleMenu } from '../ui';

const Graph = () => {
    return (
        <Stack bgcolor='white' width='100%' height='100%' p={5} spacing={4}>
            <TitleMenu title='Astronomical Info' />
            <TitleMenu title='Weather History' />
        </Stack>
    );
};

export default Graph;