import { MoreVertOutlined } from "@mui/icons-material";
import { Box, Menu, MenuItem, IconButton as MuiIconButton, Stack, Tooltip, useTheme } from "@mui/material";
import { useCallback, useState } from "react";
import useBreakpoint from "../../hooks/use-breakpoint";

export const IconButton = ({ children, noHover, noCursor, selected, tip, ...props }) => {
    const { mobile } = useBreakpoint();
    const theme = useTheme();
    return (
        <Tooltip title={tip} placement="right">
            <Box
                sx={{
                    color: selected || noHover ? theme?.palette?.primary?.purple : theme?.palette?.primary?.outlineGray,
                    ":hover": { cursor: !noCursor ? 'pointer' : 'default', bgcolor: !noHover ? theme?.palette?.primary?.hoverGray : 'transparent' },
                    width: '100%',
                }}

                display='flex'
                justifyContent='center'
                alignItems='center'
                variant='text'
                height='3.75em'
                borderLeft='2px solid'
                borderColor={!mobile && selected ? theme?.palette?.primary?.purple : 'transparent'}
                bgcolor={!mobile && selected ? theme?.palette?.primary?.hoverGray : 'transparent'}
                {...props}
            >
                {children}
            </Box>
        </Tooltip>
    );
};

export const TitleMenu = ({ title, menuList, ...props }) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleOpen = useCallback((e) => {
        setAnchorEl(e?.currentTarget);
    }, [setAnchorEl]);
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    return (
        <Stack direction='row' justifyContent='space-between' alignItems='center' color={theme?.palette?.common?.black} {...props}>
            <Box fontSize={18} fontWeight={600}>{title}</Box>
            <Box color='black'>
                {menuList && (
                    <>
                        <MuiIconButton onClick={handleOpen} sx={{ bgcolor: theme?.palette?.primary?.hoverGray, borderRadius: 2 }}>
                            <MoreVertOutlined sx={{ color: theme?.palette?.primary?.purple }} />
                        </MuiIconButton>
                        <Menu
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                        >
                            {menuList?.map((option, idx) => (
                                <MenuItem
                                    key={`title-menu-list-${option?.value}-${idx}`}
                                    onClick={() => {
                                        option?.onClick();
                                        handleClose();
                                    }}
                                >
                                    {option?.text}
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                )}
            </Box>
        </Stack>
    );
};

export const RoundedBox = ({ children, ...props }) => {
    const theme = useTheme();
    return (
        <Box
            bgcolor={theme?.palette?.primary?.main}
            borderRadius='1.25em'
            p={4}
            spacing={2}
            {...props}
        >
            {children}
        </Box>
    );
};