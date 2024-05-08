import { useMediaQuery, useTheme } from '@mui/material';
import { useMemo } from 'react';

const useBreakpoint = () => {
    const theme = useTheme();
    const largeScreen = useMediaQuery(theme?.breakpoints?.up('lg'));
    const mediumScreen = useMediaQuery(theme?.breakpoints?.only('md'));
    const mobileScreen = useMediaQuery(theme?.breakpoints?.down('md'));

    const size = useMemo(() => {
        return largeScreen ? 'large' : mediumScreen ? 'medium' : mobileScreen ? 'mobile' : 'unknown';
    }, [largeScreen, mediumScreen, mobileScreen]);

    return { size, mobile: size === 'mobile' };
};

export default useBreakpoint;