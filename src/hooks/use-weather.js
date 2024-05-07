import { useCallback, useEffect, useState } from "react";
import { API } from "../libs/api";
import { isEmpty } from "ramda";

const useWeather = () => {
    const [currentWeather, setCurrentWeather] = useState({});
    const getWeather = useCallback(async () => {
        await API.get(`current.json`, {
            params: {
                q: 'Dallas',
            }
        }).then(res => {
            console.log('res', res);
            setCurrentWeather(res?.data?.current);
        })
    }, []);
    useEffect(() => {
        if (isEmpty(currentWeather)) {
            getWeather();
        }
    }, [currentWeather, getWeather]);

    return { currentWeather };
};

export default useWeather;