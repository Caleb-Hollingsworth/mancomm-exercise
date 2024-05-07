import axios from "axios";

export const API = axios.create({
    baseURL: import.meta.env.VITE_WEATHER_BASE_URL,
    validateStatus: (status) => status < 500, // Resolve only if the status code is less than 500
    params: {
        key: import.meta.env.VITE_WEATHER_API_KEY
    }
})