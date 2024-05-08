import moment from 'moment';
import { always, cond, startsWith } from 'ramda';

const historyOpts = {
    type: 'history.json',
    dt: moment(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD'),
    end_dt: moment(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD')
}
const currentOpts = {
    type: 'current.json'
}
const forecastOpts = {
    type: 'forecast.json',
    days: 14, dt: moment(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD')
}
const astronomyOpts = {
    type: 'astronomy.json'
}
export const findOpts = cond([
    [startsWith('h'), always(historyOpts)],
    [startsWith('c'), always(currentOpts)],
    [startsWith('a'), always(astronomyOpts)],
    [startsWith('f'), always(forecastOpts)],
]);
