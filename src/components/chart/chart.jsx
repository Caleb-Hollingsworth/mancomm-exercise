import { Box } from "@mui/material";
import { Chart as DevChart } from "devextreme-react";
import { CommonSeriesSettings, Crosshair, Font, Label, Series } from "devextreme-react/cjs/chart";
import { always, cond, flatten, startsWith } from "ramda";
import { useMemo, useState } from "react";
import useWeatherData from "../../hooks/use-weather-data";
import useStore from "../../hooks/zustand";
import { TitleMenu } from "../ui";


const Chart = () => {
    const [selected] = useStore(state => [state.selected]);
    const [tempType, setTempType] = useState('temp_f');
    const { hours, temps } = useWeatherData({ tempType });
    // new chart data for when changing 'selected', then list info on right column, then mobile, test, deploy
    const weatherSources = useMemo(() => {
        if (selected !== 'current.json') {
            return [
                { value: tempType === 'temp_f' ? 'avgtemp_f' : 'avgtemp_c', name: 'Temperature' }
            ]
        }
        return [
            { value: tempType, name: 'Temperature' },
        ]
    }, [selected, tempType]);

    const dataSource = useMemo(() => {
        if (selected !== 'current.json') {
            return flatten([hours, temps])
        }
        return hours
    }, [hours, selected, temps]);

    const weatherTitle = useMemo(() => {
        const findTitle = cond([
            [startsWith('h'), always('Temperatures for the Last 7 Days')],
            [startsWith('c'), always("Today's Temperature Hourly")],
            [startsWith('f'), always('Temperatures for the Next 7 Days')],
        ]);
        return findTitle(selected)
    }, [selected]);

    return (
        <Box>
            <Box pb={4}>
                <TitleMenu title={weatherTitle} />
            </Box>
            <DevChart dataSource={dataSource} palette='Ocean'>
                <CommonSeriesSettings argumentField={selected === 'current.json' ? 'time' : 'date'} />
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