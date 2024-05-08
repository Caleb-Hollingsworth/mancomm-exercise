import { useCallback, useEffect, useState } from "react";
import { API } from "../libs/api";
import { isEmpty } from "ramda";

const useAstronomyWeather = () => {
    const [weather, setWeather] = useState({});
    const getWeather = useCallback(async () => {
        await API.get('astronomy.json', {
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

    return { astronomy: weather?.astronomy };
};

export default useAstronomyWeather;