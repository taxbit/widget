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
}

export type Coordinates = Record<'latitude' | 'longitude', string | number | null>