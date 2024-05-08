import { Box, Stack, useTheme } from '@mui/material';
import { useCallback, useMemo } from 'react';
import useWeather from '../../hooks/use-weather';
import useStore from '../../hooks/zustand';

const ForecastWidget = () => {
    const theme = useTheme();
    const [selected, setSelected] = useStore(state => [state.selected, state.setSelected]);
    const handleSelected = useCallback(() => {
        return setSelected('forecast.json');
    }, [setSelected]);
    const isSelected = useMemo(() => selected === 'forecast.json', [selected]);
    const height = useMemo(() => isSelected ? '18em' : '11em', [isSelected]);
    const width = useMemo(() => isSelected ? 'calc(100% + 19em)' : '100%', [isSelected]);
    const bgColor = useMemo(() => isSelected ? theme?.palette?.primary.purple : 'white', [isSelected, theme?.palette?.primary.purple]);
    const color = useMemo(() => isSelected ? 'white' : theme?.palette?.common?.black, [isSelected, theme?.palette?.common?.black]);
    const ccColor = useMemo(() => isSelected ? theme?.palette?.primary?.smallWhite : theme?.palette?.primary?.smallGray, [isSelected, theme?.palette?.primary?.smallGray, theme?.palette?.primary?.smallWhite]);
    const { weather } = useWeather({ type: 'forecast.json' }, { days: 14, dt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
    console.log('Future weather', weather)
    return (
        <Box
            onClick={handleSelected}
            height={height}
            width={width}
            bgcolor={bgColor}
            borderRadius='0 0 1.5em 1.5em'
            p={4}
            sx={{ ":hover": { cursor: 'pointer', backgroundColor: isSelected ? theme?.palette?.primary?.hoverPurple : theme?.palette?.primary?.hoverGray } }}
        >
            <Box color={color} height='100%' w='100%'>
                <Stack fontWeight={500}>
                    <Box fontSize={isSelected ? '3em' : '2em'}>Next 7 Days</Box>
                    <Box color={ccColor} fontSize={isSelected ? '.9em' : '.75em'}>WEEK AHEAD</Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default ForecastWidget;