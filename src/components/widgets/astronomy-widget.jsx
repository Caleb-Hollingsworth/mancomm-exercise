import { WbTwilightOutlined } from '@mui/icons-material';
import { Box, Stack, useTheme } from '@mui/material';
import useWeather from '../../hooks/use-weather';

const AstronomyWidget = () => {
    const theme = useTheme();
    const { weather } = useWeather({ type: 'astronomy.json' });
    return (
        <Box
            height='11em'
            width='100%'
            bgcolor='white'
            borderRadius='0 0 1.5em 1.5em'
            p={4}
        >
            <Stack color={theme?.palette?.common?.black} height='100%' w='100%' spacing={2}>
                <Stack fontWeight={500}>
                    <Box fontSize='2em'>Sunset</Box>
                    <Box color={theme?.palette?.primary?.smallGray} fontSize='.75em'>{weather?.astronomy?.astro?.sunset}</Box>
                </Stack>
                <Box color={theme?.palette?.primary?.purple}>
                    <WbTwilightOutlined fontSize='large' />
                </Box>
            </Stack>
        </Box>
    );
};

export default AstronomyWidget;