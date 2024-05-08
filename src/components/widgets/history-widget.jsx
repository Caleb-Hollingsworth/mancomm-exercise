import { EventRepeatOutlined } from '@mui/icons-material';
import { Box, Stack, useTheme } from '@mui/material';
import { useCallback, useMemo } from 'react';
import useStore from '../../hooks/zustand';
import useBreakpoint from '../../hooks/use-breakpoint';

const HistoryWidget = () => {
    const theme = useTheme();
    const { size } = useBreakpoint();
    const [selected, setSelected] = useStore(state => [state.selected, state.setSelected]);
    const handleSelected = useCallback(() => {
        return setSelected('history.json');
    }, [setSelected]);
    const isSelected = useMemo(() => selected === 'history.json', [selected]);
    const height = useMemo(() => isSelected ? '18em' : '11em', [isSelected]);
    const width = useMemo(() => isSelected ? 'calc(100% + 19em)' : '100%', [isSelected]);
    const bgColor = useMemo(() => isSelected ? theme?.palette?.primary.purple : 'white', [isSelected, theme?.palette?.primary.purple]);
    const color = useMemo(() => isSelected ? 'white' : theme?.palette?.common?.black, [isSelected, theme?.palette?.common?.black]);
    const ccColor = useMemo(() => isSelected ? theme?.palette?.primary?.smallWhite : theme?.palette?.primary?.smallGray, [isSelected, theme?.palette?.primary?.smallGray, theme?.palette?.primary?.smallWhite]);

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
                    <Box fontSize={isSelected ? '2em' : '1.5em'}>Last 7 Days</Box>
                    <Box color={ccColor} fontSize={isSelected ? '.9em' : '.75em'}>WEEK BEHIND</Box>
                </Stack>
                {size === 'large' && (
                    <Box>
                        <EventRepeatOutlined fontSize={isSelected ? 'large' : 'medium'} />
                    </Box>
                )}
            </Stack>
        </Box>
    );
};

export default HistoryWidget;