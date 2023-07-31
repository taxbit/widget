import type { WeatherData, Coordinates, LocationRawData } from "../types";
const WEATHER_API_URL = process.env.WEATHER_API_URL;
const GEO_API_URL = process.env.GEO_API_URL;
const appid = process.env.WEATHER_API_KEY;

class service {
  async getCurrentWeather(
    coords: Coordinates,
    units = "metric",
  ): Promise<WeatherData> {
    const params = {
      units,
      ...coords,
      appid,
    };
    const query: string = "?" + new URLSearchParams(params as any).toString();
    const response = await fetch(WEATHER_API_URL + query);
    return response.ok ? response.json() : null;
  }

  async getCoordsByGeo(city: string): Promise<LocationRawData[]> {
    const params = { q: city, limit: 5, appid };
    const query: string = "?" + new URLSearchParams(params as any).toString();
    const response = await fetch(GEO_API_URL + query);
    return response.ok ? response.json() : null;
  }
}

export default new service();
