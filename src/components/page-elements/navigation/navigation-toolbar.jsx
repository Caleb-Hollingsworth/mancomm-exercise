import { CalendarTodayOutlined, DescriptionOutlined, EventRepeatOutlined, GrainOutlined, HomeOutlined, LogoutOutlined } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { useCallback } from 'react';
import useBreakpoint from '../../../hooks/use-breakpoint';
import useStore from '../../../hooks/zustand';
import { IconButton } from '../../ui';


const NavigationToolbar = () => {
    const [selected, setChartType] = useStore(state => [state.selected, state.setSelected])
    const { mobile } = useBreakpoint();
    const handleTab = useCallback((value) => {
        if (value !== 'description') {
            setChartType(value);
        }
    }, [setChartType]);
    return (
        <Stack bgcolor='white' minHeight={mobile ? 'auto' : '100vh'} minWidth='100%' justifyContent='space-between' alignItems='center' py={3} direction={mobile ? 'row' : 'column'}>
            <IconButton noHover noCursor>
                <GrainOutlined sx={{ transform: 'rotate(45deg)' }} fontSize='large' />
            </IconButton>
            <Stack height='100%' width='100%' spacing={mobile ? 4 : 9} justifyContent='space-between' direction={mobile ? 'row' : 'column'}>
                <IconButton onClick={() => handleTab('current.json')} selected={selected === 'current.json'} tip='Today'>
                    <HomeOutlined fontSize='large' />
                </IconButton>
                <IconButton onClick={() => handleTab('forecast.json')} selected={selected === 'forecast.json'} tip='Week Ahead'>
                    <CalendarTodayOutlined fontSize='large' />
                </IconButton>
                <IconButton onClick={() => handleTab('history.json')} selected={selected === 'history.json'} tip='Week Behind'>
                    <EventRepeatOutlined fontSize='large' />
                </IconButton>
                <IconButton onClick={() => handleTab('description')} selected={selected === 'description'} tip='Description'>
                    <DescriptionOutlined fontSize='large' />
                </IconButton>
            </Stack>
            <IconButton noHover>
                <LogoutOutlined fontSize='large' />
            </IconButton>
        </Stack>
    );
};

export default NavigationToolbar;