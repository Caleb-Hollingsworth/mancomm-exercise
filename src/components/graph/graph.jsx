import { Stack } from '@mui/material';
import { useMemo } from 'react';
import { TitleMenu } from '../ui';

const Graph = () => {
    const menuList = useMemo(() => {
        return ['Option1', 'Option2']
    }, []);
    return (
        <Stack bgcolor='white' width='100%' height='100%' p={5} spacing={4}>
            <TitleMenu title='Astronomical Info' menuList={menuList} />
            <TitleMenu title='Weather History' menuList={menuList} />
        </Stack>
    );
};

export default Graph;