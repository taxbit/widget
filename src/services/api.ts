import type { WeatherData, Coordinates } from "../types"
const API_URL = process.env.WEATHER_API_URL
const appid = process.env.WEATHER_API_KEY

class weatherService {
    async getCurrentWeather(coords: Coordinates, units = 'metric'): Promise<WeatherData> {
        const { latitude: lat, longitude: lon } = coords
        const params = {
            units,
            lat,
            lon,
            appid
        }
        const query: string = '?' + (new URLSearchParams(params as any)).toString()
        const responce = await fetch(API_URL + query)
        return responce.json()
    }
}

export default new weatherService()