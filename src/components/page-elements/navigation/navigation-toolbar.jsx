import { DescriptionOutlined, ExploreOutlined, FolderSharedOutlined, GrainOutlined, HomeOutlined, LogoutOutlined } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { useCallback, useState } from 'react';
import { IconButton } from '../../ui';


const NavigationToolbar = () => {
    const [selected, setSelected] = useState('home');

    const handleTab = useCallback((value) => {
        setSelected(value);
    }, [setSelected]);
    return (
        <Stack bgcolor='white' minHeight='100vh' justifyContent='space-between' alignItems='center' py={3}>
            <IconButton noHover noCursor>
                <GrainOutlined sx={{ transform: 'rotate(45deg)' }} fontSize='large' />
            </IconButton>
            <Stack height='100%' width='100%' spacing={9} justifyContent='space-between'>
                <IconButton onClick={() => handleTab('home')} selected={selected === 'home'} tip='Home'>
                    <HomeOutlined fontSize='large' />
                </IconButton>
                <IconButton onClick={() => handleTab('explore')} selected={selected === 'explore'} tip='Explore'>
                    <ExploreOutlined fontSize='large' />
                </IconButton>
                <IconButton onClick={() => handleTab('folder')} selected={selected === 'folder'} tip='Files'>
                    <FolderSharedOutlined fontSize='large' />
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