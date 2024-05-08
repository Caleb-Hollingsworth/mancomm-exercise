import { Box, Stack } from "@mui/material";
import AstronomyWidget from "./astronomy-widget";
import CurrentWidget from "./current-widget";
import ForecastWidget from "./forecast-widget";
import HistoryWidget from "./history-widget";


const Widgets = () => {
    return (
        <Box>
            <Stack direction='row' spacing={6}>
                <CurrentWidget />
                <ForecastWidget />
                <HistoryWidget />
                <AstronomyWidget />
            </Stack>
        </Box>
    );
};

export default Widgets;