import { findLast, isEmpty } from "ramda";
import { useCallback, useEffect, useState } from "react";
import { API } from "../libs/api";

const useCurrentForecast = () => {
    const [weather, setWeather] = useState({});
    const getWeather = useCallback(async () => {
        await API.get('forecast.json', {
            params: {
                q: 'Dallas',
            }
        }).then(res => {
            setWeather(res?.data);
        })
    }, []);
    useEffect(() => {
        if (isEmpty(weather)) {
            getWeather();
        }
    }, [weather, getWeather]);

    return { current: findLast(x => x !== undefined, weather?.forecast?.forecastday || []) };
};

export default useCurrentForecast;