import { useCallback, useEffect, useState } from "react";
import { API } from "../libs/api";
import { isEmpty } from "ramda";
import moment from "moment";

const historyOpts = {
    type: 'history.json',
    dt: moment(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD'),
    end_dt: moment(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD')
}

const useHistoryWeather = () => {
    const [weather, setWeather] = useState({});
    const getWeather = useCallback(async () => {
        await API.get(historyOpts?.type, {
            params: {
                q: 'Dallas',
                dt: historyOpts?.dt,
                end_dt: historyOpts?.end_dt,
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

    return { history: weather?.forecast?.forecastday };
};

export default useHistoryWeather;