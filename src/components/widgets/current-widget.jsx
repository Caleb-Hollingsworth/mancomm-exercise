import { Box, Stack, useTheme } from '@mui/material';
import { useCallback, useMemo } from 'react';
import useCurrentWeather from '../../hooks/use-current-weather';
import useStore from '../../hooks/zustand';
import useBreakpoint from '../../hooks/use-breakpoint';

const CurrentWidget = () => {
    const theme = useTheme();
    const { size } = useBreakpoint();
    const [selected, setSelected, tempType] = useStore(state => [state.selected, state.setSelected, state.tempType]);
    const handleSelected = useCallback(() => {
        return setSelected('current.json');
    }, [setSelected]);
    const isSelected = useMemo(() => selected === 'current.json', [selected]);
    const height = useMemo(() => isSelected ? '17em' : '11em', [isSelected]);
    const width = useMemo(() => isSelected ? 'calc(100% + 19em)' : '100%', [isSelected]);
    const bgColor = useMemo(() => isSelected ? theme?.palette?.primary.purple : 'white', [isSelected, theme?.palette?.primary.purple]);
    const color = useMemo(() => isSelected ? 'white' : theme?.palette?.common?.black, [isSelected, theme?.palette?.common?.black]);
    const ccColor = useMemo(() => isSelected ? theme?.palette?.primary?.smallWhite : theme?.palette?.primary?.smallGray, [isSelected, theme?.palette?.primary?.smallGray, theme?.palette?.primary?.smallWhite]);
    const { current } = useCurrentWeather();
    return (
        <Box
            onClick={handleSelected}
            height={height}
            width={width}
            bgcolor={bgColor}
            borderRadius='0 0 1.5em 1.5em'
            p={4}
            pt={2}
            sx={{ ":hover": { cursor: 'pointer', backgroundColor: isSelected ? theme?.palette?.primary?.hoverPurple : theme?.palette?.primary?.hoverGray } }}
        >
            <Stack color={color} height='100%' w='100%' justifyContent='space-between'>
                <Stack fontWeight={500}>
                    <Box fontSize={isSelected ? '2em' : '1.5em'}>{current?.condition?.text || 'Cloudy'}</Box>
                    <Box color={ccColor} fontSize={isSelected ? '.9em' : '.75em'}>CURRENT CONDITIONS</Box>
                </Stack>
                {size === 'large' && (
                    <Box>
                        <Box fontSize={isSelected ? '3em' : '2em'}>{Math.trunc(current?.[tempType]) || 0}</Box>
                    </Box>
                )}
            </Stack>
        </Box>
    );
};

export default CurrentWidget;