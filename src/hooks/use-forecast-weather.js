import { isEmpty } from "ramda";
import { useCallback, useEffect, useState } from "react";
import { API } from "../libs/api";

const useForecastWeather = () => {
    const [weather, setWeather] = useState({});
    const getWeather = useCallback(async () => {
        await API.get('forecast.json', {
            params: {
                q: 'Dallas',
                days: 7,
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

    return { forecast: weather?.forecast?.forecastday };
};

export default useForecastWeather;