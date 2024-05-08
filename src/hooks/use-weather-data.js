import { always, cond, map, prop, startsWith } from "ramda";
import { useMemo } from "react";
import useWeather from "./use-weather";
import moment from "moment";
import useStore from "./zustand";

const useWeatherData = ({ tempType }) => {
    const [selected] = useStore(state => [state.selected]);
    const weatherQuery = useMemo(() => {
        const historyOpts = {
            type: 'history.json',
            dt: moment(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD'),
            end_dt: moment(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD')
        }
        const currentOpts = {
            type: 'forecast.json'
        }
        const forecastOpts = {
            type: 'forecast.json',
            days: 14, dt: moment(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD')
        }
        const astronomyOpts = {
            type: 'astronomy.json'
        }
        const findOpts = cond([
            [startsWith('h'), always(historyOpts)],
            [startsWith('c'), always(currentOpts)],
            [startsWith('a'), always(astronomyOpts)],
            [startsWith('f'), always(forecastOpts)],
        ]);
        return findOpts(selected);
    }, [selected]);
    console.log('weatherQuery', weatherQuery)
    const { weather } = useWeather(weatherQuery);
    console.log('weather1', weather)
    const forecast = useMemo(() => {
        if (weather?.forecast) {
            console.log('weather?.forecast', weather?.forecast)
            return weather?.forecast?.forecastday[0]?.hour
        }
        return []
    }, [weather]);
    console.log('forecast', forecast)
    const hours = map((hour) => {
        return { ...hour, time: moment(prop('time', hour)).format('LT') };
    })(forecast || []);
    const temps = map((hour) => {
        return prop(tempType || 'temp_f', hour);
    })(forecast || []);
    const isDay = map((hour) => {
        return prop('is_day', hour);
    })(forecast || []);

    return { hours, temps, isDay, forecast }
};

export default useWeatherData;