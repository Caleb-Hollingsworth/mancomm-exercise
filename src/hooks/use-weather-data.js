import moment from "moment";
import { always, cond, map, prop, startsWith } from "ramda";
import { useMemo } from "react";
import useCurrentForecast from "./use-current-forecast";
import useForecastWeather from "./use-forecast-weather";
import useHistoryWeather from "./use-history-weather";
import useStore from "./zustand";

const useWeatherData = () => {
    const [selected, tempType] = useStore(state => [state.selected, state.tempType]);
    const { current } = useCurrentForecast();
    const { history } = useHistoryWeather();
    const { forecast } = useForecastWeather();

    const data = useMemo(() => {
        const findOpts = cond([
            [startsWith('h'), always(history)],
            [startsWith('c'), always(current?.hour)],
            [startsWith('f'), always(forecast)],
        ]);
        return findOpts(selected);
    }, [current, forecast, history, selected]);

    const hours = map((hour) => {
        if (selected !== 'current.json') {
            return { ...hour }
        }
        return { ...hour, time: moment(prop('time', hour)).format('LT') };
    })(data || []);
    const temps = map((hour) => {
        if (selected !== 'current.json') {
            return { ...hour, temp: prop(tempType === 'temp_f' ? 'avgtemp_f' : 'avgtemp_c', hour?.day) }
        }
        return prop(tempType, hour);
    })(data || []);
    const isDay = map((hour) => {
        return prop('is_day', hour);
    })(data || []);

    return { hours, temps, isDay, forecast }
};

export default useWeatherData;