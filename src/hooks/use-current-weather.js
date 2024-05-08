import { useCallback, useEffect, useState } from "react";
import { API } from "../libs/api";
import { isEmpty } from "ramda";

const useCurrentWeather = () => {
    const [weather, setWeather] = useState({});
    const getWeather = useCallback(async () => {
        await API.get('current.json', {
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

    return { current: weather?.current };
};

export default useCurrentWeather;