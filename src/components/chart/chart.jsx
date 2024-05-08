import { useMemo, useState } from "react";
import useWeather from "../../hooks/use-weather";
import useWeatherData from "../../hooks/use-weather-data";
import { Chart as DevChart } from "devextreme-react";
import { CommonSeriesSettings, Crosshair, Font, Label, Series } from "devextreme-react/cjs/chart";
import { always, cond, pick, startsWith, takeLast } from "ramda";
import { Box } from "@mui/material";
import { TitleMenu } from "../ui";
import useStore from "../../hooks/zustand";
import moment from "moment";
import { findOpts } from "../../libs";


const Chart = () => {
    const [selected] = useStore(state => [state.selected]);
    const [chartType, setChartType] = useState('forecast.json');
    const [tempType, setTempType] = useState('temp_f');
    const { hours, temps, isDay, forecast } = useWeatherData({ tempType });
    // new chart data for when changing 'selected', then list info on right column, then mobile, test, deploy
    const weatherSources = useMemo(() => {
        return [
            { value: tempType, name: 'Temperature' },
        ]
    }, [tempType]);
    console.log('hours', hours)
    return (
        <Box>
            <Box pb={4}>
                <TitleMenu title='Weather Hourly' />
            </Box>
            <DevChart dataSource={hours} palette='Ocean'>
                <CommonSeriesSettings argumentField={'time'} />
                {weatherSources?.map((source) => (
                    <Series
                        key={`weather-chart-${source?.value}`}
                        valueField={source?.value}
                        name={source?.name}
                    />
                ))}
                <Crosshair
                    enabled={true}
                    color="#949494"
                    width={3}
                    dashStyle="dot"
                >
                    <Label
                        visible={true}
                        backgroundColor="#949494"
                    >
                        <Font
                            color="#fff"
                            size={12}
                        />
                    </Label>
                </Crosshair>
            </DevChart>
        </Box>
    );
};

export default Chart;