export type WeatherData = {
  name: string; //city
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    deg: number;
    speed: number;
  };
  sys: {
    country: string;
  };
  visibility: number;
};

export type Coordinates = Record<"lat" | "lon", string | number | null>;

export type Location = {
  title: string;
  lat: number;
  lon: number;
};

export type LocationRawData = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
};

export type ListItem = Record<string, string | number>;
