import { Box, useTheme } from "@mui/material";
import { Chart as DevChart } from "devextreme-react";
import { CommonSeriesSettings, Crosshair, Font, Label, Series } from "devextreme-react/cjs/chart";
import { always, cond, flatten, startsWith } from "ramda";
import { useMemo } from "react";
import useWeatherData from "../../hooks/use-weather-data";
import useStore from "../../hooks/zustand";
import { TitleMenu } from "../ui";
import useBreakpoint from "../../hooks/use-breakpoint";


const Chart = () => {
    const theme = useTheme();
    const { mobile } = useBreakpoint();
    const [selected, tempType, setTempType] = useStore(state => [state.selected, state.tempType, state.setTempType]);
    const { hours, temps } = useWeatherData();
    const options = useMemo(() => {
        return [
            { value: 'temp_f', text: 'Fahrenheit', onClick: () => setTempType('temp_f') },
            { value: 'temp_c', text: 'Celsius', onClick: () => setTempType('temp_c') }
        ]
    }, [setTempType]);
    const weatherSources = useMemo(() => {
        if (selected !== 'current.json') {
            return [
                { value: 'temp', name: 'Temperature' }
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
        <Box p={mobile ? 4 : 0} width={mobile ? 'calc(100vw - 1em)' : '100%'}>
            <Box pb={4}>
                <TitleMenu title={weatherTitle} menuList={options} />
            </Box>
            <DevChart dataSource={dataSource} palette='Ocean' legend={{ visible: false }}>
                <CommonSeriesSettings argumentField={selected === 'current.json' ? 'time' : 'date'} />
                {weatherSources?.map((source) => (
                    <Series
                        key={`weather-chart-${source?.value}`}
                        color={theme?.palette?.primary?.purple}
                        valueField={source?.value}
                        name={source?.name}
                    />
                ))}
                {!mobile && (
                    <Crosshair
                        enabled={true}
                        color="#949494"
                        width={3}
                        dashStyle="dot"
                    >
                        <Label
                            visible={true}
                            backgroundColor={theme?.palette?.primary?.purple}
                        >
                            <Font
                                color="#fff"
                                size={12}
                            />
                        </Label>
                    </Crosshair>
                )}
            </DevChart>
        </Box>
    );
};

export default Chart;