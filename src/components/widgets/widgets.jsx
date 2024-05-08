import { Box, Stack } from "@mui/material";
import AstronomyWidget from "./astronomy-widget";
import CurrentWidget from "./current-widget";
import ForecastWidget from "./forecast-widget";
import HistoryWidget from "./history-widget";


const Widgets = () => {
    return (
        <Box width='100%'>
            <Stack direction='row' justifyContent='space-between' width='100%' spacing={4}>
                <CurrentWidget />
                <ForecastWidget />
                <HistoryWidget />
                <AstronomyWidget />
            </Stack>
        </Box>
    );
};

export default Widgets;