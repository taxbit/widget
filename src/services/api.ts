import type { WeatherData, Location, LocationRawData } from "../types";
const WEATHER_API_URL = process.env.WEATHER_API_URL;
const GEO_API_URL = process.env.GEO_API_URL;
const appid = process.env.WEATHER_API_KEY;

class service {
  async getWeather(location: Location, units = "metric"): Promise<WeatherData> {
    const params = {
      units,
      lat: location.lat,
      lon: location.lon,
      appid,
    };
    const query: string = "?" + new URLSearchParams(params as any).toString();
    try {
      const response = await fetch(WEATHER_API_URL + query);
      return response.ok ? response.json() : null;
    } catch (error) {
      console.error(error);
      throw "we have some api ploblems...";
    }
  }

  async getCoordsByGeo(city: string): Promise<LocationRawData[]> {
    const params = { q: city, limit: 5, appid };
    const query: string = "?" + new URLSearchParams(params as any).toString();
    const response = await fetch(GEO_API_URL + query);
    return response.ok ? response.json() : null;
  }

  async getWeatherList(locations: Location[]): Promise<WeatherData[]> {
    const reqs = locations.map((location) => this.getWeather(location));
    return Promise.all(reqs);
  }
}

export default new service();
