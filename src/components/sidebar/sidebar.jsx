import { Box, Chip, Stack, useTheme } from '@mui/material';
import { RoundedBox, TitleMenu } from '../ui';
import useAstronomyWeather from '../../hooks/use-astronomy-weather';
import { prop } from 'ramda';
import { useMemo } from 'react';
import { Brightness3, DarkMode, NightsStay, WbSunny, WbTwilight } from '@mui/icons-material';
import useBreakpoint from '../../hooks/use-breakpoint';

const Sidebar = () => {
    const { astronomy } = useAstronomyWeather();
    const { size } = useBreakpoint();
    const theme = useTheme();
    const astroData = useMemo(() => {
        if (astronomy?.astro) {
            const { astro } = astronomy;
            return [
                { title: 'Sunrise', icon: <WbSunny />, data: prop('sunrise', astro) || '' },
                { title: 'Sunset', icon: <WbTwilight />, data: prop('sunset', astro) || '' },
                { title: 'Moon Phase', icon: <DarkMode />, data: prop('moon_phase', astro) || '' },
                { title: 'Moonrise', icon: <NightsStay />, data: prop('moonrise', astro) || '' },
                { title: 'Moonset', icon: <Brightness3 />, data: prop('moonset', astro) || '' },
            ]
        }
        return [];
    }, [astronomy]);

    return (
        <Stack bgcolor='white' width='100%' height='100%' p={5} spacing={4}>
            <TitleMenu title='Astronomical Info' />
            <Stack spacing={4}>
                {astroData?.map((astro, idx) => (
                    <RoundedBox key={`astro-section-${astro?.title}-${idx}`}>
                        <Stack direction={size === 'large' ? 'row' : 'column'} spacing={size === 'large' ? 0 : 2} alignItems='center' justifyContent='space-between'>
                            <Stack direction='row' alignItems='center' spacing={2}>
                                <Box color={theme?.palette?.primary?.purple}>
                                    {astro?.icon}
                                </Box>
                                <Box fontWeight={500} fontSize='1.1em'>
                                    {astro?.title}
                                </Box>
                            </Stack>
                            <Chip label={astro?.data} sx={{ bgcolor: theme?.palette?.primary?.purple, color: 'white' }} />
                        </Stack>
                    </RoundedBox>
                ))}
            </Stack>
        </Stack>
    );
};

export default Sidebar;