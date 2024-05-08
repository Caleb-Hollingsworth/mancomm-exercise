import { useCallback, useEffect, useState } from "react";
import { API } from "../libs/api";
import { isEmpty } from "ramda";

const useWeather = ({ type, ...opts }) => {
    console.log('opts', opts)
    const [weather, setWeather] = useState({});
    const getWeather = useCallback(async () => {
        await API.get(type, {
            params: {
                q: 'Dallas',
                ...opts
            }
        }).then(res => {
            console.log('res', res);
            setWeather(res?.data);
        })
    }, [opts, type]);
    useEffect(() => {
        if (isEmpty(weather)) {
            getWeather();
        }
    }, [weather, getWeather, type]);

    return { weather };
};

export default useWeather;