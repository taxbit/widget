export type WeatherData = {
    name: string; //city
    main: {
        temp: number;
        humidity: number;
        pressure: number;
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
    }
}