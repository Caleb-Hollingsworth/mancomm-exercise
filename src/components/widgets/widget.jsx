import { Box, Stack, useTheme } from '@mui/material';
import { useCallback, useMemo } from 'react';
import useWeather from '../../hooks/use-weather';
import useStore from '../../hooks/zustand';

const Widget = ({ type }) => {
    const theme = useTheme();
    const [selected, setSelected] = useStore(state => [state.selected, state.setSelected]);
    const handleSelected = useCallback(() => {
        return setSelected(type);
    }, [setSelected, type]);
    const isSelected = useMemo(() => selected === type, [selected, type]);
    const height = useMemo(() => isSelected ? '18em' : '11em', [isSelected]);
    const width = useMemo(() => isSelected ? 'calc(100% + 19em)' : '100%', [isSelected]);
    const bgColor = useMemo(() => isSelected ? theme?.palette?.primary.purple : 'white', [isSelected, theme?.palette?.primary.purple]);
    const color = useMemo(() => isSelected ? 'white' : theme?.palette?.common?.black, [isSelected, theme?.palette?.common?.black]);
    const ccColor = useMemo(() => isSelected ? theme?.palette?.primary?.smallWhite : theme?.palette?.primary?.smallGray, [isSelected, theme?.palette?.primary?.smallGray, theme?.palette?.primary?.smallWhite]);
    const { weather } = useWeather({ type: 'current.json' });
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
            <Stack color={color} height='100%' w='100%' spacing={4}>
                <Stack fontWeight={500}>
                    <Box fontSize={isSelected ? '3em' : '2em'}>{weather?.current?.condition?.text || 'Cloudy'}</Box>
                    <Box color={ccColor} fontSize={isSelected ? '.9em' : '.75em'}>CURRENT CONDITIONS</Box>
                </Stack>
                <Box>
                    <Box fontSize={isSelected ? '3em' : '2em'}>{Math.trunc(weather?.current?.temp_f) || 0}</Box>
                </Box>
            </Stack>
        </Box>
    );
};

export default Widget;